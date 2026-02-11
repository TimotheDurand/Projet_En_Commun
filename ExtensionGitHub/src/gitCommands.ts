import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

/**
 * Exécute une commande Git dans un dossier spécifique
 * @param command - La commande Git à exécuter (ex: "git status")
 * @param cwd - Le chemin du dossier où exécuter la commande
 * @returns Le résultat de la commande
 */




async function checkGitInstalled(): Promise<boolean> {
    try {
        await execPromise('git --version');
        return true;
    } catch {
        return false;
    }
}


async function checkIsGitRepo(folderPath: string): Promise<boolean> {
    try {
        await executeGitCommand('git rev-parse --git-dir', folderPath);
        return true;
    } catch {
        return false;
    }
}


async function checkHasChanges(folderPath: string): Promise<boolean> {
    try {
        const status = await executeGitCommand('git status --porcelain', folderPath);
        return status.length > 0;
    } catch {
        return false;
    }
}


async function checkHasRemote(folderPath: string): Promise<boolean> {
    try {
        const remotes = await executeGitCommand('git remote', folderPath);
        return remotes.length > 0;
    } catch {
        return false;
    }
}


async function executeGitCommand(command: string, cwd: string): Promise<string> {
    try {
        const { stdout, stderr } = await execPromise(command, { cwd });
        
        if (stderr && !stderr.includes('warning')) {
            throw new Error(stderr);
        }
        
        return stdout.trim();
    } catch (error: any) {
        throw new Error(`Erreur Git: ${error.message}`);
    }
}


export async function quickPushToGitHub() {
    try {

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];      
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('Aucun dossier ouvert dans VS Code');
            return;
        }

        const folderPath = workspaceFolder.uri.fsPath;
        if (!(await checkGitInstalled())) {
            vscode.window.showErrorMessage('Git n\'est pas installé sur votre système');
            return;
        }

        if (!(await checkIsGitRepo(folderPath))) {
            vscode.window.showErrorMessage('Ce dossier n\'est pas un repository Git');
            return;
        }

        if (!(await checkHasRemote(folderPath))) {
            vscode.window.showErrorMessage('Aucun remote Git configuré (ex: GitHub)');
            return;
        }

        if (!(await checkHasChanges(folderPath))) {
            vscode.window.showInformationMessage('Aucun changement à commiter');
            return;
        }

        vscode.window.showInformationMessage('Git Quick Push en cours...');

        await executeGitCommand('git add .', folderPath);

        const now = new Date();
        const commitMessage = `Update: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        await executeGitCommand(`git commit -m "${commitMessage}"`, folderPath);

        await executeGitCommand('git push', folderPath);

        vscode.window.showInformationMessage('Code pushé vers GitHub avec succès !');

    } catch (error: any) {
        vscode.window.showErrorMessage(`Erreur: ${error.message}`);
    }
}
