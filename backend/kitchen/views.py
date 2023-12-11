from rest_framework import status, viewsets
from .models import Kitchen
from .serializers import KitchenSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class KitchenView(viewsets.ModelViewSet):
    queryset = Kitchen.objects.all()
    serializer_class = KitchenSerializer

    def update(self, request, *args, **kwargs):
        user = request.user
        print("user: ", user)

        instance = self.get_object()
        if instance.owner.id != user.id:
            return Response({'error': 'You are not authorized to update this kitchen.'}, status=status.HTTP_401_UNAUTHORIZED)
        return super().update(request, *args, **kwargs)
