from rest_framework import serializers
from .models import Kitchen

class KitchenSerializer(serializers.ModelSerializer):
    contactNumber = serializers.CharField(source='contact_number')
    openingHours = serializers.CharField(source='opening_hours')
    orderAcceptTime = serializers.CharField(source='order_accept_time')
    class Meta:
        model = Kitchen
        fields = ["name", "address", "contactNumber", "cuisine", "description", "logo", "banner", "openingHours", "orderAcceptTime", "owner"]
