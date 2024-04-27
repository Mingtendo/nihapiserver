from rest_framework import serializers
from models import IDObject

class IDSerializer(serializers.ModelSerializer):

    class Meta:
        model = IDObject
        fields = ["id"]