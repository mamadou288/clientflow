"""Routes d'authentification, montées sous /api/auth/ dans config/urls.py.

- POST /api/auth/token/          -> {access, refresh} (login)
- POST /api/auth/token/refresh/  -> {access} (renouvelle l'access token)
- GET  /api/auth/me/             -> l'utilisateur courant (token requis)
"""
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import MeView

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", MeView.as_view(), name="me"),
]
