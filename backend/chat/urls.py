from django.urls import path
from .views import ChatView, MessageView, ChatListView

urlpatterns = [
    # URL to create or retrieve a chat between two users
    path('', ChatView.as_view(), name='create_or_get_chat'),

    path('list/', ChatListView.as_view(), name='list_chats'),
    # URL to get messages for a specific chat by chat ID
    path('<int:chat_id>/messages/', MessageView.as_view(), name='chat_messages'),
]