from .models import Seed
import random

def get_random_seed():
    drop_rates = {
        'Common': 0.45,
        'Uncommon': 0.30,
        'Rare': 0.15,
        'Epic': 0.10,
    }

    # Generate a random number between 0 and 1
    # The logic is , 0 to 0.45 would be the biggest range, folloing by 0.45 to 0.75, then 0.75 to 0.90, then 0.90 to 1
    rand = random.random()
    cumulative = 0.0

    seeds = Seed.objects.all().order_by('-rarity')  

    for seed in seeds:
        cumulative += drop_rates[seed.rarity]
        if rand < cumulative:
            return seed

    return seeds.first()
