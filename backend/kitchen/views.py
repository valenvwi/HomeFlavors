from rest_framework import viewsets
from .models import Kitchen
from .serializers import KitchenSerializer

# Create your views here.
class KitchenView(viewsets.ModelViewSet):
    queryset = Kitchen.objects.all()
    serializer_class = KitchenSerializer
