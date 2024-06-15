from rest_framework import serializers
from candle_app.models import Color

class ColorSerializer(serializers.ModelSerializer):
    """
    Color serializer.

    Serializes and deserializes Color instances.
    """
    
    class Meta:
        model = Color
        fields = '__all__'
