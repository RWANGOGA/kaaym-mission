# core/views.py
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Item
from .serializers import ItemSerializer


class GetCSRFTokenView(APIView):
    """ GET /api/csrf/ - Get CSRF token """
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        # This will set the CSRF cookie
        csrf_token = get_token(request)
        return JsonResponse({'csrfToken': csrf_token})


class LoginView(APIView):
    """ POST /api/login/ """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        # Accept either 'email' or 'username' from frontend
        username = request.data.get("username") or request.data.get("email")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"detail": "Username/email and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)

        if user is not None:
            print(f"\n{'='*60}")
            print(f"✅ LoginView: User authenticated: {user.username}")
            print(f"  - is_staff: {user.is_staff}")
            print(f"  - Session key BEFORE login: {request.session.session_key}")
            
            login(request, user)
            
            print(f"  - Session key AFTER login: {request.session.session_key}")
            print(f"  - is_authenticated AFTER login: {request.user.is_authenticated}")
            print(f"  - request.user: {request.user}")
            print(f"  - Session in request.session: {dict(request.session)}")
            print(f"{'='*60}\n")
            
            response = Response({
                "detail": "Login successful",
                "user": {
                    "username": user.username,
                    "email": user.email or "",
                    "is_staff": user.is_staff,
                    "is_superuser": user.is_superuser
                }
            }, status=status.HTTP_200_OK)
            
            print(f"Response headers: {response.items()}")
            
            return response

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

    def create(self, request, *args, **kwargs):
        """
        Override create to add better logging and error handling
        """
        print("\n" + "="*60)
        print("ITEM CREATION REQUEST")
        print("="*60)
        print("Request data:", request.data)
        print("Request files:", request.FILES)
        print("User:", request.user)
        print("Is authenticated:", request.user.is_authenticated)
        print("="*60 + "\n")

        # Add user to the data if authenticated
        if request.user.is_authenticated:
            # Create a mutable copy of the data
            data = request.data.copy()
            data['user'] = request.user.id
            
            serializer = self.get_serializer(data=data)
        else:
            serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            
            print("✅ Item created successfully:", serializer.data)
            
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        except Exception as e:
            print("❌ Error creating item:", str(e))
            print("Validation errors:", getattr(serializer, 'errors', None))
            raise

    def perform_create(self, serializer):
        """
        Save the item with the current user if authenticated
        """
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()


class CheckAuthView(APIView):
    """ GET /api/check-auth/ """
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        # Ensure CSRF token is set
        get_token(request)
        
        print(f"\n{'='*60}")
        print(f"🔍 CheckAuth Request:")
        print(f"  - User: {request.user}")
        print(f"  - Is Authenticated: {request.user.is_authenticated}")
        print(f"  - Session Key: {request.session.session_key}")
        print(f"  - Cookies keys: {list(request.COOKIES.keys())}")
        if 'sessionid' in request.COOKIES:
            print(f"  - Session cookie found: {request.COOKIES['sessionid'][:20]}...")
        print(f"{'='*60}\n")
        
        if request.user.is_authenticated:
            print(f"  ✅ User authenticated as: {request.user.username}")
            return Response({
                "authenticated": True,
                "user": {
                    "username": request.user.username,
                    "email": request.user.email or "",
                    "is_staff": request.user.is_staff,
                    "is_superuser": request.user.is_superuser
                }
            }, status=status.HTTP_200_OK)

        print(f"  ❌ User not authenticated")
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