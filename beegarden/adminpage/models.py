# Author: Pawarisa Saiyut

from django.db import models
from django.contrib.auth.models import User
from habittracker.models import Habit  

# Represents a request made for reviewing a habit submission.
class HabitRequest(models.Model):
    goal = models.CharField(max_length=150, verbose_name="Goal")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habit_requests', verbose_name="User")
    habit = models.ForeignKey(Habit, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Habit")

    class Meta:
        verbose_name = "Habit Request"
        verbose_name_plural = "Habit Requests"

# Represents an admin's response to a habit request, indicating acceptance or rejection.
class ResponseRequest(models.Model):
    accepted = models.BooleanField(verbose_name="Accepted")
    date_created = models.DateTimeField(auto_now_add=True, verbose_name="Date Created")
    habit_request = models.ForeignKey(HabitRequest, on_delete=models.CASCADE, related_name='response_requests', verbose_name="Habit Request")

    class Meta:
        verbose_name = "Response Request"
        verbose_name_plural = "Response Requests"


