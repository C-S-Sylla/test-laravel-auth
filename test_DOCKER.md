
# CYBER_NET // PROTOCOLE DE DÉPLOIEMENT DOCKER

Ce guide décrit la procédure pour cloner, configurer et exécuter l'application **CYBER_NET** (Frontend React + Backend Laravel + Base de données MySQL) dans un environnement conteneurisé Docker.

La configuration des volumes internes a été optimisée pour éliminer les ralentissements d'écriture (I/O) généralement rencontrés sur les environnements Windows (WSL2).

---

## 🛠 Prérequis

Avant de lancer le déploiement, assurez-vous de disposer des outils suivants :
*   **Git** : [Télécharger Git](https://git-scm.com/)
*   **Docker Desktop** : [Télécharger Docker Desktop](https://www.docker.com/products/docker-desktop/)

> **Configuration système requise** : Sous Windows, veillez à ce que le moteur de virtualisation **WSL 2** soit activé dans les paramètres de Docker Desktop pour garantir la fluidité de l'application.

---

## 🚀 Étape 1 : Récupération du Code Source

Clonez le dépôt depuis GitHub et placez-vous à la racine du projet :

```bash
git clone https://github.com/C-S-Sylla/test-laravel-auth.git
cd test-laravel-auth
```

---

## ⚙️ Étape 2 : Configuration des Fichiers d'Environnement

Des variables spécifiques doivent être définies pour l'interconnexion des conteneurs.

### A. Configuration du Backend (Laravel)
1. Allez dans le dossier `backend` :
   ```bash
   cd backend
   ```
2. Créez le fichier de configuration à partir de l'exemple :
   ```bash
   cp .env.example .env
   ```
3. Ouvrez le fichier `.env` et configurez les accès à la base de données MySQL :
   ```env
   DB_CONNECTION=mysql
   DB_HOST=db
   DB_PORT=3306
   DB_DATABASE=cyber_net
   DB_USERNAME=root
   DB_PASSWORD=root

   # Désactiver la détection automatique des domaines stateful de Sanctum pour l'auth par Token
   SANCTUM_STATEFUL_DOMAINS=
   ```

### B. Configuration du Frontend (React)
1. Allez dans le dossier `frontend` :
   ```bash
   cd ../frontend
   ```
2. Créez un fichier `.env` :
   ```bash
   touch .env
   ```
3. Renseignez l'URL d'accès à l'API (qui pointe vers la passerelle Nginx sur le port 8000) :
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

---

## 🐳 Étape 3 : Construction et Lancement de l'Infrastructure

Revenez à la racine du projet (où se trouve le fichier `docker-compose.yml`) et lancez l'assemblage :

```bash
cd ..
docker-compose up -d --build
```

*Cette opération compile les dépendances et configure les réseaux isolés. Elle peut prendre quelques minutes lors de la première initialisation.*

---

## ⚡ Étape 4 : Initialisation de l'Application

Une fois les conteneurs démarrés, exécutez ces trois commandes pour finaliser la configuration interne du serveur d'API :

### 1. Générer la clé de chiffrement Laravel
```bash
docker exec -it cyber_backend php artisan key:generate
```

### 2. Lancer les migrations de table et injecter les données d'essai
```bash
docker exec -it cyber_backend php artisan migrate --seed
```

### 3. Configurer le lien symbolique pour le stockage public (Avatars)
```bash
docker exec -it cyber_backend php artisan storage:link
```

---

## 🌐 Étape 5 : Accès au Système

*   **Console d'accès Frontend (React) :** [http://localhost:3000](http://localhost:3000)
*   **Mainframe d'API Backend (Laravel) :** [http://localhost:8000/api](http://localhost:8000/api)
*   **Base de données (MySQL) :** Port local `3306` (Utilisateur : `root` / Mot de passe : `root`)

---

## 🛠 Résolution des Problèmes (Troubleshooting)

### Erreur `CSRF token mismatch` ou code `419`
1. Vérifiez que la variable `SANCTUM_STATEFUL_DOMAINS` est bien vide dans votre fichier `backend/.env`.
2. Videz les caches de configuration du serveur :
   ```bash
   docker exec -it cyber_backend php artisan config:clear
   docker exec -it cyber_backend php artisan route:clear
   ```

### Erreur `public/storage link already exists`
*   Ce message indique simplement que le système de fichiers partagé a déjà initialisé le lien. Vous pouvez poursuivre l'utilisation de l'application.

### Arrêt de l'infrastructure
*   Pour stopper les conteneurs sans perdre vos données enregistrées :
    ```bash
    docker-compose down
    ```
*   Pour réinitialiser complètement l'environnement (efface également les données en base de données) :
    ```bash
    docker-compose down -v
    ```
---