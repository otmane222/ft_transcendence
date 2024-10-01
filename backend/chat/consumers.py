# your_app_name/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Chat, Message
from django.contrib.auth import get_user_model

Account = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        print("chat_id: " , self.chat_id)
        self.chat_group_name = f'chat_{self.chat_id}'
        # # Join the chat group
        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )
        await self.accept()

        # self.send(text_data=json.dumps({
        #     'type':'connection_established',
        #     'message':'You are now connected!',
        # }))

        await self.channel_layer.group_send(
        self.chat_group_name,
            {
                'type': 'chat_message',
                'message': "hi from server",
                'sender': "server",
            }
        )

    async def disconnect(self, close_code):
        # Leave the chat group
        # await self.channel_layer.group_discard(
        #     self.chat_group_name,
        #     self.channel_name
        # )
        pass

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender_id = text_data_json['sender']

        # You can create the message in your database here
        sender = await Account.objects.get(id=sender_id)
        chat = await Chat.objects.get(id=self.chat_id)

        await Message.objects.create(chat=chat, sender=sender, content=message)

        # Broadcast the message to the group
        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender_id,
            }
        )

    # Receive message from chat group
    async def chat_message(self, event):
        message = event['message']
        sender_id = event['sender']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender_id,
        }))
