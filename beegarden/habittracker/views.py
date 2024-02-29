# Author: Nur Deeni

from django.utils import timezone
from django.shortcuts import render, redirect
from .models import Habit, UserScore

# Manages habit tracking submissions and updates user scores and streaks.
def habitTracker(request):
    user = request.user
    today = timezone.now().date()

    # Check if a habit form has been submitted today
    form_submitted = Habit.objects.filter(user=user, date_created__date=today).exists()

    # Retrieve or create the user's score
    user_score, created = UserScore.objects.get_or_create(user=user)

    # Calculate streak and total score
    streak_count = calculate_streak(user)
    total_score = user_score.score + streak_count * 10

    # Handle habit form submission
    if request.method == 'POST':
        if form_submitted:
            # Prevent multiple submissions on the same day
            return render(request, 'habitTracker.html', {'form_submitted': True, 'score': total_score})

        walk = request.POST.get('walk') == 'on'
        plastic = request.POST.get('plastic') == 'on'
        water_bottle = request.POST.get('water_bottle') == 'on'
        utensils = request.POST.get('utensils') == 'on'
        short_trips = request.POST.get('short_trips') == 'on'
        plant_based_meals = request.POST.get('plant_based_meals') == 'on'
        unplug_electronics = request.POST.get('unplug_electronics') == 'on'
        natural_light = request.POST.get('natural_light') == 'on'
        community_cleanups = request.POST.get('community_cleanups') == 'on'
        reduce_food_waste = request.POST.get('reduce_food_waste') == 'on'
        public_transportation = request.POST.get('public_transportation') == 'on'
        turn_off_lights = request.POST.get('turn_off_lights') == 'on'

        # Calculate submission score
        submission_score = 0
        if walk:
            submission_score += 10
        if plastic:
            submission_score += 10
        if water_bottle:
            submission_score += 10
        if utensils:
            submission_score += 10
        if short_trips:
            submission_score += 10
        if plant_based_meals:
            submission_score += 10
        if unplug_electronics:
            submission_score += 10
        if natural_light:
            submission_score += 10
        if community_cleanups:
            submission_score += 10
        if reduce_food_waste:
            submission_score += 10
        if public_transportation:
            submission_score += 10
        if turn_off_lights:
            submission_score += 10

        # Create Habit object and update total score
        habit = Habit.objects.create(user=user, walk=walk, plastic=plastic, water_bottle=water_bottle,
                                     utensils=utensils, short_trips=short_trips,
                                     plant_based_meals=plant_based_meals, unplug_electronics=unplug_electronics,
                                     natural_light=natural_light, community_cleanups=community_cleanups,
                                     reduce_food_waste=reduce_food_waste, public_transportation=public_transportation,
                                     turn_off_lights=turn_off_lights)

        # Update total score with submission score and store in database
        total_score += submission_score
        user_score.score = total_score
        user_score.save()

        # Reset or increment streak based on submission date
        if habit.date_created.date() != today:
            reset_streak(user)
        else:
            increment_streak(user)

        # Set the score in the session
        request.session['total_score'] = total_score

    return render(request, 'habitTracker.html', {'form_submitted': form_submitted, 'score': total_score})

# Calculates the consecutive days a user has submitted habits.
def calculate_streak(user):
    habits = Habit.objects.filter(user=user).order_by('-date_created')
    streak_count = 0
    today = timezone.now().date()
    
    for habit in habits:
        if habit.date_created.date() == today:
            streak_count += 1
            today -= timezone.timedelta(days=1)
        else:
            break
    
    return streak_count

# Resets the user's streak count to zero.
def reset_streak(user):
    user_score = UserScore.objects.get(user=user)
    user_score.streak_count = 0
    user_score.save()

# Increments the user's streak count by one.
def increment_streak(user):
    user_score = UserScore.objects.get(user=user)
    user_score.streak_count += 1
    user_score.save()
