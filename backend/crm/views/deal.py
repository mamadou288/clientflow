"""ViewSet Deal : CRUD + filtrage optionnel par ?company=<id> et/ou ?contact=<id>."""
from rest_framework import viewsets

from ..models import Deal
from ..serializers import DealSerializer


class DealViewSet(viewsets.ModelViewSet):
    serializer_class = DealSerializer

    def get_queryset(self):
        queryset = Deal.objects.all()
        company_id = self.request.query_params.get("company")
        contact_id = self.request.query_params.get("contact")
        if company_id:
            queryset = queryset.filter(company_id=company_id)
        if contact_id:
            queryset = queryset.filter(contact_id=contact_id)
        return queryset
