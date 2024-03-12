# Author: Nur Deeni

from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from habittracker.models import UserScore

# Code version where the virtual garden will still load although the user has 0 score
def garden_view(request):
    try:
        # Try to fetch the user's score
        user_score = UserScore.objects.get(user=request.user)
        score = user_score.score
    except ObjectDoesNotExist:
        # If the UserScore object does not exist, set the score to 0
        score = 0

    # Pass the score to the template
    return render(request, 'garden/garden.html', {'score': score})

# def garden_view(request):
#     # Fetch the user's score
#     user_score = UserScore.objects.get(user=request.user)
#     score = user_score.score
    
#     # Pass the score to the template
#     return render(request, 'garden/garden.html', {'score': score})
