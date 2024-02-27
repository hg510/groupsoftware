from django.db import models
from django.contrib.auth.models import User

class Seed(models.Model):
    RARITY_CHOICES = [
        ('common', 'Common'),
        ('uncommon', 'Uncommon'),
        ('rare', 'Rare'),
        ('epic', 'Epic'),
    ]

    name = models.CharField(max_length=100)
    rarity = models.CharField(max_length=10, choices=RARITY_CHOICES)
    benefit_score = models.IntegerField(default=0, help_text='The rarer the seed is, the more beneficial it is for the bee. This will also result in higher score.')

    def __str__(self):
        return f"{self.name} ({self.rarity})"


class UserGarden(models.Model):
    PLANT_STATUS_CHOICES = [
        ('planted', 'Planted'),
        # ('growing', 'Growing'),
        # ('mature', 'Mature'),
        ('harvested', 'Harvested'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    seed = models.ForeignKey(Seed, related_name='plants', on_delete=models.CASCADE)
    date_planted = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=PLANT_STATUS_CHOICES, default='planted')

    def __str__(self):
        return f"{self.user.username}'s {self.seed.name} - ({self.status})"
