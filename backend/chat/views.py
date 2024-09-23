from rest_framework import viewsets
from .serializers import ChatSerializer, MessageSerializer
from .models import Chat, Message

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

@permission_classes([AllowAny]) 
class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

@permission_classes([AllowAny]) 
class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        chat_id = self.kwargs['chat_id']
        return Message.objects.filter(chat_id=chat_id)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

# class ChatViewSet(viewsets.ModelViewSet):
#     serializer_class = ChatSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         # Return chats where the current user is a participant
#         return Chat.objects.filter(participants=self.request.user)

#     def perform_create(self, serializer):
#         # Automatically add the current user as a participant when creating a chat
#         serializer.save(participants=[self.request.user])

# class MessageViewSet(viewsets.ModelViewSet):
#     serializer_class = MessageSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         # Get messages for a specific chat passed via URL
#         chat_id = self.kwargs['chat_pk']
#         return Message.objects.filter(chat_id=chat_id)

#     def perform_create(self, serializer):
#         # Set the sender to the current user when creating a message
#         chat = Chat.objects.get(id=self.kwargs['chat_pk'])
#         serializer.save(chat=chat, sender=self.request.user)







# from rest_framework import generics
# from rest_framework.permissions import IsAuthenticated
# from .models import Message
# from .serializers import MessageSerializer

# # View to send a message
# class MessageCreateView(generics.CreateAPIView):
#     serializer_class = MessageSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(sender=self.request.user)

# # View to retrieve messages between two users
# class MessageListView(generics.ListAPIView):
#     serializer_class = MessageSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         other_user_id = self.kwargs['user_id']  # id of the other user in the conversation
#         return Message.objects.filter(
#             (models.Q(sender=user) & models.Q(receiver_id=other_user_id)) |
#             (models.Q(sender_id=other_user_id) & models.Q(receiver=user))
#         ).order_by('timestamp')