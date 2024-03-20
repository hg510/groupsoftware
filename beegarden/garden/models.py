# Author: Pawarisa Saiyut

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings


class Seed(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class PlantedSeed(models.Model):
    seed_type = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    planted_at = models.DateTimeField(default=timezone.now)
    # planted_by = models.ForeignKey(User, on_delete=models.CASCADE) 

    def __str__(self):
        return f"{self.seed_type} at {self.position}"

    def is_expired(self):
        # Check if the seed is older than 6 days
        return timezone.now() - self.planted_at >= timezone.timedelta(days=6)
    
class UserSeed(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_seeds')
    chosen_flower = models.CharField(max_length=100) 

    def __str__(self):
        return self.chosen_flower