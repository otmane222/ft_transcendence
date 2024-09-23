from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ChatViewSet, MessageViewSet

router = DefaultRouter()
router.register(r'chats', ChatViewSet, basename='chat')
router.register(r'chats/(?P<chat_id>[^/.]+)/messages', MessageViewSet, basename='message')

urlpatterns = [
    path('', include(router.urls)),
]