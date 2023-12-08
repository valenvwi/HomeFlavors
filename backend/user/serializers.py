from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer

from .models import User

class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')
    phoneNumber = serializers.CharField(source='phone_number')
    class Meta:
        model = User
        fields = ("id", "username", "email", "firstName", "lastName", "role", "phoneNumber")


class RegisterSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')
    phoneNumber = serializers.CharField(source='phone_number')
    class Meta:
        model = User
        fields = ("username", "password", "email", "firstName", "lastName", "role", "phoneNumber")

    def is_valid(self, raise_exception=False):
        valid = super().is_valid(raise_exception=raise_exception)

        if valid:
            username = self.validated_data["username"]
            email = self.validated_data["email"]
            if User.objects.filter(username=username).exists():
                self._errors["username"] = ["Username already exists"]
                valid = False
            if User.objects.filter(email=email).exists():
                self._errors["email"] = ["Email already exists"]
                valid = False

        return valid

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user




class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user_id"] = self.user.id
        return data


class JWTCookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES.get(settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"])

        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid refresh token found")
