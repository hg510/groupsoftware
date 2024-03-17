# Author: Pawarisa Saiyut

from django.urls import path
from .views import adminPage

urlpatterns = [
    path('adminpage/', adminPage, name='adminpage'),
]
