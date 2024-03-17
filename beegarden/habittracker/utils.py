# utils.py

from django.db.models import Count
from .models import Habit
from django.utils import timezone

def get_today_score(user):
    # Get today's date
    today = timezone.now().date()

    # Count the number of habits completed today for the user
    today_habits_count = Habit.objects.filter(user=user, date_created__date=today).count()

    # Calculate today's score based on the number of habits completed
    max_habits = 13
    today_score = (today_habits_count / max_habits) * 100  # Calculate percentage

    return today_score