from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate

class EmailAuthentication(BaseAuthentication):
    def authenticate(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request._request, email=email, password=password)
        if user is not None:
            return (user, None)  # Return a tuple (user, None)
        raise AuthenticationFailed('Invalid credentials')