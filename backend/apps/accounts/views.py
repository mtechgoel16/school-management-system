from rest_framework import generics, status, views, serializers
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class CustomTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.role
        token['school_id'] = str(user.school.id) if user.school else None
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'mobile', 'role']

class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer

class CurrentUserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self): return self.request.user

class ParentOTPRequestView(views.APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        mobile = request.data.get('mobile')
        if User.objects.filter(mobile=mobile, role=User.Role.PARENT).exists():
            return Response({"detail": "OTP sent: 123456"})
        return Response({"detail": "Not found"}, status=404)

class ParentOTPVerifyView(views.APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        if request.data.get('otp') == "123456":
            user = User.objects.filter(mobile=request.data.get('mobile')).first()
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({'access': str(refresh.access_token), 'refresh': str(refresh)})
        return Response({"detail": "Invalid OTP"}, status=400)
