# core/models.py
from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):
    TYPE_CHOICES = (
        ('product', 'Product'),
        ('resource', 'Resource'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='product')
    
    # Product fields
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=10, default='UGX', blank=True)
    stock = models.PositiveIntegerField(default=0, blank=True)
    
    # Media fields — added here
    image = models.ImageField(upload_to='items/images/', null=True, blank=True, help_text="Main photo for products")
    file = models.FileField(upload_to='items/files/', null=True, blank=True, help_text="PDF/report/flyer/poster file")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']  # Newest items first
        verbose_name = 'Item'
        verbose_name_plural = 'Items'

    def __str__(self):
        return f"{self.title} ({self.type})"