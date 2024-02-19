from .models import CustomUser

def get_leaderboard():
    # Get the leaderboard that display the user's score from top to bottom (Ex. Rank one is the player with highest score)
    leaderboard = CustomUser.objects.order_by('-score')
    return leaderboard

def update_leaderboard():
    users = CustomUser.objects.all()
    for user in users:
        user.score = user.garden.score
        user.save()

    leaderboard = get_leaderboard()
    return leaderboard

def get_user_rank(user):
    leaderboard = get_leaderboard()
    user_position = list(leaderboard).index(user) + 1
    return user_position



