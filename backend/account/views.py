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

    username = data.get('username')
    password = data.get('password')

    print(f"Attempting login for user: {username}")

    # Authenticate user
    account = authenticate(username=username, password=password)
    # username=data['username']
    # password=data['password']
    # print(username)
    # print(password)
    # account = authenticate(request._request, username=username, password=password)

    if account:
        refresh = RefreshToken.for_user(account)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token), # https://www.youtube.com/watch?v=ZyC1lV2a77s&list=PLJlAVd0VeOMSF5z64X0nMZZwC88Q8pLBi&index=13
        }, status=status.HTTP_200_OK) # https://www.youtube.com/watch?v=ynIFkeZpXBw&list=PL2z1gXAKH9c3dglbz0tvLqJTJPVPgjW1x&index=5
        # login(request._request, account) https://www.youtube.com/watch?v=xjMP0hspNLE&list=PL-51WBLyFTg1gPEHotYAhNAPsisChkyTc
        # return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# email = request.data.get('email')
#     password = request.data.get('password')
    
#     # Authenticate using the email and password
#     user = authenticate(request._request, email=email, password=password)
    
#     if user is not None:
#         # Generate token or respond with success
#         return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
#     else:
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny]) 
@permission_classes([IsAuthenticated])
def logout(request):
    logout(request)
    return Response({"message": "Logout successful"})
