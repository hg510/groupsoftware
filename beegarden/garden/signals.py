from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Approval  # Have to change name based on the actual admin approval in habit tracker
from .utils import award_seed

@receiver(post_save, sender=Approval)
def handle_approval(sender, instance, created, **kwargs):
    """
    Signal receiver that responds to the saving of an Approval instance.
    If an Approval instance is created and marked as approved, it awards a seed to the user.
    """
    if created and instance.is_approved:  # Assuming 'is_approved' is a field on approval model
        award_seed(instance.user_id)  # Need to make sure 'user_id' is accessible or adjust according to your model
