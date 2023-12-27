from django.db import models

class OrderItem(models.Model):
    menu_item = models.ForeignKey('kitchen.MenuItem', on_delete=models.PROTECT, related_name='order_items')
    quantity = models.IntegerField(default=1)
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='order_items', null=True)

    def __str__(self):
        return f'{self.quantity} x {self.menu_item.name}'

class Order(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.PROTECT, related_name='orders')
    kitchen = models.ForeignKey('kitchen.Kitchen', on_delete=models.PROTECT, related_name='orders')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    name = models.CharField(max_length=100, blank=True, null=True)
    contact_number = models.CharField(max_length=20, blank=True, null=True)
    pick_up_date = models.DateField()
    pick_up_time = models.TimeField()
    remark = models.CharField(max_length=1000, blank=True, null=True)
    is_accepted = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.username}\'s order. Pick up on {self.pick_up_date} at {self.pick_up_time}'
