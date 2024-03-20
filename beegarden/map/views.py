# Author: Saida Amirova 

from django.http import JsonResponse
from django.shortcuts import render
from habittracker.models import UserScore

def map(request):
    if request.method == 'POST':
        score_increment = int(request.POST.get('score_increment', 0))

        # Update user's score
        if request.user.is_authenticated:
            # Fetch the current user's score
            user_score, created = UserScore.objects.get_or_create(user=request.user)
            current_score = user_score.score
            
            # Add 30 to the current score
            updated_score = current_score + score_increment
            
            # Save the updated score back to the database
            user_score.score = updated_score
            user_score.save()
            
            # Return the current and updated scores in the JSON response
            return JsonResponse({'success': True, 'current_score': current_score, 'updated_score': updated_score})
        else:
            return JsonResponse({'success': False, 'error': 'User not authenticated'})
    else:
        return render(request, "map.html")