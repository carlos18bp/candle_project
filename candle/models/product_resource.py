from django.db import models

class ProductResource(models.Model):
    """
    ProductImage model.

    :ivar image: image by product.
    :vartype image: Image
    """
        
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
