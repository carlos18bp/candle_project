from faker import Faker
from django.core.management import call_command
from django.core.management.base import BaseCommand
from candle.models import Product, ProductResource

class Command(BaseCommand):
    help = 'Create Product records in the database'

    def add_arguments(self, parser):
        parser.add_argument('number_of_products', type=int, nargs='?', default=10)

    def handle(self, *args, **options):

        number_of_products = options['number_of_products']
        fake = Faker()  

        for _ in range(number_of_products):
            new_product = Product.objects.create(
                title = fake.word(),
                description  = fake.text(max_nb_chars=300),
                price = fake.random_int(min=100, max=190),
            )

            new_product.images.add(*ProductResource.objects.all())

            self.stdout.write(self.style.SUCCESS(f'Product "{new_product}" created'))
        
        print(f'"{len(Product.objects.all())}" Product records created')