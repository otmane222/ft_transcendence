from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes

from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer

# @permission_classes([AllowAny])
class ChatListView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(participants=self.request.user)

# @permission_classes([AllowAny]) 
class MessageListView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        chat_id = self.kwargs['chat_id']
        return Message.objects.filter(chat__id=chat_id, chat__participants=self.request.user)

    def perform_create(self, serializer):
        chat = Chat.objects.get(id=self.kwargs['chat_id'])
        serializer.save(sender=self.request.user, chat=chat)


# chat/views.py
from rest_framework import generics, permissions
from .models import Chat, Message
from .serializers import MessageSerializer

class MessageListView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        chat_id = self.kwargs['chat_id']
        return Message.objects.filter(chat__id=chat_id)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
