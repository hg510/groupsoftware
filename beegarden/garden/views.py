from django.shortcuts import render
from habittracker.models import UserScore

def garden_view(request):
    # Fetch the user's score
    user_score = UserScore.objects.get(user=request.user)
    score = user_score.score
    
    # Pass the score to the template
    return render(request, 'garden/garden.html', {'score': score})
