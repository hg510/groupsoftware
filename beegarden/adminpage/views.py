# Author: Pawarisa Saiyut

from django.utils import timezone
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.db.models import Count
from django.db.models import Q
from django.template import RequestContext
from garden.models import Seed
from habittracker.models import Habit
from adminpage.models import HabitRequest

def adminPage(request):
    if not request.user.is_staff:
        return redirect('home')

    if request.method == 'POST':
        approved_request_ids = request.POST.getlist('request_ids')  # Assuming these are the IDs of the approved requests

        # Fetch all pending requests
        all_pending_request_ids = HabitRequest.objects.filter(status='pending').values_list('id', flat=True)

        # Determine which requests were not approved (and thus should be rejected)
        # Note: This converts the lists to sets for efficient set operations
        approved_request_ids_set = set(map(int, approved_request_ids))
        all_pending_request_ids_set = set(all_pending_request_ids)
        to_be_rejected_ids = list(all_pending_request_ids_set - approved_request_ids_set)

        # Update status for approved requests
        HabitRequest.objects.filter(id__in=approved_request_ids).update(status='approved')

        # Update status for requests to be auto-rejected
        HabitRequest.objects.filter(id__in=to_be_rejected_ids).update(status='rejected')

        messages.success(request, "Habit requests processed successfully.")
        return redirect('adminpage')

    else:
        pending_habit_requests = HabitRequest.objects.filter(status='pending').prefetch_related('user', 'habit')

        habit_forms = [{
            'request': hr,
            'habits_completed': hr.number_of_habits,
        } for hr in pending_habit_requests]

        context = {
            'habit_forms': habit_forms,
            'message': "No habit forms available for review at the moment." if not habit_forms else ""
        }

        return render(request, 'admin.html', context)

# def adminPage(request):
#     if not request.user.is_staff:
#         return redirect('home')

#     if request.method == 'POST':
#         approved_request_ids = request.POST.getlist('request_ids')  # Ensure the name matches your HTML form input for checkboxes
#         rejected_request_ids = request.POST.getlist('rejected_request_ids')

#         # Update status for approved requests
#         HabitRequest.objects.filter(id__in=approved_request_ids).update(status='approved')
#         # Update status for rejected requests
#         HabitRequest.objects.filter(id__in=rejected_request_ids).update(status='rejected')
        
#         messages.success(request, "Habit requests processed successfully.")
#         return redirect('adminpage')

#     else:
#         # This fetches all HabitRequests, regardless of their completion count
#         # Adjustments should be made if you wish to only fetch those with certain criteria
#         pending_habit_requests = HabitRequest.objects.filter(status='pending').prefetch_related('user', 'habit')

#         habit_forms = [{
#             'request': hr,
#             'habits_completed': hr.number_of_habits,
#             # 'habits_completed': Habit.objects.filter(user=hr.user).count(),
#             # Add any additional data you need in the template here
#         } for hr in pending_habit_requests]

#         context = {
#             'habit_forms': habit_forms,
#             'message': "No habit forms available for review at the moment." if not habit_forms else ""
#         }

#         return render(request, 'admin.html', context)


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



