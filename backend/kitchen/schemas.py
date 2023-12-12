from drf_spectacular.utils import OpenApiParameter, extend_schema
from drf_spectacular.types import OpenApiTypes

from .serializers import MenuItemSerializer


list_menu_items = extend_schema(
    parameters=[
        OpenApiParameter(
            name='kitchen',
            description='ID of the kitchen whose menu items are to be retrieved',
            location=OpenApiParameter.QUERY,
            type=OpenApiTypes.INT
        ),
        OpenApiParameter(
            name='category',
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description='Category of the menu items to be retrieved'
        ),
    ]
)
