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

from django.db import models
from django.contrib.auth.models import User

class Request(models.Model):
    goal = models.CharField(max_length=150)

    # Make the user field mandatory and rename it to user
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')

class Response(models.Model):
    accepted = models.BooleanField()

    # Add a field for date created
    date_created = models.DateTimeField(auto_now_add=True)

    # Make the id field mandatory and rename it to request
    request = models.ForeignKey(Request, on_delete=models.CASCADE, related_name='responses')
