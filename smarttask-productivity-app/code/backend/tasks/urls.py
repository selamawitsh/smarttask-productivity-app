from django.urls import path
from . import views



urlpatterns = [
    path('', views.task_list, name='task_list'),
    path('<int:task_id>/', views.task_detail, name='task_detail'),
    path('<int:task_id>/toggle/', views.task_toggle, name='task_toggle'),
    path('<int:task_id>/delete/', views.task_delete, name='task_delete'),
]
