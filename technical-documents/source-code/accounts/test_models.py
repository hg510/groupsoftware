# Author: Pawarisa Saiyut

from django.test import TestCase
from .models import CustomUser, Garden, Bee

class CustomUserModelTestCase(TestCase):
    def test_user_creation(self):
        user = CustomUser.objects.create(username='testuser', email='test@example.com')
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')

class GardenModelTestCase(TestCase):
    def test_garden_creation(self):
        user = CustomUser.objects.create(username='testuser', email='test@example.com')
        garden = Garden.objects.create(user=user)
        self.assertEqual(garden.user, user)

class BeeModelTestCase(TestCase):
    def test_bee_creation(self):
        user = CustomUser.objects.create(username='testuser', email='test@example.com')
        bee = Bee.objects.create(user=user)
        self.assertEqual(bee.user, user)