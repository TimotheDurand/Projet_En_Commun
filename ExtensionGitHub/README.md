# Partie Extention Git Hub

Objectif : Simplifier l'envoie des donner vers git hub ( syncronisation automatique )

Prérequis OBLIGATOIRES :
1. Git installé sur l'ordinateur

Téléchargeable sur : https://git-scm.com/
Pour vérifier : ouvre un terminal et tape git --version

2. Un dossier qui est un repository Git

Le dossier doit avoir été initialisé avec git init
Ou cloné depuis GitHub avec git clone

3. Un remote configuré (GitHub, GitLab, etc.)

Pour GitHub, il faut avoir fait git remote add origin https://github.com/...
Vérifie avec : git remote -v

4. Des fichiers modifiés à commiter

Sinon l'extension dira "Aucun changement à commiter"

5. Authentification GitHub configurée

Soit avec un token d'accès personnel
Soit avec SSH (clé SSH configurée)
Sinon le git push échouera avec une erreur d'authentification
