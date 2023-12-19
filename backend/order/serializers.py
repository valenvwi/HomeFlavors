from rest_framework import serializers
from .models import Order, OrderItem
from kitchen.serializers import MenuItemSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    menuItem = MenuItemSerializer(read_only=True, source='menu_item')
    class Meta:
        model = OrderItem
        fields = ["id", "menuItem", "quantity"]

class OrderSerializer(serializers.ModelSerializer):
    orderItems = OrderItemSerializer(many=True, read_only=True, source='order_items')
    totalPrice = serializers.DecimalField(source='total_price', max_digits=10, decimal_places=2)
    pickUpDate = serializers.DateField(source='pick_up_date')
    pickUpTime = serializers.TimeField(source='pick_up_time')
    isAccepted = serializers.BooleanField(source='is_accepted')
    isCancelled = serializers.BooleanField(source='is_cancelled')
    createdAt = serializers.DateTimeField(source='created_at')
    updatedAt = serializers.DateTimeField(source='updated_at')

    class Meta:
        model = Order
        fields = ["id", "user", "kitchen", "orderItems", "totalPrice", "pickUpDate", "pickUpTime", "remark", "isAccepted", "isCancelled", "createdAt", "updatedAt"]
