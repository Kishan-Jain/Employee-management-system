from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UsernameField
from django.core import validators


class LoginForm(AuthenticationForm):
    username = UsernameField(label="UserId", widget=forms.TextInput(attrs={'placeholder': 'Enter UserId', 'class': 'form-control col-md-11'}))
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Enter password', 'class': 'form-control col-md-11'}),
    )
 
 
class RegisterForm(UserCreationForm):
    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Enter password', 'class': 'form-control col-md-11'}),
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Enter password(again)', 'class': 'form-control col-md-11'}),
    )
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']
        widgets = {
            'username' : forms.TextInput(attrs={'placeholder' : 'Enter UserId', 'class': 'form-control col-md-11'}),
            'first_name' : forms.TextInput(attrs = {'placeholder' : 'Enter first name', 'class': 'form-control col-md-11'}),
            'last_name' : forms.TextInput(attrs = {'placeholder' : 'Enter last name', 'class': 'form-control col-md-11'}),
            'email' : forms.EmailInput(attrs={'placeholder': 'Enter Email Address', 'class': 'form-control col-md-11'})
        }
        
        validators = {
            
            'username' : [validators.ProhibitNullCharactersValidator, ]
        }
        
        def clean_first_name(self):
            data = self.cleaned_data["first_name"]
            if len(data) < 4:
                raise forms.ValidationError('name not blank')
            return data
        
        
        
        # def clean(self):
        #     clened_data = super().clean()
            
        #     valfname = self.clened_data['first_name']
        #     vallname = self.clened_data['last_name']
            
        #     if len(valfname) == 0:
        #         raise forms.ValidationError('first name should not blank')
        #     if len(valfname) < 4:
        #         raise forms.ValidationError('first name very small')
        #     if len(valfname) > 50:
        #         raise forms.ValidationError('first name very big')
        #     if not valfname.isalpha():
        #         raise forms.ValidationError('name no allow number')
            
        #     if len(vallname) == 0:
        #         raise forms.ValidationError('last name should not blank')  
        #     if len(vallname) < 4:
        #         raise forms.ValidationError('last name very small')
        #     if len(vallname) > 50:
        #         raise forms.ValidationError('last name very big')
        #     if not vallname.isalpha():
        #         raise forms.ValidationError('name no allow number')
            
       
        
              
