

from django.urls import path
# from .views import (
#      register_page
# )

from .auth.auth import (login_page,logout_view,register_page)

from .chatbots.llama3 import Llama3APIView
from .chatbots.mixtral import MixtralAPIView
from .chatbots.gemma import GemmaAPIView
from .chatbots.pdf import PdfAPIView, PdfChat
from .chatbots.pdf import PdfAPIView

from .chatbots.llama3_1 import Llama3_1APIView
from .chatbots.atta import AttaAPIView
from .chatbots.claude import ClaudeAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from .chatbot_History.history_atta import get_user_conversations
from .webhooks import stripe_webhook
# from .views import checkout  # Import your view
from .views import check_auth
from .chatbot_History.history_atta import get_user_conversations
from .chatbots.gpt3_5 import Gpt3_5APIView
from .chatbots.personalbot import PersonalBotAPIView
from .chatbots.atta import AttaAPIView
from .chatbots.uol import UolAPIView
from .views import website_info, all_data,google_login
from .payment.stripe import create_subscription

from .visionmodels.llama32 import Llama32_11bVisionAPIView
urlpatterns = [


    path('google-login/', google_login, name='google_login'),

    # path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', login_page, name='login_page'),  
    path('register/', register_page, name='register'),


    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('check_auth/', check_auth, name='check_auth'),

    path('api/logout/', logout_view, name='logout'),
    path('llama3/', Llama3APIView.as_view(), name='llama3'),
    path('llama3.1/', Llama3_1APIView.as_view(), name='llama3.1'),
    path('gpt3.5/', Gpt3_5APIView.as_view(), name='llama3.1'),

    path('mixtral/', MixtralAPIView.as_view(), name='mixtral'),


    # path('api/claude/', ClaudeAPIView.as_view(), name='claude'),
     path('claude/', ClaudeAPIView.as_view(), name='claude'),



    path('gemma/', GemmaAPIView.as_view(), name='gemma'),
    path('uol/', UolAPIView.as_view(), name='uol'),

    path('atta/', AttaAPIView.as_view(), name='atta'),


    
    path('upload_pdf/', PdfAPIView.as_view(), name='upload_pdf'),
    path('pdfchat/', PdfChat.as_view(), name='pdfchat'),

    # vision models 

    path('llama32.11b/', Llama32_11bVisionAPIView.as_view(), name='meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo'),

    # end of vision models




    path('api/personalbot/', PersonalBotAPIView.as_view(), name='PersnalBotAPIView'),

    path('api/history_atta/<int:user_id>/', get_user_conversations, name='get_user_conversations'),
    
    path('api/stripe/webhook', stripe_webhook, name='stripe_webhook'),
    # path('api/create-checkout-session/', create_checkout_session_view, name='create_checkout_session'),
    # path('checkout/', checkout, name='checkout'),


    path('api/admin/website-info/', website_info, name='website_info'),
    path('api/admin/all-data/', all_data, name='all_data'),








        path('create-subscription/', create_subscription, name='create_subscription'),

]



# LANGCHAIN_TRACING_V2=true
# LANGCHAIN_ENDPOINT="https://api.smith.langchain.com"
# LANGCHAIN_API_KEY="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"
# LANGCHAIN_PROJECT="chatbothub"

# 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