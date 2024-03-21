# Author: Nur Deeni

from django.db import models
from django.contrib.auth.models import User

# Model representing individual habit tracking entries by users.
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

    number_of_habits = models.IntegerField(default=0)

    # Add a field for date created
    date_created = models.DateTimeField(auto_now_add=True)

    # Make the user field mandatory
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.number_of_habits = sum([
            self.walk, self.plastic, self.food, self.water_bottle, self.utensils,
            self.short_trips, self.plant_based_meals, self.unplug_electronics,
            self.natural_light, self.community_cleanups, self.reduce_food_waste,
            self.public_transportation, self.turn_off_lights
        ])
        super().save(*args, **kwargs)
        
# Model for tracking overall user scores and streaks based on habit tracking.
class UserScore(models.Model):
    score = models.IntegerField(default=0)
    streak_count = models.IntegerField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"User: {self.user.username}, Score: {self.score}, Streak Count: {self.streak_count}"