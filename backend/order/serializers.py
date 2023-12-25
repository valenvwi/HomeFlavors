from rest_framework import serializers
from .models import Order, OrderItem
from kitchen.serializers import MenuItemSerializer
from kitchen.models import MenuItem

class OrderItemSerializer(serializers.ModelSerializer):
    menuItem = MenuItemSerializer(read_only=True, source='menu_item')
    menu_item = serializers.PrimaryKeyRelatedField(
        queryset=MenuItem.objects.all(),
        write_only=True
    )
    class Meta:
        model = OrderItem
        fields = ["id", "menu_item", "menuItem", "quantity"]



class OrderSerializer(serializers.ModelSerializer):
    orderItems = OrderItemSerializer(many=True, read_only=True, source='order_items')
    totalPrice = serializers.DecimalField(source='total_price', max_digits=10, decimal_places=2)
    pickUpDate = serializers.DateField(source='pick_up_date')
    pickUpTime = serializers.TimeField(source='pick_up_time')
    isAccepted = serializers.BooleanField(source='is_accepted', required=False)
    isCancelled = serializers.BooleanField(source='is_cancelled', required=False)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    updatedAt = serializers.DateTimeField(source='updated_at', read_only=True)

    class Meta:
        model = Order
        fields = ["id", "user", "kitchen", "orderItems", "totalPrice", "pickUpDate", "pickUpTime", "remark", "isAccepted", "isCancelled", "createdAt", "updatedAt"]
        read_only_fields = ["user", "createdAt", "updatedAt"]
