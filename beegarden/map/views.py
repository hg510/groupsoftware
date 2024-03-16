# Author: Saida Amirova 

from django.http import JsonResponse
from django.shortcuts import render
from habittracker.models import UserScore

def map(request):
    if request.method == 'POST':
        score_increment = int(request.POST.get('score_increment', 0))

        # Update user's score
        if request.user.is_authenticated:
            user_score = UserScore.objects.get_or_create(user=request.user)
            user_score.score += score_increment
            user_score.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'User not authenticated'})
    else:   
        return render(request, "map.html")
