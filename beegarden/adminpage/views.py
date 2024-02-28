from django.utils import timezone
from django.shortcuts import render, redirect
from .models import Request, Response

def adminPage(request):
    user = request.user

    # Check if user is admin
    try:
        admin_request = Request.objects.get(user=user)
    except Request.DoesNotExist:
        admin_request = None

    if admin_request and admin_request.user.is_staff:
        today = timezone.now().date()
        form_submitted = Response.objects.filter(request=admin_request, date_created__date=today).exists()

        if request.method == 'POST':
            if form_submitted:
                return render(request, 'admin.html', {'form_submitted': True})

            request_id = request.POST.get('request_id')
            accepted = request.POST.get('accepted') == 'on'

            # Create Response object
            response = Response.objects.create(request_id=request_id, accepted=accepted)

            # Delete request
            delete_request(request_id)

        return render(request, 'admin.html', {'form_submitted': form_submitted})
    return render(request, 'home.html')

def delete_request(request_id):
    try:
        goal_request = Request.objects.get(id=request_id)
        goal_request.delete()
    except Request.DoesNotExist:
        pass  # Handle the case where the request does not exist gracefully



# from django.utils import timezone
# from django.shortcuts import render, redirect
# from .models import Request, Response

# def adminPage(request):
#     user = request.user

#     #Check if user is admin
#     admin = Request.objects.get(id=user)
#     if admin.is_admin:
#         today = timezone.now().date()
#         form_submitted = Response.objects.filter(user=user, date_created__date=today).exists()

#         if request.method == 'POST':
#             if form_submitted:
#                 return render(request, 'adminPage.html', {'form_submitted': True})

#             id = request.POST.get('id')
#             accepted = request.POST.get('accepted') == 'on'

#             # Create Response object
#             response = Response.objects.create(id=id, accepted=accepted)

#             # Delete request
#             delete_request(id)

#         return render(request, 'adminPage.html', {'form_submitted': form_submitted})
#     return render(request, 'home.html')

# def delete_request(id):
#     goalRequest = Request.objects.get(id=id)
#     goalRequest.delete()
