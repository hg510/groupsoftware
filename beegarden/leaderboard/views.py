# Author: Pawarisa Saiyut

from django.shortcuts import render
from habittracker.models import UserScore  
from .models import LeaderboardEntry

def leaderboard_view(request):
    # Retrieve user scores ordered by score in descending order
    user_scores = UserScore.objects.all()

    # Calculate total score including streak points and order by it in descending order
    for user_score in user_scores:
        streak_points = user_score.streak_count * 10
        user_score.total_score = user_score.score + streak_points
    
    # Order user scores by total score in descending order
    user_scores = sorted(user_scores, key=lambda x: x.total_score, reverse=True)

    # Pass user scores to the template context
    context = {'user_scores': user_scores}
    
    return render(request, 'leaderboard.html', context)
