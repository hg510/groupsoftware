from django.urls import path
from . import views

from django.shortcuts import render
from .models import Leaderboard

def leaderboard(request):
    # Get the leaderboard that display the user's score from top to bottom (Ex. Rank one is the player with highest score)
    leaderboard = Leaderboard.objects.order_by('-score')
    return render(request, 'leaderboard.html', {'leaderboard': leaderboard})