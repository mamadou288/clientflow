"""ViewSet Contact : CRUD + filtrage optionnel par ?company=<id>."""
from rest_framework import viewsets

from ..models import Contact
from ..serializers import ContactSerializer


class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer

    def get_queryset(self):
        queryset = Contact.objects.all()
        company_id = self.request.query_params.get("company")
        if company_id:
            queryset = queryset.filter(company_id=company_id)
        return queryset
