# views.py

from django.shortcuts import render
from django.http import JsonResponse,HttpResponseBadRequest
from habittracker.models import UserScore
from .models import PlantedSeed
import json
from django.utils import timezone
from datetime import timedelta
from habittracker.utils import get_today_score
from django.http import JsonResponse
from .models import UserSeed

def garden_view(request):
    # Remove expired seeds
    remove_expired_seeds()
    
    # Fetch today's score for the user
    user = request.user
    today_score = get_today_score(user)

    scaled_score = (today_score / 10) * 100
    
    # Pass today's score to the template
    return render(request, 'garden/garden.html', {'today_score': scaled_score})

def save_planted_seed(request):
    if request.method == 'POST' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Parse JSON body
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON payload')

        # Retrieve seed_type from data
        seed_type = data.get('seed_type')
        position = data.get('position')

        print("Received seed type: ", seed_type)
        print("Received position: ", position)

        if seed_type is None or position is None:
            return HttpResponseBadRequest('Missing required fields')

        try:
            # Save the planted seed to the database
            PlantedSeed.objects.create(seed_type=seed_type, position=position)
            print('Seed saved successfully')
            return JsonResponse({'message': 'Seed saved successfully'}, status=200)
        except Exception as e:
            print('Error saving seed:', e)
            return JsonResponse({'message': 'Failed to save seed'}, status=500)
        
    else:
        print('Invalid request')
        return JsonResponse({'message': 'Invalid request'}, status=400)

def get_planted_seeds(request):
    if request.method == 'GET' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Remove expired seeds before fetching
        remove_expired_seeds()
        
        planted_seeds = PlantedSeed.objects.all().values('seed_type', 'position')
        print("Planted seeds and positions: ", planted_seeds)
        return JsonResponse(list(planted_seeds), safe=False)
    else:
        return JsonResponse({'message': 'Invalid request'}, status=400)
    
def remove_expired_seeds():
    # Define the expiration time (5 minutes ago)
    expiration_time = timezone.now() - timedelta(days=6)
    
    # Query for seeds planted before the expiration time
    expired_seeds = PlantedSeed.objects.filter(planted_at__lt=expiration_time)
    
    # Delete the expired seeds from the database
    expired_seeds.delete()


def userSeeds(request):
    if request.method == 'POST':
        # Parse JSON body
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON payload'})

        # Extract the chosen flower from the JSON data
        chosen_flower = data.get('chosenFlower')

        if chosen_flower:
            # Save the chosen flower to the database
            UserSeed.objects.create(chosen_flower=chosen_flower)
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Missing chosen flower data'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})


def clearUserSeeds(request):
    if request.method == 'POST':
        # Clear the user seeds in the database
        UserSeed.objects.all().delete()
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})


def updateDisplayedSeeds(request):
    if request.method == 'GET':
        # Get all user seeds from the database
        user_seeds = UserSeed.objects.all()
        # Extract flower names from user seeds
        userSeedsArray = [seed.chosen_flower for seed in user_seeds]
        return JsonResponse({'userSeedsArray': userSeedsArray})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})