from django.urls import path
from .views import LoginView, LogoutView, ItemListCreateView, CheckAuthView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('items/', ItemListCreateView.as_view(), name='item-list-create'),
    path('check-auth/', CheckAuthView.as_view(), name='check-auth'),  # ✅ new endpoint
]
