import os
from django.core.files import File
from django.core.management.base import BaseCommand
from candle.models import ProductResource

class Command(BaseCommand):
    help = 'Create Product Resource records in the database'

    def add_arguments(self, parser):
        parser.add_argument('number_of_product_resources', type=int, nargs='?', default=1)

    def handle(self, *args, **options):
        self._create_resource(ProductResource.objects.create(), 
                              os.getcwd() + '/media/temp/product_temp1.jpg')
        self._create_resource(ProductResource.objects.create(), 
                              os.getcwd() + '/media/temp/product_temp2.jpg')
        self._create_resource(ProductResource.objects.create(), 
                              os.getcwd() + '/media/temp/product_temp3.jpg')
        self._create_resource(ProductResource.objects.create(), 
                              os.getcwd() + '/media/temp/product_temp4.jpg')
        
        print(f'"{len(ProductResource.objects.all())}" Product Resource records created')

    def _create_resource(self, new_product_resource, image_path):
        name_file = image_path.split("/")[-1]
        with open(image_path, 'rb') as file:
            new_product_resource.image.save(name_file, File(file), save=True)