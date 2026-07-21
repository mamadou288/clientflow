#!/bin/sh
set -e

# Applique les migrations à chaque démarrage (auth, admin, sessions… + crm).
echo "→ Migrations…"
python manage.py migrate --noinput

echo "→ Démarrage : $*"
exec "$@"
