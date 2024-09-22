# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from rest_framework_nested.routers import NestedSimpleRouter
# from .views import ChatViewSet, MessageViewSet

# router = DefaultRouter()
# router.register(r'chats', ChatViewSet, basename='chats')

# # Nested router for messages within chats
# chats_router = NestedSimpleRouter(router, r'chats', lookup='chat')
# chats_router.register(r'messages', MessageViewSet, basename='chat-messages')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('', include(chats_router.urls)),
# ]