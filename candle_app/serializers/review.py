from rest_framework import serializers
from candle_app.models import Review

class ReviewSerializer(serializers.ModelSerializer):
    """
    Review serializer.

    Serializes and deserializes Review instances.
    """

    class Meta:
        model = Review
        fields = '__all__'
