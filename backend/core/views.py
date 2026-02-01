# core/views.py
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Item
from .serializers import ItemSerializer


class LoginView(APIView):
    """ POST /api/login/ """
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"detail": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({
                "detail": "Login successful",
                "user": {"username": user.username, "email": user.email}
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    """ POST /api/logout/ """
    def post(self, request):
        logout(request)
        return Response({"detail": "Logged out successfully"}, status=status.HTTP_200_OK)


class ItemListCreateView(generics.ListCreateAPIView):
    """ GET /api/items/  |  POST /api/items/ """
    queryset = Item.objects.filter(is_active=True)
    serializer_class = ItemSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = None

    def perform_create(self, serializer):
        serializer.save(user=self.request.user if self.request.user.is_authenticated else None)


class CheckAuthView(APIView):
    """ GET /api/check-auth/ """
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response({
                "user": {"username": user.username, "email": user.email}
            })
        return Response({"user": None})
