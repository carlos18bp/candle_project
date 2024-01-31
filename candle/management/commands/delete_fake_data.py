from django.core.management.base import BaseCommand
from candle.models import Blog, Product, Review

class Command(BaseCommand):
    help = 'Create rake records in the database'

    """
    To delete fake data via console, run:
    python3 manage.py delete_fake_data
    """
    def handle(self, *args, **options):
        Blog.objects.all().delete()
        Product.objects.all().delete()
        Review.objects.all().delete()