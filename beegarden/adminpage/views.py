from django.utils import timezone
from django.shortcuts import render, redirect
from .models import Request, Response
from garden.models import Seed

def adminPage(request):
    user = request.user

    # Check if user is admin
    if user.is_staff:
        if request.method == 'POST':
            request_id = request.POST.get('request_id')
            accept = request.POST.get('accept') == '1'

            try:
                # Get the corresponding request object
                admin_request = Request.objects.get(id=request_id)

                # Create a response object
                response = Response.objects.create(request=admin_request, accepted=accept)

                # Award seeds if request is accepted and daily score is over 50
                if accept:
                    daily_score = calculate_daily_score(admin_request.user)
                    if daily_score >= 50:
                        award_seeds_to_user(admin_request.user)

                # Delete the request
                admin_request.delete()

                # Redirect to admin page
                return redirect('custom_admin')

            except Request.DoesNotExist:
                # Handle case where request does not exist
                return render(request, 'admin.html', {'error_message': 'Invalid request ID'})

        else:
            # Retrieve pending requests
            pending_requests = Request.objects.all()

            return render(request, 'admin.html', {'pending_requests': pending_requests})

    else:
        # If user is not admin, redirect to home page or show an error message
        return render(request, 'home.html', {'error_message': 'You are not authorized to access this page'})


def calculate_daily_score(user):
    today = timezone.now().date()
    habits = Habit.objects.filter(user=user, date_created__date=today)
    daily_score = sum([10 for habit in habits])

    return daily_score


def award_seeds_to_user(user):
    seed_type = "Example Seed"  # Specify the type of seed to award
    quantity = 1  # Specify the quantity of seeds to award
    seed = Seed.objects.create(user=user, type=seed_type, quantity=quantity)



