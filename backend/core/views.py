# core/views.py
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes

from .models import Item
from .serializers import ItemSerializer


# =============================================
#  CSRF Token Endpoint (needed for frontend POSTs)
# =============================================
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_csrf(request):
    """ GET /api/csrf/ - Returns current CSRF token """
    csrf_token = get_token(request)
    return Response({'csrfToken': csrf_token})


# =============================================
#  Signup Endpoint (creates regular user)
# =============================================
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def signup(request):
    """ POST /api/signup/ - Create new user """
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not all([username, email, password]):
        return Response(
            {"detail": "Username, email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"detail": "Username already taken"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"detail": "Email already registered"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        user.is_active = True
        user.save()

        return Response(
            {
                "detail": "Account created successfully",
                "user": {
                    "username": user.username,
                    "email": user.email
                }
            },
            status=status.HTTP_201_CREATED
        )
    except Exception as e:
        return Response(
            {"detail": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


# =============================================
#  Login (CSRF exempt)
# =============================================
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

        if user is not None:
            login(request, user)
            return Response({
                "detail": "Login successful",
                "authenticated": True,
                "user": {
                    "username": user.username,
                    "email": user.email or "",
                    "is_staff": user.is_staff,
                    "is_superuser": user.is_superuser
                }
            }, status=status.HTTP_200_OK)

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