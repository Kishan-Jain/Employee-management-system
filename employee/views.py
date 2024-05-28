from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, logout



# Create your views here.

def employee(request):
    if request.user.is_authenticated:    
        return render(request, 'employee.html')
    else:
        
        return redirect("/")

