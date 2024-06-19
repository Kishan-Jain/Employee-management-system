from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from .forms import LoginForm, RegisterForm
from django.contrib import messages

# Create your views here.

def homepage(request):
    if not request.user.is_authenticated:
        if request.method == 'POST':
            fm = LoginForm(request = request, data=request.POST)
            if fm.is_valid():
                uname = fm.cleaned_data['username']
                upass = fm.cleaned_data['password']
                user = authenticate(username = uname, password = upass)
                if user is not None:
                    login(request, user)
                return redirect('/employee/')   
        else:
            fm = LoginForm()
        return render(request, 'homepage.html', {'authlogin' : fm})
    
    else:
        return redirect('/employee/')
        
    
def register(request):
    if request.method == 'POST':
        registerformdata = RegisterForm(request.POST)
        
        if registerformdata.is_valid():
            registerformdata.save()
            messages.success(request, 'User register successfully')
            
            
    else:
        registerformdata = RegisterForm()
    return render(request, 'register.html', {'regformdata' : registerformdata})

def logoutpage(request):
    logout(request)
    return redirect("/")