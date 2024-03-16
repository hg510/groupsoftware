# Author: Saida Amirova

from django.urls import path
from . import views

urlpatterns = [
    path('seedMap/', views.map, name='map'),
]