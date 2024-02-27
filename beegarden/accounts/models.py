# # The previous models.py has the merge conflict when I pull the latest branch

# from django.db import models
# from django.contrib.auth.models import AbstractUser

# # There could be more classes and fields needed (or they could be more flexible/detailed)
# # This is based on the game logic we know so far

# class CustomUser(AbstractUser):
#     # AbstractUser already include username, password, email, first_name, last_name
#     # Will extend player user and admin user in the future
#     user_id = models.CharField(max_length=7, unique=True, primary_key=True)
#     score = models.IntegerField(default=0)

#     def save(self, *args, **kwargs):
#         if self.is_superuser:
#             self.user_id = 'ad' + self.id.zfill(5)
#         else:
#             self.user_id = 'pl' + self.id.zfill(5)
#         super(CustomUser, self).save(*args, **kwargs)

#     def __str__(self):
#         return self.username

# class Garden(models.Model):
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.user.username + "'s garden"

# class Bee(models.Model):
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
#     health = models.IntegerField(default=100)
#     pollen = models.IntegerField(default=0)

#     def __str__(self):
#         return self.user.username + "'s bee"

# class Seed(models.Model):
#     name = models.CharField(max_length=50)
#     # Give 4 level of rrarity, define by nummer 1 to 4. 4 being the rarest
#     rarity = models.IntegerField()

#     def __str__(self):
#         return self.name


# class Inventory(models.Model):
#     # Dynamic field appraoch may not be suitable if the number of items increase. Plus, it slows down the system
#     # So, I use the many-to-many relationship instead. In this, the InventoryItem class will serve as an intermediary table
#     player = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     seed = models.ForeignKey(Seed, on_delete=models.CASCADE)
#     item = models.ForeignKey('Item', on_delete=models.CASCADE)
#     quantity = models.IntegerField(default=0)

#     # seed1_quantity = models.IntegerField(default=0)
#     # item1_quantity = models.IntegerField(default=0)

#     def __str__(self):
#         if self.seed:
#             return f"{self.player.username} + {self.seed.name} inventory"
#         elif self.item:
#             return f"{self.player.username} + {self.item.name} inventory"