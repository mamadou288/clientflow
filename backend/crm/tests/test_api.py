"""Tests de l'API CRM : permissions, CRUD, contrat camelCase, filtres."""
import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from crm.models import Company, Contact

User = get_user_model()


@pytest.fixture
def api():
    return APIClient()


@pytest.fixture
def auth_api(db):
    user = User.objects.create_user(username="tester", password="pass12345")
    client = APIClient()
    client.force_authenticate(user=user)
    return client


@pytest.mark.django_db
def test_companies_require_authentication(api):
    res = api.get("/api/companies/")
    assert res.status_code == 401


def test_companies_list_authenticated(auth_api):
    Company.objects.create(name="Acme")
    res = auth_api.get("/api/companies/")
    assert res.status_code == 200
    assert len(res.json()) == 1


def test_create_company_returns_camelcase(auth_api):
    res = auth_api.post(
        "/api/companies/", {"name": "Nova", "employees": 5}, format="json"
    )
    assert res.status_code == 201
    body = res.json()
    assert body["name"] == "Nova"
    assert "createdAt" in body  # contrat camelCase attendu par le front


def test_contacts_filtered_by_company(auth_api):
    a = Company.objects.create(name="A")
    b = Company.objects.create(name="B")
    Contact.objects.create(first_name="x", last_name="y", company=a)
    Contact.objects.create(first_name="z", last_name="w", company=b)

    res = auth_api.get(f"/api/contacts/?company={a.id}")
    assert res.status_code == 200
    body = res.json()
    assert len(body) == 1
    assert body[0]["companyId"] == a.id
