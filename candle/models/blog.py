from django.db import models

class Blog(models.Model):
    """
    Blog model.

    :ivar title: title blog.
    :vartype title: str
    :ivar brief_description: brief_description blog.
    :vartype brief_description: str
    :ivar description: description blog.
    :vartype description: str
    :ivar category: category blog.
    :vartype category: str
    :ivar publication_date: publication date.
    :vartype publication_date: datetime.date
    :ivar image: image by blog.
    :vartype image: Image
    """

    title = models.CharField(max_length=200)
    brief_description = models.TextField()
    description = models.TextField()
    category = models.CharField(max_length=40)
    publication_date =  models.DateField()
    owner_full_name = models.CharField(max_length=40)
    owner_image = models.ImageField(upload_to='blog_images/', null=True, blank=True)
    image = models.ImageField(upload_to='blog_images/', null=True, blank=True)

    def __str__(self):
        return self.title