"""Commande de seed : charge un jeu de démonstration réaliste.

Idempotente — vide les tables du CRM puis recrée les données avec les mêmes
identifiants et dates que le jeu de démonstration d'origine du frontend, pour
que l'application soit identique après la bascule mock -> API.

Usage : python manage.py seed
"""
from datetime import date

from django.core.management.base import BaseCommand
from django.core.management.color import no_style
from django.db import connection, transaction

from crm.models import Company, Contact, Deal

COMPANIES = [
    (1, "Nova Digital", "Agence web", "Paris", "France", "nova-digital.fr", 45, "2025-01-12"),
    (2, "BlueOcean Logistics", "Transport & Logistique", "Le Havre", "France", "blueocean-logistics.com", 320, "2025-02-03"),
    (3, "Greenfield Energy", "Énergie", "Lyon", "France", "greenfield-energy.fr", 120, "2025-02-20"),
    (4, "Helvetia Finance", "Services financiers", "Genève", "Suisse", "helvetia-finance.ch", 540, "2025-03-08"),
    (5, "Atlas Manufacturing", "Industrie", "Toulouse", "France", "atlas-mfg.com", 870, "2025-03-25"),
    (6, "Lumen Health", "Santé", "Bruxelles", "Belgique", "lumen-health.be", 210, "2025-04-11"),
    (7, "Pixel Forge", "Jeux vidéo", "Montréal", "Canada", "pixelforge.io", 65, "2025-04-29"),
    (8, "Saveurs & Co", "Agroalimentaire", "Bordeaux", "France", "saveurs-co.fr", 30, "2025-05-15"),
]

CONTACTS = [
    (1, "Camille", "Laurent", "camille.laurent@nova-digital.fr", "+33 6 12 34 56 78", "Directrice marketing", 1, "2025-01-15"),
    (2, "Thomas", "Bernard", "thomas.bernard@nova-digital.fr", "+33 6 23 45 67 89", "CEO", 1, "2025-01-18"),
    (3, "Sophie", "Moreau", "s.moreau@blueocean-logistics.com", "+33 6 34 56 78 90", "Responsable achats", 2, "2025-02-05"),
    (4, "Julien", "Petit", "j.petit@blueocean-logistics.com", "+33 6 45 67 89 01", "Directeur des opérations", 2, "2025-02-12"),
    (5, "Inès", "Garnier", "ines.garnier@greenfield-energy.fr", "+33 6 56 78 90 12", "Responsable innovation", 3, "2025-02-22"),
    (6, "Marc", "Rousseau", "m.rousseau@helvetia-finance.ch", "+41 79 123 45 67", "Directeur financier", 4, "2025-03-10"),
    (7, "Laura", "Schneider", "l.schneider@helvetia-finance.ch", "+41 79 234 56 78", "Responsable IT", 4, "2025-03-14"),
    (8, "Antoine", "Faure", "a.faure@atlas-mfg.com", "+33 6 67 89 01 23", "Directeur industriel", 5, "2025-03-27"),
    (9, "Émma", "Lefevre", "e.lefevre@atlas-mfg.com", "+33 6 78 90 12 34", "Acheteuse", 5, "2025-04-02"),
    (10, "David", "Janssens", "d.janssens@lumen-health.be", "+32 470 12 34 56", "Directeur médical", 6, "2025-04-13"),
    (11, "Chloé", "Dubois", "c.dubois@lumen-health.be", "+32 470 23 45 67", "Responsable achats", 6, "2025-04-20"),
    (12, "Liam", "Tremblay", "liam@pixelforge.io", "+1 514 123 4567", "Studio Director", 7, "2025-05-01"),
    (13, "Olivia", "Roy", "olivia@pixelforge.io", "+1 514 234 5678", "Productrice", 7, "2025-05-06"),
    (14, "Hugo", "Girard", "h.girard@saveurs-co.fr", "+33 6 89 01 23 45", "Gérant", 8, "2025-05-17"),
    (15, "Manon", "Lambert", "m.lambert@saveurs-co.fr", "+33 6 90 12 34 56", "Responsable commerciale", 8, "2025-05-22"),
]

DEALS = [
    (1, "Refonte site e-commerce", 1, 1, 28000, "proposal", "2025-03-02"),
    (2, "Campagne acquisition Q2", 1, 2, 15000, "won", "2025-03-18"),
    (3, "Optimisation chaîne logistique", 2, 3, 92000, "qualified", "2025-03-25"),
    (4, "Contrat transport annuel", 2, 4, 140000, "lead", "2025-04-01"),
    (5, "Audit énergétique sites", 3, 5, 47000, "proposal", "2025-04-08"),
    (6, "Plateforme reporting financier", 4, 6, 210000, "qualified", "2025-04-15"),
    (7, "Migration infrastructure cloud", 4, 7, 175000, "won", "2025-04-22"),
    (8, "Ligne de production automatisée", 5, 8, 320000, "lead", "2025-04-28"),
    (9, "Fournisseur composants 2026", 5, 9, 88000, "lost", "2025-05-03"),
    (10, "Logiciel de gestion patients", 6, 10, 64000, "proposal", "2025-05-09"),
    (11, "Outil de production de jeu", 7, 12, 53000, "qualified", "2025-05-14"),
    (12, "Distribution gamme bio", 8, 15, 36000, "won", "2025-05-24"),
]


class Command(BaseCommand):
    help = "Charge un jeu de démonstration (entreprises, contacts, opportunités)."

    @transaction.atomic
    def handle(self, *args, **options):
        # On vide dans l'ordre inverse des dépendances (deals -> contacts -> companies).
        Deal.objects.all().delete()
        Contact.objects.all().delete()
        Company.objects.all().delete()

        Company.objects.bulk_create([
            Company(
                id=cid, name=name, industry=industry, city=city, country=country,
                website=website, employees=employees, created_at=date.fromisoformat(created),
            )
            for (cid, name, industry, city, country, website, employees, created) in COMPANIES
        ])

        Contact.objects.bulk_create([
            Contact(
                id=cid, first_name=first, last_name=last, email=email, phone=phone,
                position=position, company_id=company_id, created_at=date.fromisoformat(created),
            )
            for (cid, first, last, email, phone, position, company_id, created) in CONTACTS
        ])

        Deal.objects.bulk_create([
            Deal(
                id=did, title=title, company_id=company_id, contact_id=contact_id,
                amount=amount, stage=stage, created_at=date.fromisoformat(created),
            )
            for (did, title, company_id, contact_id, amount, stage, created) in DEALS
        ])

        # Les ids étant insérés explicitement, on réaligne les séquences
        # d'auto-increment (sinon la 1re création via l'API entre en collision
        # avec un id existant sur PostgreSQL).
        reset_sql = connection.ops.sequence_reset_sql(no_style(), [Company, Contact, Deal])
        if reset_sql:
            with connection.cursor() as cursor:
                for statement in reset_sql:
                    cursor.execute(statement)

        self.stdout.write(self.style.SUCCESS(
            f"Seed OK : {len(COMPANIES)} entreprises, {len(CONTACTS)} contacts, {len(DEALS)} opportunités."
        ))
