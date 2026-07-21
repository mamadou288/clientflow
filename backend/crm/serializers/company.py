"""Serializer Company : mappe snake_case (modèle) → camelCase (contrat front)."""
from rest_framework import serializers

from ..models import Company


class CompanySerializer(serializers.ModelSerializer):
    createdAt = serializers.DateField(source="created_at", read_only=True)

    class Meta:
        model = Company
        fields = [
            "id",
            "name",
            "industry",
            "city",
            "country",
            "website",
            "employees",
            "createdAt",
        ]
