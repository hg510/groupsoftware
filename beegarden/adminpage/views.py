# Author: Pawarisa Saiyut

from django.utils import timezone
from django.shortcuts import render, redirect
from .models import HabitRequest, ResponseRequest, Habit  # Updated imports
from garden.models import Seed
from django.contrib.auth.models import User
from django.contrib import messages
from django.db.models import Count
from django.template import RequestContext
from adminpage.models import HabitRequest, ResponseRequest

def adminPage(request):
    user = request.user

    # Check if user is admin
    if user.is_staff:
        if request.method == 'POST':
            habit_request_id = request.POST.get('request_id')  # Renamed variable for clarity
            accept = request.POST.get('accept') == '1'

            try:
                admin_habit_request = HabitRequest.objects.get(id=habit_request_id)
                ResponseRequest.objects.create(habit_request=admin_habit_request, accepted=accept)
                # # Get the corresponding HabitRequest object
                # admin_habit_request = HabitRequest.objects.get(id=habit_request_id)  # Updated variable and model

                # # Create a ResponseRequest object
                # response = ResponseRequest.objects.create(habit_request=admin_habit_request, accepted=accept)  # Updated model

                # Award seeds if request is accepted and daily score is over 40
                if accept:
                    daily_score = calculate_daily_score(admin_habit_request.user)
                    if daily_score >= 40:
                        award_seeds_to_user(admin_habit_request.user)

                # Delete the habit request
                admin_habit_request.delete()
                messages.success(request, "Habit request processed successfully.")
                return redirect('adminpage')


            except HabitRequest.DoesNotExist:
                messages.error(request, "Invalid request ID. Please try again.")
                return redirect('adminpage')

        else:
            pending_habit_requests = HabitRequest.objects.all()

            habit_forms = [{
                'request': habit_request,
                'habits_completed': Habit.objects.filter(user=habit_request.user).count()
            } for habit_request in pending_habit_requests if Habit.objects.filter(user=habit_request.user).count() >= 4]

            if not habit_forms:
                messages.info(request, "No habit forms available for review at the moment.")

            context = {'habit_forms': habit_forms}
            return render(request, 'admin.html', context)
 
    else:
        # messages.error(request, "You are not authorized to access this page.")
        return redirect('home')  # Assuming 'home' is the name of your homepage URL pattern

def calculate_daily_score(user):
    today = timezone.now().date()
    habits = Habit.objects.filter(user=user, date_created__date=today)
    daily_score = sum([10 for habit in habits])

    return daily_score

def award_seeds_to_user(user):
    # Specify the type and quantity of seed to award
    seed_type = "Example Seed"
    quantity = 1
    seed = Seed.objects.create(user=user, type=seed_type, quantity=quantity)





