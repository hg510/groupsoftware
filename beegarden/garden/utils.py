# from django.contrib.auth.models import User
# from .models import Seed, UserGarden, SeedInventory
# import random


# def get_random_seed():
#     drop_rates = {
#         'Common': 0.45,
#         'Uncommon': 0.30,
#         'Rare': 0.15,
#         'Epic': 0.10,
#     }
#     # Generate a random number between 0 and 1
#     # The logic is , 0 to 0.45 would be the biggest range, folloing by 0.45 to 0.75, then 0.75 to 0.90, then 0.90 to 1
#     rand = random.random()
#     cumulative = 0.0
#     seeds = Seed.objects.all().order_by('-rarity')
#     for seed in seeds:
#         cumulative += drop_rates[seed.rarity]
#         if rand < cumulative:
#             return seed
#     return seeds.first()

# def award_seed(user_id):
#     user = User.objects.get(id=user_id)  
#     random_seed = get_random_seed()

#     # If that seed is not exist in the user's inventory, create it with quantity 1
#     # If already exist (not created), increment the quantity by 1
#     user_seed, created = SeedInventory.objects.get_or_create(
#         user=user, 
#         seed=random_seed,
#         defaults={'quantity': 1}  
#     )
#     if not created:
#         user_seed.quantity += 1
#         user_seed.save()

#     return user_seed


# def plant_seed(user_id, seed_id):
#     # Find the oldest (first awarded) SeedInventory item for this seed type
#     user_seed = SeedInventory.objects.filter(
#         user_id=user_id, 
#         seed_id=seed_id
#     ).order_by('id').first()  # Assumes that a lower ID means older due to auto-increment

#     if user_seed:
#         # Create a UserGarden record to represent the planted seed
#         UserGarden.objects.create(user_id=user_id, seed_id=seed_id, status='planted')

#         # Update or delete the SeedInventory record
#         if user_seed.quantity > 1:
#             user_seed.quantity -= 1
#             user_seed.save()
#         else:
#             user_seed.delete()

#         return True
#     else:
#         # Handle the case where the user tries to plant a seed they don't have (unlikely to happen, but just in case)
#         return False


# # Simpler past version
# # def get_random_seed():
# #     drop_rates = {
# #         'Common': 0.45,
# #         'Uncommon': 0.30,
# #         'Rare': 0.15,
# #         'Epic': 0.10,
# #     }


# #     rand = random.random()
# #     cumulative = 0.0

# #     seeds = Seed.objects.all().order_by('-rarity')  

# #     for seed in seeds:
# #         cumulative += drop_rates[seed.rarity]
# #         if rand < cumulative:
# #             return seed

# #     return seeds.first()