import os
import random
from faker import Faker
from django.core.files import File
from django.core.management.base import BaseCommand
from candle_app.models import Product, Color
from django_attachments.models import Attachment, Library

class Command(BaseCommand):
    help = 'Create Product records in the database'

    def add_arguments(self, parser):
        parser.add_argument('number_of_products', type=int, nargs='?', default=10)

    def handle(self, *args, **options):
        number_of_products = options['number_of_products']
        fake = Faker()

        # List of test images
        test_images = [
            'media/temp/product/image_temp1.webp',
            'media/temp/product/image_temp2.webp',
            'media/temp/product/image_temp3.webp',
            'media/temp/product/image_temp4.webp',
        ]

        # Ensure the test images exist
        for image_path in test_images:
            if not os.path.isfile(os.getcwd() + '/' + image_path):
                self.stdout.write(self.style.ERROR(f'Image file {image_path} not found'))
                return

        categories = [
            'Aesthetic Candles',
            'Decor',
            'Gift & Party Favors'    
        ]
        sub_categories = {
            'Aesthetic Candles': [
                'Greek Sculptures',
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
                'Gender Reveal & Baby Showers',
                'Trending Now'
            ]  
        }

        predefined_colors = ['red', 'blue', 'yellow', 'green', 'orange', 'violet', 'black', 'white', 'pink', 'rose']

        for _ in range(number_of_products):
            category = random.choice(categories)
            sub_category = random.choice(sub_categories[category])
            title = fake.word().capitalize()
            description  = fake.text(max_nb_chars=300)

            # Select four random colors
            selected_colors = random.sample(predefined_colors, 4)
            color_objects = [Color.objects.get_or_create(name=color_name)[0] for color_name in selected_colors]

            # Create a new gallery (library)
            gallery = Library.objects.create(title=title)

            # Add test images to the gallery
            for image_path in test_images:
                full_image_path = os.getcwd() + '/' + image_path
                with open(full_image_path, 'rb') as image_file:
                    Attachment.objects.create(
                        library=gallery,
                        file=File(image_file, name=os.path.basename(full_image_path)),
                        original_name=os.path.basename(full_image_path),
                        rank=0  # You can set rank as needed
                    )

            new_product = Product.objects.create(
                category=category + ' (EN)',
                sub_category=sub_category + ' (EN)',
                title=title + ' (EN)',
                description=description + ' (EN)',
                ingredients=fake.text(max_nb_chars=100) + ' (EN)',
                how_to_use=fake.text(max_nb_chars=100) + ' (EN)',
                how_to_feel=fake.text(max_nb_chars=100) + ' (EN)',
                price=fake.random_int(min=100, max=190),
                gallery=gallery,
                categoria=category + ' (ES)',
                sub_categoria=sub_category + ' (ES)',
                titulo=title + ' (ES)',
                descripcion=description + ' (ES)',
                ingredientes=fake.text(max_nb_chars=100) + ' (ES)',
                como_usarlo=fake.text(max_nb_chars=100) + ' (ES)',
                como_se_siente=fake.text(max_nb_chars=100) + ' (ES)',
            )

            # Add the selected colors to the product
            new_product.colors.add(*color_objects)

            self.stdout.write(self.style.SUCCESS(f'Product "{new_product}" created with gallery "{gallery}" and colors "{selected_colors}"'))

        self.stdout.write(self.style.SUCCESS(f'"{Product.objects.count()}" Product records created'))
