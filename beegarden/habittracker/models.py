from django.db import models

class Habit(models.Model):
    
    walk = models.BooleanField(default=False)
    plastic = models.BooleanField(default=False)
    food = models.BooleanField(default=False)
    
    # Make the user field nullable
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True, blank=True)
