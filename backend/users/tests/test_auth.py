"""Tests d'authentification JWT : login OK/KO, endpoint protégé, /me."""
import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()


@pytest.fixture
def api():
    return APIClient()


@pytest.fixture
def user(db):
    return User.objects.create_user(
        username="tester", password="pass12345", email="tester@clientflow.dev"
    )


def test_login_returns_tokens(api, user):
    res = api.post(
        "/api/auth/token/",
        {"username": "tester", "password": "pass12345"},
        format="json",
    )
    assert res.status_code == 200
    assert "access" in res.json()
    assert "refresh" in res.json()


def test_login_wrong_password_is_rejected(api, user):
    res = api.post(
        "/api/auth/token/",
        {"username": "tester", "password": "wrong"},
        format="json",
    )
    assert res.status_code == 401


@pytest.mark.django_db
def test_me_requires_authentication(api):
    res = api.get("/api/auth/me/")
    assert res.status_code == 401


def test_me_returns_current_user(api, user):
    login = api.post(
        "/api/auth/token/",
        {"username": "tester", "password": "pass12345"},
        format="json",
    )
    access = login.json()["access"]
    api.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")

    res = api.get("/api/auth/me/")
    assert res.status_code == 200
    assert res.json()["username"] == "tester"
