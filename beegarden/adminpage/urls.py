# app/urls.py
from django.urls import path
from .views import adminPage

urlpatterns = [
    path('adminpage/', adminPage, name='admin'),
]
