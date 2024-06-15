from rest_framework import serializers
from candle_app.models import User

class UserSerializer(serializers.ModelSerializer):
    """
    User serializer.

    Serializes and deserializes User instances.
    """
    
    class Meta:
        model = User
        fields = '__all__'