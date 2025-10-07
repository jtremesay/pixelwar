from django.urls import path

from . import views

app_name = "pixelwar"

urlpatterns = [
    path("", views.index, name="index"),
]
