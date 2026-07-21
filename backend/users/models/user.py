"""Modèle utilisateur du CRM.

Hérite d'AbstractUser : mêmes champs que le User Django (username, email,
password, is_staff, is_superuser...), mais c'est NOTRE modèle. Le déclarer
custom dès le départ permet de l'étendre plus tard (avatar, rôle, téléphone...)
sans la migration douloureuse d'un changement d'AUTH_USER_MODEL a posteriori.
"""
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass
