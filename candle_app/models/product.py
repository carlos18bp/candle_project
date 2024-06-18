from django.db import models
from django_attachments.fields import GalleryField
from django_attachments.models import Library
from candle_app.models import Color

class Product(models.Model):
    """
    Product model.

    :ivar category: category product.
    :vartype category: str
    :ivar sub_category: subcategory product.
    :vartype sub_category: str
    :ivar title: title product.
    :vartype title: str
    :ivar description: description product.
    :vartype description: str
    :ivar ingredients: ingredients of the product.
    :vartype ingredients: str
    :ivar how_to_use: instructions on how to use the product.
    :vartype how_to_use: str
    :ivar how_to_feel: description of how the product makes you feel.
    :vartype how_to_feel: str
    :ivar price: price of the product.
    :vartype price: int
    :ivar color: color associated with the product.
    :vartype color: Color
    :ivar gallery: gallery of images associated with the product.
    :vartype gallery: Gallery
    :ivar categoria: category of the product in Spanish.
    :vartype categoria: str
    :ivar sub_categoria: subcategory of the product in Spanish.
    :vartype sub_categoria: str
    :ivar titulo: title of the product in Spanish.
    :vartype titulo: str
    :ivar descripcion: description of the product in Spanish.
    :vartype descripcion: str
    :ivar ingredientes: ingredients of the product in Spanish.
    :vartype ingredientes: str
    :ivar como_usarlo: instructions on how to use the product in Spanish.
    :vartype como_usarlo: str
    :ivar como_se_siente: description of how the product makes you feel in Spanish.
    :vartype como_se_siente: str
    """

    category = models.CharField(max_length=40)
    sub_category = models.CharField(max_length=40)
    title = models.CharField(max_length=40)
    description = models.TextField()
    ingredients = models.TextField()
    how_to_use = models.TextField()
    how_to_feel = models.TextField()

    price = models.IntegerField()
    colors = models.ManyToManyField(Color, related_name='products')
    gallery = GalleryField(related_name='products_with_attachment', on_delete=models.CASCADE)

    # Fields to language toggle purpose.
    categoria = models.CharField(max_length=40)
    sub_categoria = models.CharField(max_length=40)
    titulo = models.CharField(max_length=40)
    descripcion = models.TextField()
    ingredientes = models.TextField()
    como_usarlo = models.TextField()
    como_se_siente = models.TextField()

    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        """
        Custom delete method to ensure the gallery is also deleted when a Product is deleted.
        """
        try:
            if self.gallery:
                self.gallery.delete()
        except Library.DoesNotExist:
            pass
        super(Product, self).delete(*args, **kwargs)
