# Author: Harry Gammie

from django.urls import path
from .views import habitTracker

urlpatterns = [
    path('', habitTracker, name='habit_tracker'),
]