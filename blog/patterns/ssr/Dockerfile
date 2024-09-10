FROM php:8.3-alpine
WORKDIR /app

COPY --from=composer:2.7 /usr/bin/composer /usr/local/bin/composer

RUN apk update && \
    apk add libpq-dev && \
    docker-php-ext-install pgsql

COPY composer.* ./
RUN composer install --no-interaction

COPY . .

WORKDIR /app/public
ENTRYPOINT ["php", "-S", "0.0.0.0:8000"]
