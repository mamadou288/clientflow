"""Modèle Deal (opportunité commerciale)."""
from datetime import date

from django.db import models

from .company import Company
from .contact import Contact


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
