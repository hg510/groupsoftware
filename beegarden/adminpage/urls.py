# Author: Pawarisa Saiyut

from django.urls import path
from .views import adminPage

urlpatterns = [
    path('custom-admin/', adminPage, name='custom_admin'),
]
