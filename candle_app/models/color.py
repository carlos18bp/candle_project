from django.db import models

class Color(models.Model):
    """
    Color model.

    :ivar name: Name of the color.
    :vartype name: str
    """

    name = models.CharField(max_length=50)

    def __str__(self):
        """
        String representation of the Color model.
        
        :return: Name of the color.
        :rtype: str
        """
        return self.name
