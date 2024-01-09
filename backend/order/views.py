from rest_framework import viewsets
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer, SalesDataSerializer
from rest_framework.response import Response
from django.core.mail import EmailMessage
from .schema import order_list_docs, sales_data_docs
from datetime import datetime
from django.db.models import Sum, Count
from django.db.models import Sum, F, ExpressionWrapper, DecimalField
from rest_framework.views import APIView
from collections import OrderedDict
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class OrderItemView(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class OrderView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @order_list_docs
    def list(self, request):
        user_pending_orders = request.query_params.get('user_pending_orders')
        kitchen_pending_orders = request.query_params.get('kitchen_pending_orders')
        user_cancel_orders = request.query_params.get('user_cancel_orders')
        kitchen_cancel_orders = request.query_params.get('kitchen_cancel_orders')

        if user_pending_orders == 'true':
            queryset = Order.objects.filter(user=request.user, is_accepted=False, is_cancelled=False).order_by('-created_at')
            serializer = OrderSerializer(queryset, many=True)
            return Response(serializer.data)
        elif user_pending_orders == 'false':
            queryset = Order.objects.filter(user=request.user, is_accepted=True, is_cancelled=False).order_by('-created_at')
            serializer = OrderSerializer(queryset, many=True)
            return Response(serializer.data)

        if kitchen_pending_orders == 'true':
            if request.user.role != 'owner':
                return Response({'error': 'You are not authorized to update this kitchen.'}, status=status.HTTP_401_UNAUTHORIZED)
            queryset = Order.objects.filter(is_accepted=False, is_cancelled=False).order_by('pick_up_date', 'pick_up_time')
            serializer = OrderSerializer(queryset, many=True)
            return Response(serializer.data)
        elif kitchen_pending_orders == 'false':
            if request.user.role != 'owner':
                return Response({'error': 'You are not authorized to update this kitchen.'}, status=status.HTTP_401_UNAUTHORIZED)
            today = datetime.today().date().strftime('%Y-%m-%d')
            now = datetime.now().time()

            queryset_today = Order.objects.filter(
            is_accepted=True,
            is_cancelled=False,
            pick_up_date=today,
            pick_up_time__gte=now)

            queryset_future = Order.objects.filter(
            is_accepted=True,
            is_cancelled=False,
            pick_up_date__gt = today,
            )

            queryset = queryset_future | queryset_today

            queryset = queryset.order_by('pick_up_date', 'pick_up_time')

            serializer = OrderSerializer(queryset, many=True)
            return Response(serializer.data)

        if user_cancel_orders == 'true':
            queryset = Order.objects.filter(user=request.user, is_cancelled=True).order_by('-created_at')
            serializer = OrderSerializer(queryset, many=True)
            return Response(serializer.data)

        if kitchen_cancel_orders == 'true':
            queryset = Order.objects.filter(is_cancelled=True).order_by('-created_at')
            serializer = OrderSerializer(queryset, many=True)
            return Response(serializer.data)

        queryset = Order.objects.filter(user=request.user).order_by('-created_at')
        # Below line is saved for testing purpose
        # queryset = Order.objects.all().order_by('-created_at')
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

        message_body = f"Hi {self.request.user.username} ,\n\n" \
                        f"Your order has been placed!\n\n" \
                        f"Order details:\n" \
                        f"Name: {serializer.data['name']} \n" \
                        f"Contact number: {serializer.data['contactNumber']}\n" \
                        f"Pick up date: {serializer.data['pickUpDate']}\n" \
                        f"Pick up time: {serializer.data['pickUpTime']}\n" \
                        f"Remark: {serializer.data['remark']}\n\n" \
                        f"Total price: CHF {serializer.data['totalPrice']}\n\n" \
                        f"Thank you for your order! We hope you will enjoy your meal. If you're satisfied with our food, please come back more often. Your continued patronage allows us to keep improving and serving our guests even better. We look forward to welcoming you back soon! \n\n" \
                        f"Best regards,\n" \
                        f"Amy's Kitchen"
        email_message = EmailMessage("Your order has been placed!",
        message_body,
        to=[self.request.user.email],
        )
        email_message.send()


class SalesDataView(APIView):

    @sales_data_docs
    def get(self, request):

        if request.user.role != 'owner':
            return Response({'error': 'You are not authorized to update this kitchen.'}, status=status.HTTP_401_UNAUTHORIZED)

        start_date_str = request.query_params.get('start_date')
        end_date_str = request.query_params.get('end_date')

        if start_date_str and end_date_str:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d')

            # Sales by item in the period
            menu_items_totals = OrderItem.objects.filter(
                order__pick_up_date__range=(start_date, end_date),
                order__is_accepted=True,
                order__is_cancelled=False
            ).values(
                'menu_item__id',  # Include the menuItem id
                'menu_item__image',  # Include the menuItem image
                'menu_item__name'
            ).annotate(
                total_quantity=Sum('quantity'),
                total_revenue=ExpressionWrapper(
                    F('quantity') * F('menu_item__price'),
                    output_field=DecimalField(max_digits=10, decimal_places=2)
                )
            )

            menu_items_summary = []
            for item_total in menu_items_totals:
                menu_items_summary.append({
                    'id': item_total['menu_item__id'],
                    'image': f"/media/{item_total['menu_item__image']}",
                    'name': item_total['menu_item__name'],
                    'revenue': item_total['total_revenue'] or 0.0,
                    'quantity': item_total['total_quantity'] or 0
                })

            items_sales_summary = sorted(menu_items_summary, key=lambda k: k['quantity'], reverse=True)

            # Total sales within the start date and end date in the period
            sales_by_period = Order.objects.filter(
                pick_up_date__range=(start_date, end_date),
                is_accepted=True,
                is_cancelled=False
            ).aggregate(
                total_revenue=Sum('total_price'),
                total_quantity=Sum('total_quantity'),
                total_orders=Count('id')
            )

            # Sales by hour in the period
            sales_by_hour_summary = []

            # from 12:00-19:59
            for i in range(12, 20):
                sales_by_hour = Order.objects.filter(
                    pick_up_date__range=(start_date, end_date),
                    pick_up_time__hour=i,
                    is_accepted=True,
                    is_cancelled=False
                ).aggregate(
                    total_revenue=Sum('total_price'),
                    total_quantity=Sum('total_quantity'),
                    total_orders=Count('id')
                )

                sales_by_hour_summary.append({
                    'time': f'{i}:00',
                    'revenue_by_hour': sales_by_hour['total_revenue'] or 0.0,
                    'quantity_by_hour': sales_by_hour['total_quantity'] or 0,
                    'orders_by_hour': sales_by_hour['total_orders'] or 0
                })

            # Cancelled order in the period
            cancelled_orders = Order.objects.filter(
                pick_up_date__range=(start_date, end_date),
                is_cancelled=True
            ).count()

            accepted_orders = Order.objects.filter(
                pick_up_date__range=(start_date, end_date),
                is_accepted=True,
                is_cancelled=False
            ).count()

            if cancelled_orders != 0 or accepted_orders != 0:
                cancel_percentage = round(cancelled_orders / (cancelled_orders + accepted_orders) * 100, 2)
            else:
                cancel_percentage = 0.0

            order_status = []
            order_status = {
                'cancelled_orders': cancelled_orders,
                'accepted_orders': accepted_orders,
                'cancel_percentage': cancel_percentage
            }

            # Combine all sales data in a single response
            summary = OrderedDict([
                ('sales_by_period', sales_by_period),
                ('items_sales_summary', items_sales_summary),
                ('sales_by_hour_summary', sales_by_hour_summary),
                ('order_status', order_status)
            ])
            serialized_sales_data = SalesDataSerializer(summary)

            return Response(serialized_sales_data.data)

        empty_summary = OrderedDict([
            ('sales_by_period', {}),
            ('items_sales_summary', []),
            ('sales_by_hour_summary', []),
            ('order_status', {})
        ])

        print("empty_summary", empty_summary)
        serialized_empty_summary = SalesDataSerializer(empty_summary)

        return Response(serialized_empty_summary)
