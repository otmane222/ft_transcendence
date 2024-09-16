from django.urls import path
from .views import MessageCreateView, MessageListView

urlpatterns = [
    path('send/', MessageCreateView.as_view(), name='send_message'),
    path('messages/<int:user_id>/', MessageListView.as_view(), name='message_list'),
]
