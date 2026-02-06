from django.urls import path
from .views import (
    LoginView,
    LogoutView,
    ItemListCreateView,
    CheckAuthView,
    CheckAdminView,
    get_csrf,
    signup,
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('items/', ItemListCreateView.as_view(), name='item-list-create'),
    path('check-auth/', CheckAuthView.as_view(), name='check-auth'),
    path('check-admin/', CheckAdminView.as_view(), name='check-admin'),
    path('csrf/', get_csrf, name='get-csrf'),
    path('signup/', signup, name='signup'),
]