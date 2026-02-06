# core/views.py
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.middleware.csrf import get_token

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Item
from .serializers import ItemSerializer


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    """ POST /api/login/ """
    def post(self, request):
        username = request.data.get("username") or request.data.get("email")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"detail": "Username/email and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)

        print("\n" + "="*60)
        print("LOGIN ATTEMPT:")
        print(f"  Username/Email: {username}")
        print(f"  Authenticated: {user is not None}")
        print(f"  Before login - session key: {request.session.session_key}")
        print("="*60)

        if user is not None:
            login(request, user)
            
            print("LOGIN SUCCESS:")
            print(f"  After login - session key: {request.session.session_key}")
            print(f"  User now authenticated: {request.user.is_authenticated}")
            print(f"  Current user: {request.user}")
            print("="*60 + "\n")

            return Response({
                "detail": "Login successful",
                "authenticated": True,
                "user": {
                    "username": user.username,
                    "email": user.email or ""
                }
            }, status=status.HTTP_200_OK)

        print("LOGIN FAILED: Invalid credentials")
        print("="*60 + "\n")

        return Response(
            {"detail": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )


class LogoutView(APIView):
    """ POST /api/logout/ """
    def post(self, request):
        logout(request)
        return Response(
            {"detail": "Logged out successfully"},
            status=status.HTTP_200_OK
        )


class ItemListCreateView(generics.ListCreateAPIView):
    """ GET /api/items/   POST /api/items/ """
    queryset = Item.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = ItemSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = None

    def perform_create(self, serializer):
        serializer.save(user=self.request.user if self.request.user.is_authenticated else None)


class CheckAuthView(APIView):
    """ GET /api/check-auth/ """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        # Ensure CSRF cookie is set
        get_token(request)

        if request.user.is_authenticated:
            return Response({
                "authenticated": True,
                "user": {
                    "username": request.user.username,
                    "email": request.user.email or "",
                    "is_staff": request.user.is_staff,
                    "is_superuser": request.user.is_superuser
                }
            }, status=status.HTTP_200_OK)

        return Response({
            "authenticated": False,
            "user": None
        }, status=status.HTTP_200_OK)


class CheckAdminView(APIView):
    """ GET /api/check-admin/ """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            is_admin = request.user.is_staff or request.user.is_superuser
            return Response(
                {"is_admin": is_admin},
                status=status.HTTP_200_OK
            )

        return Response(
            {"is_admin": False},
            status=status.HTTP_200_OK
        )


class GetCSRFTokenView(APIView):
    """ GET /api/csrf/ - Get CSRF token """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        csrf_token = get_token(request)
        return Response({'csrfToken': csrf_token})