from django.test import TestCase
from .models import CustomUser
from .leaderboard import get_leaderboard, update_leaderboard, get_user_rank

class LeaderboardTestCase(TestCase):
    def setUp(self):
        # Create users with different scores
        self.user1 = CustomUser.objects.create(username='user1', email='user1@example.com', score=100)
        self.user2 = CustomUser.objects.create(username='user2', email='user2@example.com', score=200)
        self.user3 = CustomUser.objects.create(username='user3', email='user3@example.com', score=150)

    def test_get_leaderboard(self):
        # Test if the leaderboard ranks users correctly based on their scores
        leaderboard = get_leaderboard()
        self.assertEqual(len(leaderboard), 3)
        self.assertEqual(leaderboard[0], self.user2)  
        self.assertEqual(leaderboard[1], self.user3) 
        self.assertEqual(leaderboard[2], self.user1)  

    def test_get_user_rank(self):
        # Test if the user rank is calculated correctly
        user_rank = get_user_rank(self.user1)
        self.assertEqual(user_rank, 3)  # user1 should be ranked third

    def test_update_leaderboard(self):
        # Test if the update leaderboard function updates scores correctly
        self.user1.score = 300
        self.user1.save()
        updated_leaderboard = update_leaderboard()
        self.assertEqual(updated_leaderboard[0], self.user1)  # After updating score, user1 should be ranked first