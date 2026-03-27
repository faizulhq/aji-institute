from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.conf import settings
from apps.programs.models import Program
from .models import Cart, CartItem, Order, OrderItem
import midtransclient
from .serializers import CartSerializer, OrderSerializer


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def _get_or_create_cart(self, user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    def get(self, request):
        cart = self._get_or_create_cart(request.user)
        return Response(CartSerializer(cart).data)

    def post(self, request):
        """Add item to cart."""
        program_id = request.data.get('program_id')
        if not program_id:
            return Response({'error': 'program_id wajib diisi.'}, status=400)
        try:
            program = Program.objects.get(id=program_id)
        except Program.DoesNotExist:
            return Response({'error': 'Program tidak ditemukan.'}, status=404)

        cart = self._get_or_create_cart(request.user)

        _, created = CartItem.objects.get_or_create(cart=cart, program=program)
        if not created:
            return Response({'message': 'Program sudah ada di keranjang.'}, status=200)

        return Response(CartSerializer(cart).data, status=201)

    def delete(self, request, item_id=None):
        """Remove item from cart."""
        cart = self._get_or_create_cart(request.user)
        try:
            item = CartItem.objects.get(id=item_id, cart=cart)
            item.delete()
        except CartItem.DoesNotExist:
            return Response({'error': 'Item tidak ditemukan.'}, status=404)
        cart.refresh_from_db()
        return Response(CartSerializer(cart).data)


class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        items = cart.items.select_related('program').all()

        if not items.exists():
            return Response({'error': 'Keranjang kosong.'}, status=400)

        total = cart.total
        notes = request.data.get('notes', '')

        # Create order
        order = Order.objects.create(
            user=request.user,
            total_price=total,
            notes=notes,
        )

        # Create order items
        for cart_item in items:
            OrderItem.objects.create(
                order=order,
                program=cart_item.program,
                program_title=cart_item.program.title,
                price_at_purchase=cart_item.program.price,
            )

        # Clear cart
        cart.items.all().delete()

        # Midtrans Snap Token Generation
        snap = midtransclient.Snap(
            is_production=settings.MIDTRANS_IS_PRODUCTION,
            server_key=settings.MIDTRANS_SERVER_KEY,
            client_key=settings.MIDTRANS_CLIENT_KEY
        )

        param = {
            "transaction_details": {
                "order_id": f"AJISTAT-ORDER-{order.id}",
                "gross_amount": int(total)
            },
            "customer_details": {
                "first_name": request.user.name,
                "email": request.user.email,
                "phone": getattr(request.user, 'phone', '08123456789')
            }
        }
        
        try:
            transaction = snap.create_transaction(param)
            snap_token = transaction['token']
        except Exception as e:
            return Response({'error': f'Midtrans Error: {str(e)}'}, status=500)

        return Response({
            'order': OrderSerializer(order).data,
            'snap_token': snap_token
        }, status=201)


class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).prefetch_related('items')
        return Response(OrderSerializer(orders, many=True).data)
