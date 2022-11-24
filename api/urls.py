from django.urls import path
from . import views

urlpatterns= [
    path("", views.Routes.as_view(), name="routes"),
    path("notes/", views.Notes.as_view(), name="get-notes and create-note"),
    # path("notes/", views.Notes.as_view(), name="create-note"),
    path("notes/<str:pk>/", views.SingleNote.as_view(), name="get-note, create-note and update-note"),
    # path("notes/<str:pk>/", views.deleteNote, name="delete-note"),
    # path("notes/<str:pk>/", views.getNote, name="note")
]