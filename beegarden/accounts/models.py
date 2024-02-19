from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    # Will extend player user and admin user in the future
    #fields needed for the user model
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.username

class Garden(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username + "'s garden"

class Bee(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    health = models.IntegerField(default=100)
    pollen = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username + "'s bee"