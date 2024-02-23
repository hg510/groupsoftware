from django.db import models

class Habit(models.Model):
    walk = models.BooleanField(default=False)
    plastic = models.BooleanField(default=False)
    food = models.BooleanField(default=False)
    
    # Add a field for date created
    date_created = models.DateTimeField(auto_now_add=True)

    # Make the user field mandatory
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
