from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status

from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate, login, logout

from .models import Account


import logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny]) 
def signup(request):
    data = request.data
    try:
        account = Account.objects.create_user(email=data['email'], password=data['password'], username=data['username'])
        return Response({"message": "Account created successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny]) 
def login(request):
    data = request.data
    account = authenticate(email=data['email'], password=data['password'])

    if account:
        login(request, account)
        return Response({"message": "Login successful"})
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny]) 
@permission_classes([IsAuthenticated])
def logout(request):
    logout(request)
    return Response({"message": "Logout successful"})
