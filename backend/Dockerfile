FROM php:8.4-fpm

# 1. Installation des dépendances système (on y a mis les outils pour les images)
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libjpeg-dev \
    libfreetype6-dev \
    fontconfig

# Nettoyage du cache apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Configuration de l'extension GD (indispensable pour les avatars de profil)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# 3. Installation des extensions PHP (sans fontconfig ici !)
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# 4. Récupération de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définition du dossier de travail
WORKDIR /var/www

# Copie du code
COPY . .

# Installation des dépendances PHP
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Droits sur les dossiers de stockage
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]