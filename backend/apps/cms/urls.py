from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CMSViewSet

router = DefaultRouter()
router.register(r'', CMSViewSet, basename='cms')

urlpatterns = [
    path('', include(router.urls)),
]
