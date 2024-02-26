from django.db import models
from candle.models import ProductResource

class Product(models.Model):
    """
    Product model.

    :ivar category: title product.
    :vartype category: str
    :ivar subcategory: title product.
    :vartype subcategory: str
    :ivar title: title product.
    :vartype title: str
    :ivar description: description product.
    :vartype description: str
    :ivar price: price invoice.
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

    def __str__(self):
        return self.title