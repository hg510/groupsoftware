# Author: Pawarisa Saiyut

from django.db import models
from django.contrib.auth.models import User

class LeaderboardEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()

    def __str__(self):
        return f"{self.user.username} - {self.score}"