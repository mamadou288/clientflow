FROM python:3.13-slim

# Sorties Python non bufferisées + pas de .pyc
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Dépendances d'abord (cache de couche Docker : ne réinstalle que si requirements change)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Code
COPY . .

RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

# Via "sh" : robuste même quand docker-compose monte le code par-dessus (bit +x non requis).
ENTRYPOINT ["sh", "/app/entrypoint.sh"]
# Commande par défaut (prod). En dev, docker-compose la remplace par runserver.
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
