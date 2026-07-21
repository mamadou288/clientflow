#!/bin/sh
set -e

# Applique les migrations à chaque démarrage (auth, admin, sessions… + crm).
echo "→ Migrations…"
python manage.py migrate --noinput

# Seed du jeu de démo uniquement si la base CRM est vide (n'écrase pas les
# données ajoutées via l'UI). Désactivable avec SEED=0.
if [ "${SEED:-1}" != "0" ]; then
  if [ "$(python manage.py shell -c 'from crm.models import Company; print(Company.objects.exists())')" = "False" ]; then
    echo "→ Base vide : chargement du jeu de démonstration…"
    python manage.py seed
  else
    echo "→ Données déjà présentes : seed ignoré."
  fi
fi

echo "→ Démarrage : $*"
exec "$@"
