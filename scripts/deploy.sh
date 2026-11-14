#!/usr/bin/env bash
# Publica el sitio en el VPS (servidor de Soleil). Uso: npm run deploy
# Construye dist/ para la raíz del dominio y lo sube con rsync (solo lo que cambió; borra lo que ya no existe).
set -euo pipefail

SERVER="jddeploy@66.179.137.11"
REMOTE_DIR="/var/www/jd-service/"
KEY="$HOME/.ssh/jd-service-deploy-ed25519"
# Dominio real (comprado en Hostinger). jd.66-179-137-11.sslip.io sigue funcionando como dirección alterna.
export SITE_URL="${SITE_URL:-https://jdfixing.com}"
export BASE="/"
export PREVIEW="${PREVIEW:-true}"

cd "$(dirname "$0")/.."
node build.mjs
# --checksum: compara el contenido (build.mjs regenera todo y cambia las fechas de los archivos).
rsync -az --checksum --delete --human-readable --stats -e "ssh -i $KEY -o IdentitiesOnly=yes" dist/ "$SERVER:$REMOTE_DIR" | grep -E "Number of (regular )?files transferred|Total transferred file size"
echo "✓ Publicado en $SITE_URL"
