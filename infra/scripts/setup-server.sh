#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-manitfood.ru}"
EMAIL="${EMAIL:-admin@manitfood.ru}"
NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${DOMAIN}"
WEBROOT="/var/www/manitfood-landing/dist"
CERTBOT_WEBROOT="/var/www/certbot"

echo "==> Updating system..."
sudo apt-get update -y
sudo apt-get install -y nginx certbot python3-certbot-nginx rsync curl git

echo "==> Creating directories..."
sudo mkdir -p "${WEBROOT}"
sudo mkdir -p "${CERTBOT_WEBROOT}"
sudo chown -R "${USER}:${USER}" /var/www/manitfood-landing

echo "==> Copying Nginx config..."
sudo cp infra/nginx/manitfood.conf "${NGINX_CONF}"
sudo ln -sf "${NGINX_CONF}" "${NGINX_ENABLED}"
sudo rm -f /etc/nginx/sites-enabled/default

echo "==> Obtaining SSL certificate..."
sudo certbot certonly --webroot -w "${CERTBOT_WEBROOT}" -d "${DOMAIN}" -d "www.${DOMAIN}" --agree-tos --non-interactive --email "${EMAIL}"

echo "==> Testing and reloading Nginx..."
sudo nginx -t && sudo systemctl restart nginx

echo "==> Setting up auto-renewal cron..."
echo "0 3 * * * certbot renew --quiet && systemctl reload nginx" | sudo tee /etc/cron.d/certbot-renew

echo "==> Server setup complete!"
echo "Now run: ./infra/scripts/deploy.sh"
