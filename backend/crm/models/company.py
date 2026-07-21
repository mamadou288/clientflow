"""Modèle Company (entreprise)."""
from datetime import date

from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=200)
    industry = models.CharField(max_length=120, blank=True)
    city = models.CharField(max_length=120, blank=True)
    country = models.CharField(max_length=120, blank=True)
    website = models.CharField(max_length=200, blank=True)
    employees = models.PositiveIntegerField(default=0)
    created_at = models.DateField(default=date.today, editable=False)

    class Meta:
        ordering = ["id"]
        verbose_name_plural = "companies"

    def __str__(self):
        return self.name
