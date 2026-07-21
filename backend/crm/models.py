"""Modèles du CRM : Company, Contact, Deal.

Les champs sont en snake_case (convention Python/Django). La couche serializers
les exposera en camelCase pour respecter le contrat attendu par le frontend React.
"""
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


class Deal(models.Model):
    class Stage(models.TextChoices):
        LEAD = "lead", "Lead"
        QUALIFIED = "qualified", "Qualified"
        PROPOSAL = "proposal", "Proposal"
        WON = "won", "Won"
        LOST = "lost", "Lost"

    title = models.CharField(max_length=200)
    company = models.ForeignKey(
        Company, related_name="deals", on_delete=models.CASCADE
    )
    contact = models.ForeignKey(
        Contact, related_name="deals", on_delete=models.SET_NULL, null=True, blank=True
    )
    amount = models.PositiveIntegerField(default=0, help_text="Montant en EUR")
    stage = models.CharField(
        max_length=20, choices=Stage.choices, default=Stage.LEAD
    )
    created_at = models.DateField(default=date.today, editable=False)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.title
