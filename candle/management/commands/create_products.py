import random
from faker import Faker
from django.core.management.base import BaseCommand
from candle.models import Product, ProductResource

class Command(BaseCommand):
    help = 'Create Product records in the database'

    def add_arguments(self, parser):
        parser.add_argument('number_of_products', type=int, nargs='?', default=10)

    def handle(self, *args, **options):

        number_of_products = options['number_of_products']
        fake = Faker()

        categories = [
            'Aesthetic Candles',
            'Decor',
            'Gift & Party Favors'    
        ]
        sub_categories = {
            'Aesthetic Candles': [
                'Greek Scultures',
                'Love & Romance',
                'Minimalist Modern',
                'Cute Animals',
                'Flowers',
                'Holiday Glow',
                'New Arrivals'
            ],
            'Decor': [
                'Trending Now',
                'New Arrivals'
            ],
            'Gift & Party Favors': [
                "Valentine's Day",
                'Birthdays',
                'Wedding',
                'Christmas',
                "Mother's Day",
                'Gender reveal & Baby showers',
                'Trending Now'
            ]  
        }

        for _ in range(number_of_products):
            category = random.choice(categories)
            title = fake.word()
            description  = fake.text(max_nb_chars=300)

            new_product = Product.objects.create(
                category = category + ' (EN)',
                sub_category = random.choice(sub_categories[category]) + ' (EN)',
                title = title + ' (EN)',
                description  = description + ' (EN)',
                price = fake.random_int(min=100, max=190),
                categoria = category + ' (ES)',
                sub_categoria = random.choice(sub_categories[category]) + ' (ES)',
                titulo = title + ' (ES)',
                descripcion = description + ' (ES)',
            )

            new_product.images.add(*ProductResource.objects.all())

            self.stdout.write(self.style.SUCCESS(f'Product "{new_product}" created'))
        
        print(f'"{len(Product.objects.all())}" Product records created')