"""Serializer Contact : mappe first_name→firstName, company→companyId, etc."""
from rest_framework import serializers

from ..models import Company, Contact


class ContactSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source="first_name")
    lastName = serializers.CharField(source="last_name")
    companyId = serializers.PrimaryKeyRelatedField(
        source="company", queryset=Company.objects.all()
    )
    createdAt = serializers.DateField(source="created_at", read_only=True)

    class Meta:
        model = Contact
        fields = [
            "id",
            "firstName",
            "lastName",
            "email",
            "phone",
            "position",
            "companyId",
            "createdAt",
        ]
