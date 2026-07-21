"""Package des serializers CRM. Ré-exporte pour un import simple (`crm.serializers`)."""
from .company import CompanySerializer
from .contact import ContactSerializer
from .deal import DealSerializer

__all__ = ["CompanySerializer", "ContactSerializer", "DealSerializer"]
