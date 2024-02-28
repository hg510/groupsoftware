from django.db import models
from django.contrib.auth.models import User

class Habit(models.Model):
    walk = models.BooleanField(default=False)
    plastic = models.BooleanField(default=False)
    food = models.BooleanField(default=False)
    water_bottle = models.BooleanField(default=False)
    utensils = models.BooleanField(default=False)
    short_trips = models.BooleanField(default=False)
    plant_based_meals = models.BooleanField(default=False)
    unplug_electronics = models.BooleanField(default=False)
    natural_light = models.BooleanField(default=False)
    community_cleanups = models.BooleanField(default=False)
    reduce_food_waste = models.BooleanField(default=False)
    public_transportation = models.BooleanField(default=False)
    turn_off_lights = models.BooleanField(default=False)
    
    # This field functions as a simple flag to indicate whether each habit submission form has been reviewed and approved
    approved = models.BooleanField(default=False)

    # Add a field for date created
    date_created = models.DateTimeField(auto_now_add=True)

    # Make the user field mandatory
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class UserScore(models.Model):
    score = models.IntegerField(default=0)
    streak_count = models.IntegerField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"User: {self.user.username}, Score: {self.score}, Streak Count: {self.streak_count}"