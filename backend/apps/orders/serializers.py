from rest_framework import serializers
from apps.programs.serializers import ProgramListSerializer
from .models import Cart, CartItem, Order, OrderItem


class CartItemSerializer(serializers.ModelSerializer):
    program = ProgramListSerializer(read_only=True)
    program_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CartItem
        fields = ('id', 'program', 'program_id', 'added_at')

    def validate_program_id(self, value):
        from apps.programs.models import Program
        if not Program.objects.filter(id=value).exists():
            raise serializers.ValidationError('Program tidak ditemukan.')
        return value


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.DecimalField(max_digits=12, decimal_places=0, read_only=True)
    item_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cart
        fields = ('id', 'items', 'total', 'item_count')


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('id', 'program_title', 'price_at_purchase')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'total_price', 'status', 'created_at', 'notes', 'items')
        read_only_fields = ('id', 'total_price', 'status', 'created_at', 'items')
