from django.urls import path
# from . import consumers
from backend.chat.consumers import ChatConsumer
from backend.game.consumers import GameConsumer

websocket_urlpatterns = [
    path('ws/chat/<int:chat_id>/', ChatConsumer.as_asgi()),
    path('ws/game/<str:room_name>/', GameConsumer.as_asgi()),
]