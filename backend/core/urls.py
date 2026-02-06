from django.urls import path
from .views import (
    login_view,
    logout_view,
    ItemListCreateView,
    CheckAuthView,
    CheckAdminView,
    get_csrf,
    signup,
)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('items/', ItemListCreateView.as_view(), name='item-list-create'),
    path('check-auth/', CheckAuthView.as_view(), name='check-auth'),
    path('check-admin/', CheckAdminView.as_view(), name='check-admin'),
    path('csrf/', get_csrf, name='get-csrf'),
    path('signup/', signup, name='signup'),
]