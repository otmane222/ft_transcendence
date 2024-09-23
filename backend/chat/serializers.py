
from rest_framework import serializers
from account.models import Account
from .models import Chat, Message

class ChatSerializer(serializers.ModelSerializer):
    participants = serializers.SlugRelatedField(
        many=True, 
        slug_field='username', 
        queryset=Account.objects.all()
    )

    class Meta:
        model = Chat
        fields = ['id', 'participants', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(slug_field='username', queryset=Account.objects.all())

    class Meta:
        model = Message
        fields = ['id', 'chat', 'sender', 'content', 'timestamp']
