# Author: Pawarisa Saiyut

from django.utils import timezone
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.db.models import Count, Q
from django.template import RequestContext
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from garden.models import Seed
from habittracker.models import Habit
from adminpage.models import HabitRequest, UserSeedAward

@login_required
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

        # Now, flag users with approved requests for seed awards
        approved_users = HabitRequest.objects.filter(id__in=approved_request_ids).values_list('user', flat=True).distinct()
        for user_id in approved_users:
            UserSeedAward.objects.update_or_create(user_id=user_id, defaults={'awarded': True})

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

def calculate_daily_score(user):
    today = timezone.now().date()
    habits = Habit.objects.filter(user=user, date_created__date=today)
    daily_score = sum([10 for habit in habits])

    return daily_score

@login_required
def check_for_seed_award(request):
    has_award = UserSeedAward.objects.filter(user=request.user, awarded=True).exists()
    return JsonResponse({'hasAward': has_award})

@require_POST
def clear_seed_award(request):
    UserSeedAward.objects.filter(user=request.user, awarded=True).update(awarded=False)
    return JsonResponse({'success': True})
