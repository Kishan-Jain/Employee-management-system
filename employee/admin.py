from django.contrib import admin
from .models import EmployeeList
# Register your models here.

@admin.register(EmployeeList)
class EmployeeListAdmin(admin.ModelAdmin):
    list_display = ['id', 'unique_id', 'full_name', 'mail_id', 'dipartment', 'field', 'branch']