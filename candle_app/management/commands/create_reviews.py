import os
import random
from faker import Faker
from django.core.files import File
from datetime import date, timedelta
from django.core.management.base import BaseCommand
from candle_app.models import Product, User, Review

class Command(BaseCommand):
    help = 'Create review records in the database'

    def add_arguments(self, parser):
        parser.add_argument('number_of_reviews', type=int, nargs='?', default=10)

    def handle(self, *args, **options):
        number_of_reviews = options['number_of_reviews']
        fake = Faker()

        products = Product.objects.all()

        for _ in range(number_of_reviews):
            product = random.choice(products)

            new_user = User.objects.create(
                full_name = fake.first_name(),
                birthday_date = fake.date_between(start_date=date.today(), 
                                                  end_date=date.today() + timedelta(days=30)),
                email = fake.email(),
            )

            new_review = Review.objects.create(
                rate = fake.random_int(min=1, max=5),
                description  = fake.text(max_nb_chars=300),
                user = new_user,
                product = product
            )

            self.stdout.write(self.style.SUCCESS(f'Review "{new_review}" created'))
        
        print(f'"{len(Review.objects.all())}" Review records created')