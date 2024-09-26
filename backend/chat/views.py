from rest_framework.views import APIView
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Chat, Message
from .serializers import MessageSerializer, ChatSerializer
from account.models import Account

@permission_classes([AllowAny]) 
class ChatView(APIView):
    def post(self, request):
        current_user = request.user
        friend_id = request.data.get('participants')

        try:
            friend = Account.objects.get(id=friend_id)
        except Account.DoesNotExist:
            return Response({"erroro": "User not found"}, status=404)

        chat = Chat.objects.filter(participants=current_user).filter(participants=friend).first()

        if not chat:
            chat = Chat.objects.create()
            chat.participants.add(current_user, friend)

        serializer = ChatSerializer(chat)
        return Response(serializer.data)

@permission_classes([AllowAny]) 
class ChatMessagesView(APIView):
    def get(self, request, chat_id):
        try:
            chat = Chat.objects.get(id=chat_id)
        except Chat.DoesNotExist:
            return Response({"error": "Chat not found"}, status=404)

        messages = chat.messages.all().order_by('timestamp')  # Get all messages in the chat
        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data)

@permission_classes([AllowAny]) 
class ChatListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        chats = Chat.objects.filter(participants=user)  # Get chats involving the current user
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)