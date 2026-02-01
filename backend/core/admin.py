# core/admin.py
from django.contrib import admin
from .models import Item

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'price', 'stock', 'is_active', 'created_at')
    list_filter = ('type', 'is_active')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'type', 'is_active')
        }),
        ('Product Details (only for products)', {
            'fields': ('price', 'currency', 'stock'),
            'classes': ('collapse',)  # optional: collapsible section
        }),
        ('Media Uploads', {
            'fields': ('image', 'file'),
            'description': 'Upload product photo or resource file (PDF, image, etc.)'
        }),
    )