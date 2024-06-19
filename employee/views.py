from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, logout
from .models import EmployeeList
from .forms import AddEmployee
from django.contrib import messages




def handle_uploaded_file(f):  
    with open( f.name, 'wb+') as destination:  
        for chunk in f.chunks():  
            destination.write(chunk)   

# Create your views here.

def employee(request):
    if request.user.is_authenticated:
        emp_data = EmployeeList.objects.all()
        data = {'empData' : emp_data}  
        print(emp_data)
        return render(request, 'employee.html', data)
    else:
        return redirect("/")

def add_employee(request):
    
    if request.user.is_authenticated:
        if request.method == "POST":
            add_employee_form = AddEmployee(request.POST, request.FILES)
            if add_employee_form.is_valid():
                handle_uploaded_file(request.FILES["employee_pic"])
                add_employee_form.save()
                messages.success(request, 'Employee Added Successfully')
        
        else :
            add_employee_form = AddEmployee()
                
        return render(request, 'add_employee.html', {'formdata' : add_employee_form})
    else:
        return redirect("/")
    
    
    