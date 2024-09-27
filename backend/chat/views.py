from rest_framework.views import APIView
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Chat, Message
from .serializers import MessageSerializer, ChatSerializer
from account.models import Account

# @permission_classes([AllowAny]) 
class ChatView(APIView):
    def post(self, request):
        current_user = request.user
        friend_id = request.data.get('participants')

        # Ensure the friend exists
        try:
            friend = Account.objects.get(username=friend_id)
        except Account.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        # Prevent the user from chatting with themselves
        if current_user == friend:
            return Response({"error": "You cannot start a chat with yourself"}, status=400)

        # Check if a chat between the two participants already exists
        chat = Chat.objects.filter(participants=current_user).filter(participants=friend).first()

        if not chat:
            # Create a new chat and add both participants
            chat = Chat.objects.create()
            chat.participants.add(current_user, friend)

        # Serialize and return the chat
        serializer = ChatSerializer(chat)
        return Response(serializer.data)

# @permission_classes([AllowAny]) 
class MessageView(APIView):
    def post(self, request):
        sender = request.user
        chat_id = request.data.get('chat_id')
        receiver_id = request.data.get('receiver_id')
        content = request.data.get('content')

        # Validate that chat exists
        try:
            chat = Chat.objects.get(id=chat_id)
        except Chat.DoesNotExist:
            return Response({"error": "Chat not found"}, status=404)

        # Validate that receiver exists and is a participant of the chat
        try:
            receiver = Account.objects.get(id=receiver_id)
        except Account.DoesNotExist:
            return Response({"error": "Receiver not found"}, status=404)

        if receiver not in chat.participants.all():
            return Response({"error": "Receiver is not a participant of this chat"}, status=400)

        # Create and save the message
        message = Message.objects.create(
            chat=chat,
            sender=sender,
            receiver=receiver,
            content=content
        )

        serializer = MessageSerializer(message)
        return Response(serializer.data, status=201)

# @permission_classes([AllowAny]) 
class ChatListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        chats = Chat.objects.filter(participants=user)  # Get chats involving the current user
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)