from django.db import models
from candle.models import User, Product
from django.core.validators import MinValueValidator, MaxValueValidator

class Review(models.Model):
    """
    UserProduct model.

    :ivar rate: title product.
    :vartype rate: int
    :ivar title: title product.
    :vartype title: str
    :ivar description: description product.
    :vartype description: str
    :ivar user: review by user.
    :vartype user: user
    :ivar product: review for product.
    :vartype product: product
    """
        
    rate = models.IntegerField(
        validators=[
            MinValueValidator(1, message="The minimum value allowed is 1"),
            MaxValueValidator(5, message="The maximum value allowed is 5"),
        ]
    )
    title = models.CharField(max_length=40)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
