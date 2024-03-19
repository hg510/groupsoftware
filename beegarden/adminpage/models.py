# Author: Pawarisa Saiyut

from django.db import models
from django.contrib.auth.models import User
from habittracker.models import Habit  

# Represents a request made for reviewing a habit submission.
class HabitRequest(models.Model):
    goal = models.CharField(max_length=150, verbose_name="Goal")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habit_requests', verbose_name="User")
    habit = models.ForeignKey(Habit, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Habit")
    reviewed = models.BooleanField(default=False, verbose_name="Reviewed")
    status = models.CharField(max_length=10, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending')
    number_of_habits = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Habit Request"
        verbose_name_plural = "Habit Requests"


class UserSeedAward(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    awarded = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'awarded')

