"""Routes du CRM, générées par un DefaultRouter DRF.

Expose /companies/, /contacts/, /deals/ avec les actions REST standard.
Montées sous le préfixe /api/ dans config/urls.py.
"""
from rest_framework.routers import DefaultRouter

from .views import CompanyViewSet, ContactViewSet, DealViewSet

router = DefaultRouter()
router.register("companies", CompanyViewSet, basename="company")
router.register("contacts", ContactViewSet, basename="contact")
router.register("deals", DealViewSet, basename="deal")

urlpatterns = router.urls
