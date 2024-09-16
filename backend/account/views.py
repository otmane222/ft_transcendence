from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Account
from .serializers import AccountSerializer

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def account_view(request):
    try:
        account = request.user.account
        if request.method == 'GET':
            serializer = AccountSerializer(account)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = AccountSerializer(account, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
    except Account.DoesNotExist:
        return Response({"error": "Account not found"}, status=404)
