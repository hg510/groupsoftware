from django.shortcuts import render
from habittracker.models import UserScore  
from .models import LeaderboardEntry

def leaderboard_view(request):
    return render(request, 'leaderboard.html')

def leaderboard_view(request):
    # Retrieve user scores ordered by score in descending order
    user_scores = UserScore.objects.order_by('-score')

    # Pass user scores to the template context
    context = {'user_scores': user_scores}
    
    return render(request, 'leaderboard.html', context)
