"""Modèle Contact (personne rattachée à une entreprise)."""
from datetime import date

from django.db import models

from .company import Company


class Contact(models.Model):
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=40, blank=True)
    position = models.CharField(max_length=120, blank=True)
    company = models.ForeignKey(
        Company, related_name="contacts", on_delete=models.CASCADE
    )
    created_at = models.DateField(default=date.today, editable=False)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
