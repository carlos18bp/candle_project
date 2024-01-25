from django.db import models

class Blog(models.Model):
    """
    Blog model.

    :ivar title: title product.
    :vartype title: str
    :ivar description: description product.
    :vartype description: str
    :ivar image: image by product.
    :vartype image: Image
    """

    title = models.CharField(max_length=40)
    description = models.TextField()
    image = models.ImageField(upload_to='blog_images/', null=True, blank=True)

    def __str__(self):
        return self.title