"""Routage racine du projet.

- /admin/ : administration Django
- /api/   : API REST du CRM (companies, contacts, deals)
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("crm.urls")),
]
