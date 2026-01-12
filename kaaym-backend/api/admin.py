# api/admin.py
from django.contrib import admin
from .models import User, Event, Announcement, Product

# Optional but recommended: customize how each model looks in admin
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'created_at')  # columns in list view
    search_fields = ('title', 'description')                     # search box
    list_filter = ('date',)                                      # filters on sidebar
    date_hierarchy = 'date'                                      # nice date navigation

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'event', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('event',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'event', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('category', 'event')

# Keep User registration (optional customization)
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_staff', 'is_active', 'is_superuser')
    search_fields = ('email',)