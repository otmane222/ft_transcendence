# urls.py
from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # You can clear the refresh token here if you are using a blacklist
        # For now, just return a response
        return Response({"message": "Logged out successfully"}, status=200)

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', views.AccountDetailView.as_view(), name='account-detail'),
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('user/<str:username>/', views.GetUserByUsername.as_view(), name='get_user_by_username'),
]

# path('login/', views.login, name='login'),
# path('logout/', views.logout, name='logout'),