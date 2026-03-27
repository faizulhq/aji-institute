from django.db import models
from django.conf import settings
from apps.programs.models import Program


class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart of {self.user.name}"

    @property
    def total(self):
        return sum(item.program.price for item in self.items.all())

    @property
    def item_count(self):
        return self.items.count()


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('cart', 'program')  # prevent duplicates

    def __str__(self):
        return f"{self.program.title} in {self.cart}"


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Menunggu Pembayaran'),
        ('paid', 'Sudah Dibayar'),
        ('cancelled', 'Dibatalkan'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    total_price = models.DecimalField(max_digits=12, decimal_places=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order #{self.id} by {self.user.name} — {self.status}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    program = models.ForeignKey(Program, on_delete=models.SET_NULL, null=True)
    program_title = models.CharField(max_length=255)  # snapshot in case program deleted
    price_at_purchase = models.DecimalField(max_digits=12, decimal_places=0)

    def save(self, *args, **kwargs):
        if self.program and not self.program_title:
            self.program_title = self.program.title
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.program_title} in Order #{self.order.id}"
