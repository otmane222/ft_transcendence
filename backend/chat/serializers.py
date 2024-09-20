from rest_framework import serializers
from account.serializers import AccountSerializer
from .models import Chat, Message

class MessageSerializer(serializers.ModelSerializer):
    sender = AccountSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'content', 'timestamp', 'seen']

class ChatSerializer(serializers.ModelSerializer):
    participants = AccountSerializer(many=True)
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ['id', 'participants', 'messages']