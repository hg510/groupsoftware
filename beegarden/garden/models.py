# from django.db import models
# from django.contrib.auth.models import User
# class Seed(models.Model):
#     RARITY_CHOICES = [
#         ('common', 'Common'),
#         ('uncommon', 'Uncommon'),
#         ('rare', 'Rare'),
#         ('epic', 'Epic'),
#     ]

#     name = models.CharField(max_length=100)
#     rarity = models.CharField(max_length=10, choices=RARITY_CHOICES)
#     benefit_score = models.IntegerField(default=0, help_text='The rarer the seed is, the more beneficial it is for the bee. This will also result in higher score.')

#     def __str__(self):
#         return f"{self.name} ({self.rarity})"

# # Now, the idea is that we have a single seed icon and when the player drags it will give the seed in order of receiving
# # Like if player has 6 seeds so far and already plant the first 3, this time they will drag and drop and get the 4th seed
# # This is because I don't know if we have enough time for the front end inventory system to allow users with multiple seeds option out of what they own
# # class SeedInventory(models.Model):
# #     user = models.ForeignKey(User, on_delete=models.CASCADE)
# #     seed = models.ForeignKey(Seed, on_delete=models.CASCADE)
# #     quantity = models.IntegerField(default=0)

# #     def __str__(self):
# #         return f"{self.user.username} - {self.seed.name} x{self.quantity}"

# class SeedInventory(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seed_inventory')
#     seed = models.ForeignKey(Seed, on_delete=models.CASCADE, related_name='inventory_items')
#     # Each time a seed that the user have never own (or currently doesn't own a single one) is award, we add the new one
#     # starting with 1, then increment if the user get more of that seed in the future
#     quantity = models.IntegerField(default=1)  

#     def __str__(self):
#         return f"{self.user.username} - {self.seed.name} x{self.quantity}"

# class UserGarden(models.Model):
#     PLANT_STATUS_CHOICES = [
#         ('planted', 'Planted'),
#         # ('growing', 'Growing'),
#         # ('mature', 'Mature'),
#         ('harvested', 'Harvested'),
#     ]

#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     seed = models.ForeignKey(Seed, related_name='plants', on_delete=models.CASCADE)
#     date_planted = models.DateTimeField(auto_now_add=True)
#     status = models.CharField(max_length=10, choices=PLANT_STATUS_CHOICES, default='planted')

#     def __str__(self):
#         return f"{self.user.username}'s {self.seed.name} - ({self.status})"
