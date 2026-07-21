#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="${REMOTE_HOST:?REMOTE_HOST не задан}"
REMOTE_USER="${REMOTE_USER:?REMOTE_USER не задан}"
REMOTE_TARGET="${REMOTE_TARGET:-/var/www/manitfood-landing/dist}"
SSH_KEY="${SSH_KEY:-~/.ssh/id_rsa}"

echo "==> Building Astro site..."
npm ci
npm run build

echo "==> Deploying to ${REMOTE_HOST}..."
rsync -avz --delete \
  -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no" \
  ./dist/ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_TARGET}"

echo "==> Reloading Nginx..."
ssh -i "${SSH_KEY}" -o StrictHostKeyChecking=no "${REMOTE_USER}@${REMOTE_HOST}" \
  "sudo nginx -t && sudo systemctl reload nginx"

echo "==> Done!"
