from rest_framework import serializers
from .models import Kitchen, MenuItem

class KitchenSerializer(serializers.ModelSerializer):
    contactNumber = serializers.CharField(source='contact_number')
    openingHours = serializers.CharField(source='opening_hours')
    orderAcceptTime = serializers.CharField(source='order_accept_time')
    class Meta:
        model = Kitchen
        fields = ["name", "address", "contactNumber", "cuisine", "description", "logo", "banner", "openingHours", "orderAcceptTime", "owner"]

class MenuItemSerializer(serializers.ModelSerializer):
    isAvailable = serializers.BooleanField(source='is_available')
    isVeg = serializers.BooleanField(source='is_veg')
    isSpicy = serializers.BooleanField(source='is_spicy')
    class Meta:
        model = MenuItem
        fields = ["name", "description", "price", "image", "category", "isAvailable", "isVeg", "isSpicy", "kitchen"]
