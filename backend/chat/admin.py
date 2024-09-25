from django.contrib import admin
from .models import Chat, Message

class MessageInline(admin.TabularInline):
    model = Message
    extra = 0  # Number of empty forms to display
    fields = ['sender', 'content', 'timestamp']
    readonly_fields = ['timestamp']  # Make timestamp read-only

class ChatAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_participants', 'created_at')
    search_fields = ('participants__username',)
    inlines = [MessageInline]

    def get_participants(self, obj):
        return ", ".join([user.username for user in obj.participants.all()])
    get_participants.short_description = 'Participants'

class MessageAdmin(admin.ModelAdmin):
    list_display = ('chat', 'sender', 'receiver', 'content', 'timestamp')
    list_filter = ('chat', 'sender', 'receiver')
    search_fields = ('content', 'sender__username', 'receiver__username')


# Register the models
admin.site.register(Chat, ChatAdmin)
admin.site.register(Message, MessageAdmin)