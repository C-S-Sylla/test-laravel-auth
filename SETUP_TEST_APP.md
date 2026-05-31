# 🚀 Guide d'Installation — Application Cyberpunk (Laravel + Docker)

Ce guide explique comment installer, démarrer et tester l'application de profil Cyberpunk localement sur Windows en utilisant **Docker Desktop**.

---

## 🛠️ 1. Prérequis Système

Assurez-vous d'avoir installé les outils suivants sur votre machine hôte Windows :
1.  **Docker Desktop pour Windows** (avec le moteur WSL2 activé).
2.  **Git** (pour cloner le projet).

---

## 🏗️ 2. Étape de démarrage (L'infrastructure)

### A. Configuration du fichier `.env`
1.  Placez-vous à la racine du projet `test-laravel-auth`.
2.  Copiez le fichier d'exemple pour créer votre environnement de configuration :
    ```bash
    cp .env.example .env
    ```
3.  Ouvrez le fichier `.env` et assurez-vous que les variables de base de données pointent bien vers le réseau Docker interne :
    ```env
    DB_CONNECTION=mysql
    DB_HOST=database      
    DB_PORT=3306
    DB_DATABASE=laravel_auth
    DB_USERNAME=root
    DB_PASSWORD=root
    ```

### B. Lancement de l'Infrastructure Docker
Ouvrez un terminal (PowerShell ou CMD) à la racine du projet et lancez la commande de construction et de démarrage :
```bash
docker compose up -d --build
```
*Cette commande va télécharger PHP 8.4, installer automatiquement les dépendances Composer à l'intérieur de l'image, et démarrer le serveur Apache ainsi que la base de données MySQL.*

---

## 💻 3. Initialisation de la Base de Données & Clés

Puisque l'application tourne de manière isolée dans Docker, toutes les commandes d'initialisation doivent être exécutées **à l'intérieur** du conteneur applicatif web.

Exécutez ces 4 commandes dans votre terminal Windows :

```bash
# 1. Générer la clé de sécurité de Laravel
docker exec -it laravel_web php artisan key:generate

# 2. Créer le lien symbolique pour l'upload d'images (avatars)
docker exec -it laravel_web php artisan storage:link

# 3. Lancer les migrations pour créer les tables SQL
docker exec -it laravel_web php artisan migrate
```

---

## 🕹️ 4. Connexion et Test de l'Interface Cyberpunk

1.  Ouvrez votre navigateur internet et rendez-vous sur : **`http://localhost:8000`**
2.  Vous allez atterrir sur la page d'accueil d'accès à la Matrice. Cliquez sur **Register**.
3.  Connectez-vous avec les identifiants sécurisés par défaut :
4.  **Le Test :** 
    *   Modifiez votre alias (Nom de code).
    *   Importez une image de profil (.jpg ou .png). Elle s'affichera instantanément avec une lueur néon bleue.
    *   Sélectionnez votre mission de Netrunner préférée à l'aide des boutons radio néons.
    *   Cliquez sur **"Synchroniser l'identité"**. Votre profil est mis à jour et sauvegardé de manière persistante en base de données !

---

## 🛡️ 5. Résolution des problèmes (Troubleshooting)

*   **Erreur `Connection refused` sur la migration :** MySQL met environ 15 à 20 secondes à s'initialiser lors du tout premier démarrage pour créer ses fichiers système. Attendez quelques secondes et relancez la commande de migration.
*   **Les modifications de code ne s'affichent pas :** Si vous modifiez un fichier PHP ou HTML localement, vous devez relancer `docker compose up -d --build` pour que Docker prenne en compte les modifications dans son système de fichiers interne.

---
*Ce projet fait l'objet d'un cas pratique d'orchestration Docker multi-services.*
---