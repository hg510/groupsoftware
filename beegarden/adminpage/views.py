# Author: Pawarisa Saiyut

from django.utils import timezone
from django.shortcuts import render, redirect
from .models import HabitRequest, ResponseRequest, Habit  # Updated imports
from garden.models import Seed
from django.contrib.auth.models import User
from django.db.models import Count
from django.template import RequestContext

def adminPage(request):
    user = request.user

    # Check if user is admin
    if user.is_staff:
        if request.method == 'POST':
            habit_request_id = request.POST.get('request_id')  # Renamed variable for clarity
            accept = request.POST.get('accept') == '1'

            try:
                # Get the corresponding HabitRequest object
                admin_habit_request = HabitRequest.objects.get(id=habit_request_id)  # Updated variable and model

                # Create a ResponseRequest object
                response = ResponseRequest.objects.create(habit_request=admin_habit_request, accepted=accept)  # Updated model

                # Award seeds if request is accepted and daily score is over 40
                if accept:
                    daily_score = calculate_daily_score(admin_habit_request.user)
                    if daily_score >= 40:
                        award_seeds_to_user(admin_habit_request.user)

                # Delete the habit request
                admin_habit_request.delete()

                # Redirect to admin page
                return redirect('adminpage')

            except HabitRequest.DoesNotExist:  # Updated model
                # Handle case where HabitRequest does not exist
                error_message = 'Invalid request ID'
                pending_habit_requests = HabitRequest.objects.all()  # Updated variable and model

                habit_forms = []
                for habit_request in pending_habit_requests:  # Renamed variable for clarity
                    habits_completed = Habit.objects.filter(user=habit_request.user).count()
                    if habits_completed >= 4:
                        habit_forms.append({'request': habit_request, 'habits_completed': habits_completed})
                context = {'habit_forms': habit_forms}
                return render(request, 'admin.html', context)

        else:
            # Retrieve pending HabitRequests
            pending_habit_requests = HabitRequest.objects.all()  # Updated variable and model

            # Filter habit forms to include only those with at least 4 tasks completed
            habit_forms = []
            for habit_request in pending_habit_requests:  # Renamed variable for clarity
                habits_completed = Habit.objects.filter(user=habit_request.user).count()
                if habits_completed >= 4:
                    habit_forms.append({'request': habit_request, 'habits_completed': habits_completed})

            context = {'habit_forms': habit_forms}
            return render(request, 'admin.html', context)  

        # If user is not admin, redirect to home page or show an error message
        return render(request, 'home.html', {'error_message': 'You are not authorized to access this page'})

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





