from django.urls import path
from .views import ChatCreateView, MessageListView, ChatListView

urlpatterns = [
    path('create/', ChatCreateView.as_view(), name='chat-create'),
    path('', ChatListView.as_view(), name='chat-list'),  # Get list of user's chats
    path('<int:chat_id>/messages/', MessageListView.as_view(), name='message-list'),  # Get and create messages for a chat
]