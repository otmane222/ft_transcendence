from rest_framework import serializers
from .models import Chat, Message
from account.models import Account

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'chat', 'sender', 'receiver', 'content', 'timestamp']

class ChatSerializer(serializers.ModelSerializer):
    participants = serializers.StringRelatedField(many=True)
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ['id', 'participants', 'created_at']