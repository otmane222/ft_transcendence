from django.conf import settings
from django.db import models
# from account.models import Account



# class Chat(models.Model):
#     participants = models.ManyToManyField(Account, related_name='chats')

#     def clean(self):
#         if self.participants.count() != 2:
#             raise ValidationError('A chat must have exactly two participants.')

#     def save(self, *args, **kwargs):
#         self.clean()
#         super().save(*args, **kwargs)

# class Message(models.Model):
#     # def get_default_chat():
#     #     return Chat.objects.first().id
#     chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
#     sender = models.ForeignKey(Account, related_name='sent_messages', on_delete=models.CASCADE)
#     receiver = models.ForeignKey(Account, related_name='received_messages', on_delete=models.CASCADE)
#     content = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)
#     seen = models.BooleanField(default=False)
