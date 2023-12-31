from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from .serializers import OrderSerializer, SalesDataSerializer

order_list_docs = extend_schema(
    responses=OrderSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name='user_pending_orders',
            description='Get all pending orders from the user',
            location=OpenApiParameter.QUERY,
            type=OpenApiTypes.BOOL,
        ),
        OpenApiParameter(
            name='kitchen_pending_orders',
            description='Get all pending orders from the kitchen',
            location=OpenApiParameter.QUERY,
            type=OpenApiTypes.BOOL,
        ),
        OpenApiParameter(
            name='user_cancel_orders',
            description='Get all cancel orders from the user',
            location=OpenApiParameter.QUERY,
            type=OpenApiTypes.BOOL,
        ),
        OpenApiParameter(
            name='kitchen_cancel_orders',
            description='Get all cancel orders from the kitchen',
            location=OpenApiParameter.QUERY,
            type=OpenApiTypes.BOOL,
        ),
    ],
)

sales_data_docs = extend_schema(
    responses=SalesDataSerializer(many=True),
    parameters=[
                OpenApiParameter(
            name='start_date',
            description='Get total revenue from the kitchen',
            location=OpenApiParameter.QUERY,
            type=OpenApiTypes.STR,
        ),
        OpenApiParameter(
            name='end_date',
            description='Get total revenue from the kitchen',
            location=OpenApiParameter.QUERY,
            type=OpenApiTypes.STR,
        ),
    ],
)
