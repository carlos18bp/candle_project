from django.db import models
from candle.models import ProductResource

class Product(models.Model):
    """
    Product model.

    :ivar category: category product.
    :vartype category: str
    :ivar subcategory: subcategory product.
    :vartype subcategory: str
    :ivar title: title product.
    :vartype title: str
    :ivar description: description product.
    :vartype description: str
    :ivar price: price product.
    :vartype price: int
    :ivar image: image by product.
    :vartype image: Image
    """

    category = models.CharField(max_length=40)
    sub_category = models.CharField(max_length=40)
    title = models.CharField(max_length=40)
    description = models.TextField()
    price = models.IntegerField()

    images = models.ManyToManyField(ProductResource)

    """
    Fields to language toggle porpose.

    :ivar categoria: categoria product.
    :vartype categoria: str
    :ivar subcategoria: subcategoria product.
    :vartype subcategoria: str
    :ivar titulo: title product.
    :vartype titulo: str
    :ivar descripcion: descripcion product.
    :vartype descripcion: str
    """

    categoria = models.CharField(max_length=40)
    sub_categoria = models.CharField(max_length=40)
    titulo = models.CharField(max_length=40)
    descripcion = models.TextField()

    def __str__(self):
        return self.title