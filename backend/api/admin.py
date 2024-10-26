# from django.contrib import admin
# from .models import UserProfile
# from django.contrib import admin
# from .models import Chatbot, Conversation


# class UserProfileAdmin(admin.ModelAdmin):
#     list_display = ('user', 'email', 'is_subscribed')
#     search_fields = ('user__username', 'email')

# admin.site.register(UserProfile, UserProfileAdmin)


# class ChatbotAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name')  # Display the ID and name in the list view

# class ConversationAdmin(admin.ModelAdmin):
#     list_display = ('user', 'chatbot', 'created_at')  # Display user, chatbot, and created time
#     search_fields = ('user__username', 'chatbot__name', 'user_message', 'bot_response')  # Allow searching by user, chatbot, or messages

# # Register the models with the admin site
# admin.site.register(Chatbot, ChatbotAdmin)
# admin.site.register(Conversation, ConversationAdmin)



# admin.site.site_header = "Generative AI Chatbot Hub Admin"
# admin.site.site_title = "Admin Portal"
# admin.site.index_title = "Welcome to the Generative AI Chatbot Hub Admin Panel"




from django.contrib import admin
from .models import UserProfile, Chatbot, Conversation

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'email', 'is_subscribed')
    search_fields = ('user__username', 'email')

admin.site.register(UserProfile, UserProfileAdmin)

class ChatbotAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class ConversationAdmin(admin.ModelAdmin):
    list_display = ('user', 'chatbot', 'created_at')
    search_fields = ('user__username', 'chatbot__name', 'user_message', 'bot_response')

admin.site.register(Chatbot, ChatbotAdmin)
admin.site.register(Conversation, ConversationAdmin)

admin.site.site_header = "Generative AI Chatbot Hub Admin"
admin.site.site_title = "Admin Portal"
admin.site.index_title = "Welcome to the Generative AI Chatbot Hub Admin Panel"
