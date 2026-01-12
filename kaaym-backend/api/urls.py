# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, AnnouncementViewSet, ProductViewSet

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'announcements', AnnouncementViewSet)
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]