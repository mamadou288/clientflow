"""Package des modèles CRM.

Ré-exporte les modèles pour que Django les découvre via `crm.models`
(indispensable : sans ces imports, le package cacherait les classes).
"""
from .company import Company
from .contact import Contact
from .deal import Deal

__all__ = ["Company", "Contact", "Deal"]
