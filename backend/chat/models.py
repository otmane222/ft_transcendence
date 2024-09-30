from django.conf import settings
from django.db import models
from account.models import Account
from django.db import transaction

class Chat(models.Model):
    participants = models.ManyToManyField(Account, related_name='chats')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Chat between {self.participants.all()[0].username} and {self.participants.all()[1].username}"

class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(Account, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(Account, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    # class Meta:
    #     ordering = ('-timestamp',)
    def __str__(self):
        return f"Message from {self.sender.username} to {self.receiver.username} in chat {self.chat.id}"

