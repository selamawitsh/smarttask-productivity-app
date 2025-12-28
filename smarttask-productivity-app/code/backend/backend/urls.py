from django.urls import path, include
from tasks import views  # import views for home

urlpatterns = [
    path('', views.home, name='home'),  # root URL
    path('tasks/', include('tasks.urls')),  # tasks list
]
