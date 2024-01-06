from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from .models import User
import jwt
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
        token['user_id'] = user.id
        token['username'] = user.username
        token['is_owner'] = user.role == 'owner'
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["userId"] = self.user.id
        data['username'] = self.user.username
        data["isOwner"] = self.user.role == "owner"
        return data


class JWTCookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES.get(settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"])

        if attrs["refresh"]:
            data = super().validate(attrs)
            try:
                decoded_data = jwt.decode(attrs["refresh"], settings.SECRET_KEY, algorithms=["HS256"])
                user_id = decoded_data.get('user_id')
                username = decoded_data.get('username')
                is_owner = decoded_data.get('is_owner')

                data["userId"] = user_id
                data['username'] = username
                data["isOwner"] = is_owner
                return data
            except jwt.ExpiredSignatureError:
                raise InvalidToken("Refresh token expired")
            except jwt.InvalidTokenError:
                raise InvalidToken("Invalid refresh token")
        else:
            raise InvalidToken("No valid refresh token found")
