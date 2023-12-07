from rest_framework import serializers
from .models import Kitchen

class KitchenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kitchen
        fields = "__all__"
