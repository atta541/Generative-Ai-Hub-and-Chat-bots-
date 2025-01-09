# from django.db import models

# class UploadedPDF(models.Model):
#     file = models.FileField(upload_to='pdfs/')
#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.file.name


from django.db import models
from django.contrib.auth.models import User

class UploadedPDF(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Temporarily allow nulls
    file = models.FileField(upload_to='pdfs/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name



from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField(blank=True, null=True)  # Add this field

    is_subscribed = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username





class Chatbot(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    chatbot = models.ForeignKey(Chatbot, on_delete=models.CASCADE)
    user_message = models.TextField()
    bot_response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.chatbot.name} - {self.created_at}"


