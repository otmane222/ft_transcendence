from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password


import logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny]) 
def signup(request):
    try:
        data = request.data
        logger.debug(f"Received data: {data}")  # Log the received data

        # Existing user creation logic
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])  # hash password
        )
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny]) 
def login(request):
    try:
        data = request.data
        user = User.objects.get(username=data['username'])
        if user.check_password(data['password']):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([AllowAny]) 
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        # Extract the refresh token from the request data
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        
        # Blacklist the refresh token
        token.blacklist()

        return Response({"message": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
