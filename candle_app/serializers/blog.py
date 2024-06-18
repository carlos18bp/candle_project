from rest_framework import serializers
from candle_app.models import Blog

class BlogSerializer(serializers.ModelSerializer):
    """
    Blog serializer.

    Serializes and deserializes Blog instances.
    """

    class Meta:
        model = Blog
        fields = '__all__'

