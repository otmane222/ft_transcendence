from rest_framework import generics, permissions
from .models import Chat, Message
from .serializers import MessageSerializer, ChatSerializer

class ChatCreateView(generics.CreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Get the other participant from the request
        other_user = Account.objects.get(id=self.request.data['participant_id'])
        user = self.request.user
        
        # Check if a chat between these two users already exists
        existing_chat = Chat.objects.filter(participants=user).filter(participants=other_user).first()
        
        if existing_chat:
            return Response({"message": "Chat already exists", "chat_id": existing_chat.id}, status=status.HTTP_200_OK)
        
        # If no chat exists, create a new one
        new_chat = Chat.objects.create()
        new_chat.participants.add(user, other_user)
        new_chat.save()

        return Response(ChatSerializer(new_chat).data, status=status.HTTP_201_CREATED)

class MessageListView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        chat_id = self.kwargs['chat_id']
        return Message.objects.filter(chat__id=chat_id)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


from rest_framework.permissions import AllowAny, IsAuthenticated
class ChatListView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(participants=self.request.user)




# from rest_framework import generics
# from rest_framework.decorators import permission_classes

# from .models import Chat, Message
# from .serializers import ChatSerializer, MessageSerializer

# # @permission_classes([AllowAny])
class ChatListView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(participants=self.request.user)

# # @permission_classes([AllowAny]) 
# class MessageListView(generics.ListCreateAPIView):
#     serializer_class = MessageSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         chat_id = self.kwargs['chat_id']
#         return Message.objects.filter(chat__id=chat_id, chat__participants=self.request.user)

#     def perform_create(self, serializer):
#         chat = Chat.objects.get(id=self.kwargs['chat_id'])
#         serializer.save(sender=self.request.user, chat=chat)


# # chat/views.py