# app/urls.py
from django.urls import path
from .views import adminPage

urlpatterns = [
    path('admin-page/', adminPage, name='admin'),
]
