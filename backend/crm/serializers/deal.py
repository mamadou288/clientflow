"""Serializer Deal : mappe company→companyId, contact→contactId (nullable), etc."""
from rest_framework import serializers

from ..models import Company, Contact, Deal


class DealSerializer(serializers.ModelSerializer):
    companyId = serializers.PrimaryKeyRelatedField(
        source="company", queryset=Company.objects.all()
    )
    contactId = serializers.PrimaryKeyRelatedField(
        source="contact",
        queryset=Contact.objects.all(),
        allow_null=True,
        required=False,
    )
    createdAt = serializers.DateField(source="created_at", read_only=True)

    class Meta:
        model = Deal
        fields = [
            "id",
            "title",
            "companyId",
            "contactId",
            "amount",
            "stage",
            "createdAt",
        ]
