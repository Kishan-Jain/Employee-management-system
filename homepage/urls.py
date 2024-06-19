
from django.urls import path, include
from homepage.views import homepage, register, logoutpage
from employee.views import employee, add_employee

urlpatterns = [

    path('employee/', include('employee.urls')),
    path('', homepage, name='homepage'),
    path('register/', register, name='register'),
    path('employee/', employee, name='employee'),
    path('addemployee/', add_employee, name= "addEmployee" ),
    path('logout/', logoutpage, name='logout'),
    

]
