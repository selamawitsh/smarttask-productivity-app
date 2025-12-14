import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from yourapp import consumers  # Replace 'yourapp' with the name of your app

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            [
                path("ws/somepath/", consumers.YourConsumer.as_asgi()),  # Update with your WebSocket path and consumer
            ]
        )
    ),
})