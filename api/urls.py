from django.urls import path
from . import views

urlpatterns = [
    path('api/syncservices/', views.SyncServiceApi.as_view() ),
    path('api/syncservices/<int:pk>', views.SyncServiceRetrieveUpdateDestroyApi.as_view()),
]