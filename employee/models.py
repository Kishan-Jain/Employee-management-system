from django.db import models
from tinymce.models import HTMLField

# Create your models here.

class EmployeeList(models.Model):
    unique_id = models.CharField(max_length=10, unique=True, blank=False)
    full_name = models.CharField(max_length=100)
    mail_id = models.EmailField()
    dipartment = models.CharField(max_length=100)
    field = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    employee_pic = models.FileField(upload_to="employee/pic", max_length= 250, null= True, default="")
    employee_details = HTMLField()
    