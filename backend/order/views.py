from rest_framework import viewsets
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework.response import Response
from django.core.mail import EmailMessage
from .schema import order_list_docs

class OrderItemView(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class OrderView(viewsets.ModelViewSet):
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
            queryset = Order.objects.filter(is_accepted=False, is_cancelled=False).order_by('-created_at')
            serializer = OrderSerializer(queryset, many=True)
            return Response(serializer.data)
        elif kitchen_pending_orders == 'false':
            queryset = Order.objects.filter(is_accepted=True, is_cancelled=False).order_by('-created_at')
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
