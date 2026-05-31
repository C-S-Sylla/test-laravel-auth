FROM php:8.4-apache

# Installation des dépendances système
RUN apt-get update && apt-get install -y libpng-dev libzip-dev zip unzip git

# Installation des extensions PHP
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configuration Apache
RUN a2enmod rewrite
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Copie des fichiers de dépendances uniquement pour optimiser le cache
WORKDIR /var/www/html
COPY composer.json composer.lock* ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Copie du reste du code
COPY . .

# Finalisation
RUN composer dump-autoload --optimize
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80