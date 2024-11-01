import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Game, PlayerScore, GameSession
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async

User = get_user_model()

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'game_{self.room_name}'


        self.player1 = self.scope['user']
        self.player2 = await sync_to_async(User.objects.get)(username=self.room_name.split('_')[1])
        

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()


        self.game = await sync_to_async(Game.objects.create)(
            player1=self.player1,
            player2=self.player2
        )
        self.player1_score = await sync_to_async(PlayerScore.objects.create)(game=self.game, player=self.player1)
        self.player2_score = await sync_to_async(PlayerScore.objects.create)(game=self.game, player=self.player2)


        await sync_to_async(GameSession.objects.create)(game=self.game, player=self.player1)
        await sync_to_async(GameSession.objects.create)(game=self.game, player=self.player2)


        asyncio.create_task(self.game_loop())

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        

        await sync_to_async(GameSession.objects.filter(game=self.game, player=self.scope['user']).update)(is_active=False)

    async def receive(self, text_data):
        data = json.loads(text_data)
        player = data['player']
        new_y = data['y']


        game_state = cache.get(self.room_group_name)
        game_state[player]['y'] = new_y
        cache.set(self.room_group_name, game_state)




    async def game_loop(self):
        while True:
            await asyncio.sleep(0.03)

            game_state = cache.get(self.room_group_name)

            ball = game_state['ball']
            ball['x'] += ball['vx']
            ball['y'] += ball['vy']

            if ball['y'] <= 0 or ball['y'] >= 100:
                ball['vy'] *= -1

            if (ball['x'] <= 5 and abs(ball['y'] - game_state['paddle1']['y']) < 10) or \
            (ball['x'] >= 95 and abs(ball['y'] - game_state['paddle2']['y']) < 10):
                ball['vx'] *= -1

            if ball['x'] <= 0:
                game_state['score2'] += 1
                ball['x'], ball['y'] = 50, 50
                ball['vx'], ball['vy'] = 1, 1

            if ball['x'] >= 100:
                game_state['score1'] += 1
                ball['x'], ball['y'] = 50, 50
                ball['vx'], ball['vy'] = -1, -1

            cache.set(self.room_group_name, game_state)

            await self.channel_layer.group_send(self.room_group_name, {
                'type': 'update_state',
                'game_state': game_state
            })

            if self.check_score():
                await self.increment_score(self.player1 if self.check_winner(self.player1) else self.player2)

    async def increment_score(self, player):

        if player == self.player1:
            await sync_to_async(self.player1_score.increment_score)()
        else:
            await sync_to_async(self.player2_score.increment_score)()

        if await sync_to_async(self.check_game_over)():
            await sync_to_async(self.game.end_game)(player)

    def check_score(self):

        pass

    def check_game_over(self):

        return self.player1_score.score >= 10 or self.player2_score.score >= 10



