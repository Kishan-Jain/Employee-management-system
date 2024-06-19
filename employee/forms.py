from django.forms import forms
from django import forms
from .models import EmployeeList

class AddEmployee(forms.ModelForm):
    
    class Meta:
        model = EmployeeList 
        fields = '__all__'
        

