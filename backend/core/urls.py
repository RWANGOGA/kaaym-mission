from django.urls import path
from .views import (
    GetCSRFTokenView,
    LoginView,
    LogoutView,
    ItemListCreateView,
    CheckAuthView,
    CheckAdminView,
)

urlpatterns = [
    path('csrf/',       GetCSRFTokenView.as_view(),  name='csrf'),  # NEW
    path('login/',      LoginView.as_view(),         name='login'),
    path('logout/',     LogoutView.as_view(),        name='logout'),
    path('items/',      ItemListCreateView.as_view(), name='item-list-create'),
    path('check-auth/', CheckAuthView.as_view(),      name='check-auth'),
    path('check-admin/', CheckAdminView.as_view(),    name='check-admin'),
]