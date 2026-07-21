"""Package des vues CRM. Ré-exporte les ViewSets pour `crm.views`."""
from .company import CompanyViewSet
from .contact import ContactViewSet
from .deal import DealViewSet

__all__ = ["CompanyViewSet", "ContactViewSet", "DealViewSet"]
