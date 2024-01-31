from django.db import models

class User(models.Model):
    """
    User model.

    :ivar full_name: full name.
    :vartype full_name: str
    :ivar birthday_date: birthday date.
    :vartype birthday_date: date
    :ivar email: email.
    :vartype email: email
    :ivar image: image by user.
    :vartype image: Image
    """

    full_name = models.CharField(max_length=40)
    birthday_date = models.DateField()
    email = models.EmailField(blank=True, null=True)
    image = models.ImageField(upload_to='user_images/', null=True, blank=True)

    def __str__(self):
        return self.full_name