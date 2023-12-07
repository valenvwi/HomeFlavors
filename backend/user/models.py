from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    ROLE_CHOICES = (
        ('owner', 'Owner'),
        ('user', 'User'),
    )

    email = models.EmailField(unique=True, blank=False, null=False)
    first_name = models.CharField(max_length=20, blank=False, null=False)
    last_name = models.CharField(max_length=20, blank=False, null=False)
    role = models.CharField(max_length=5, choices=ROLE_CHOICES, default='user')
    phone_number = models.CharField(max_length=20, blank=False, null=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
