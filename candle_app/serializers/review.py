from rest_framework import serializers
from candle_app.models import Review
from candle_app.serializers import ProductSerializer, UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
    """
    Review serializer.

    Serializes and deserializes Review instances.
    """
    user = UserSerializer()

    class Meta:
        model = Review
        fields = '__all__'
