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
        fields = ["id", "menu_item", "menuItem", "quantity", "order"]



class OrderSerializer(serializers.ModelSerializer):
    orderItems = OrderItemSerializer(many=True, read_only=True, source='order_items')
    totalPrice = serializers.DecimalField(source='total_price', max_digits=10, decimal_places=2)
    totalQuantity = serializers.IntegerField(source='total_quantity', required=False)
    pickUpDate = serializers.DateField(source='pick_up_date')
    pickUpTime = serializers.TimeField(source='pick_up_time')
    contactNumber = serializers.CharField(source='contact_number')
    isAccepted = serializers.BooleanField(source='is_accepted', required=False)
    isCancelled = serializers.BooleanField(source='is_cancelled', required=False)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    updatedAt = serializers.DateTimeField(source='updated_at', read_only=True)

    class Meta:
        model = Order
        fields = ["id", "user", "kitchen", "orderItems", "name", "contactNumber", "totalPrice", "totalQuantity","pickUpDate", "pickUpTime", "remark", "isAccepted", "isCancelled", "createdAt", "updatedAt"]
        read_only_fields = ["user", "createdAt", "updatedAt"]


class SalesByPeriodSerializer(serializers.Serializer):
    revenue = serializers.DecimalField(max_digits=10, decimal_places=2, source="total_revenue")
    quantity = serializers.IntegerField(source="total_quantity")
    orders = serializers.IntegerField(source="total_orders")

class SalesByHourSerializer(serializers.Serializer):
    time = serializers.CharField()
    revenue = serializers.DecimalField(max_digits=10, decimal_places=2, source="revenue_by_hour")
    quantity= serializers.IntegerField(source="quantity_by_hour")
    ordersCount = serializers.IntegerField(source="orders_by_hour")

class SalesDataSerializer(serializers.Serializer):
    saleByPeriod = SalesByPeriodSerializer(source="sales_by_period")
    itemsSalesSummary = serializers.ListField(child=serializers.DictField(), required=False, source="items_sales_summary")
    salesByHour = SalesByHourSerializer(many=True, source="sales_by_hour_summary")
