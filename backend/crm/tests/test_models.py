"""Tests des modèles CRM : comportement métier (relations, valeurs par défaut)."""
from datetime import date

import pytest

from crm.models import Company, Contact, Deal


@pytest.mark.django_db
def test_company_str():
    company = Company.objects.create(name="Acme")
    assert str(company) == "Acme"


@pytest.mark.django_db
def test_contact_deleted_when_company_deleted():
    """FK company en CASCADE : supprimer l'entreprise supprime ses contacts."""
    company = Company.objects.create(name="Acme")
    Contact.objects.create(first_name="Ada", last_name="Lovelace", company=company)

    company.delete()

    assert Contact.objects.count() == 0


@pytest.mark.django_db
def test_deal_survives_contact_deletion():
    """FK contact en SET_NULL : supprimer le contact garde le deal (contact -> null)."""
    company = Company.objects.create(name="Acme")
    contact = Contact.objects.create(first_name="Ada", last_name="Lovelace", company=company)
    deal = Deal.objects.create(title="Big deal", company=company, contact=contact, amount=1000)

    contact.delete()
    deal.refresh_from_db()

    assert deal.contact_id is None
    assert Deal.objects.filter(pk=deal.pk).exists()


@pytest.mark.django_db
def test_deal_defaults():
    company = Company.objects.create(name="Acme")
    deal = Deal.objects.create(title="New", company=company)

    assert deal.stage == Deal.Stage.LEAD
    assert deal.amount == 0
    assert deal.created_at == date.today()
