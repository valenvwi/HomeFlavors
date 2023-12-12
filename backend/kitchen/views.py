from rest_framework import status, viewsets
from .models import Kitchen, MenuItem
from .serializers import KitchenSerializer, MenuItemSerializer
from rest_framework.response import Response
from .schemas import list_menu_items

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

class MenuItemView(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

    @list_menu_items
    def list(self, request):
        kitchen_id = request.query_params.get('kitchen', None)
        category = request.query_params.get('category', None)

        if kitchen_id is not None:
            queryset = MenuItem.objects.filter(kitchen=kitchen_id)
        elif category is not None:
            queryset = MenuItem.objects.filter(category=category)
        else:
            queryset = MenuItem.objects.all()

        serializer = MenuItemSerializer(queryset, many=True)
        return Response(serializer.data)
