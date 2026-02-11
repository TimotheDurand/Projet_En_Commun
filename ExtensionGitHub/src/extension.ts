import * as vscode from 'vscode';
import { quickPushToGitHub } from './gitCommands';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "git-quick-push" is now active!');

	const disposable = vscode.commands.registerCommand('git-push-raccourci-clavier', () => {
    	quickPushToGitHub();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
