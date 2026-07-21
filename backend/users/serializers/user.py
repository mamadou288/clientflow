"""Serializer User : expose l'utilisateur courant au front (camelCase)."""
from rest_framework import serializers

from ..models import User


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source="first_name", required=False, allow_blank=True)
    lastName = serializers.CharField(source="last_name", required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "firstName", "lastName"]
