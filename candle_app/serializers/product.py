from rest_framework import serializers
from candle_app.models import Product, Color
from candle_app.serializers import ColorSerializer

class ProductSerializer(serializers.ModelSerializer):
    """
    Product serializer.

    Serializes and deserializes Product instances.
    """

    color = ColorSerializer()

    class Meta:
        model = Product
        fields = '__all__'
