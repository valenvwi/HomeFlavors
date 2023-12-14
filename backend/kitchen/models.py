from django.db import models

class Kitchen(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    address = models.CharField(max_length=100, blank=False, null=False)
    contact_number = models.CharField(max_length=20, blank=False, null=False)
    cuisine = models.CharField(max_length=50, blank=False, null=False)
    description = models.CharField(max_length=1000)
    logo = models.ImageField(upload_to='kitchen/images', default='')
    banner = models.ImageField(upload_to='kitchen/images', default='')
    opening_hours = models.CharField(max_length=50, blank=False, null=False)
    order_accept_time = models.CharField(max_length=50, blank=False, null=False)
    owner = models.ForeignKey('user.User', on_delete=models.PROTECT, related_name='kitchen_owner')

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    CATEGORY_CHOICES = (
        ('soup', 'Soup'),
        ('meat', 'Meat'),
        ('seafood', 'Seafood'),
        ('vegetables', 'Vegetables'),
        ('pasta', 'Pasta'),
    )

    name = models.CharField(max_length=50, blank=False, null=False)
    description = models.CharField(max_length=1000)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='kitchen/images', default='')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    is_available = models.BooleanField(default=True)
    is_veg = models.BooleanField(default=False)
    is_spicy = models.BooleanField(default=False)
    kitchen = models.ForeignKey(Kitchen, on_delete=models.CASCADE, related_name='menu_items')

    def __str__(self):
        return self.name
