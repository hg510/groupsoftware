# adminpage/models.py

from django.db import models
from django.contrib.auth.models import User
from habittracker.models import Habit  

class Request(models.Model):
    goal = models.CharField(max_length=150, verbose_name="Goal")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests', verbose_name="User")
    habit = models.ForeignKey(Habit, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Habit")  # Add this line

    class Meta:
        verbose_name = "Request"
        verbose_name_plural = "Requests"

class Response(models.Model):
    accepted = models.BooleanField(verbose_name="Accepted")
    date_created = models.DateTimeField(auto_now_add=True, verbose_name="Date Created")
    request = models.ForeignKey(Request, on_delete=models.CASCADE, related_name='responses', verbose_name="Request")

    class Meta:
        verbose_name = "Response"
        verbose_name_plural = "Responses"



# from django.db import models
# from django.contrib.auth.models import User

# class Request(models.Model):
#     goal = models.CharField(max_length=150)

#     # Make the user field mandatory
#     user_id = models.ForeignKey(User, on_delete=models.CASCADE)

# class Response(models.Model):
#     accepted = models.BooleanField()

#     # Add a field for date created
#     date_created = models.DateTimeField(auto_now_add=True)

#     # Make the id field mandatory
#     id = models.ForeignKey(Request, on_delete=models.CASCADE)

# from django.db import models
# from django.contrib.auth.models import User

# class Request(models.Model):
#     goal = models.CharField(max_length=150)

#     # Make the user field mandatory and rename it to user
#     user = models.ForeignKey(User, on_delete=models.CASCADE)

# class Response(models.Model):
#     accepted = models.BooleanField()

#     # Add a field for date created
#     date_created = models.DateTimeField(auto_now_add=True)

#     # Make the id field mandatory and rename it to request
#     request = models.ForeignKey(Request, on_delete=models.CASCADE)
