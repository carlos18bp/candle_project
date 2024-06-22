from django.db import models
from django_attachments.models import Library
from django_attachments.fields import SingleImageField

class Blog(models.Model):
    """
    Blog model.

    :ivar title: title blog.
    :vartype title: str
    :ivar description: description blog.
    :vartype description: str
    :ivar category: category blog.
    :vartype category: str
    :ivar image: image by blog.
    :vartype image: Image
    """

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=40)
    image = SingleImageField(related_name='blog_image', on_delete=models.CASCADE)

    """
    Fields to language toggle porpose.

    :ivar titulo: titulo blog.
    :vartype titulo: str
    :ivar descripcion: descripcion blog.
    :vartype descripcion: str
    :ivar categoria: category blog.
    :vartype categoria: str
    """

    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=40)

    def __str__(self):
        return self.title
    
    def delete(self, *args, **kwargs):
        try:
            if self.image:
                self.image.delete()
        except Library.DoesNotExist:
            pass
        super(Blog, self).delete(*args, **kwargs)