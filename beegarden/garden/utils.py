from django.contrib.auth.models import User
from .models import Seed, UserGarden, SeedInventory
import random

def award_seeds_to_user(user):
    seed_type = "Example Seed"
    quantity = 1

    # Retrieve the seed object
    seed = Seed.objects.get(name=seed_type)

    # Check if the seed already exists in the user's inventory
    existing_seed = SeedInventory.objects.filter(user=user, seed=seed).first()
    if existing_seed:
        # If the seed exists, increment its quantity
        existing_seed.quantity += quantity
        existing_seed.save()
    else:
        # If the seed doesn't exist, create a new SeedInventory object
        SeedInventory.objects.create(user=user, seed=seed, quantity=quantity)



# Seed randomization will be implemented in the 2nd sprint