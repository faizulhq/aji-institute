from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProgramListView.as_view(), name='program-list'),
    path('<slug:slug>/', views.ProgramDetailView.as_view(), name='program-detail'),
    path('testimonials/all/', views.TestimonialListView.as_view(), name='testimonials'),
]
