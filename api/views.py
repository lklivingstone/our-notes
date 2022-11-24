from django.shortcuts import render
from rest_framework.response import Response
from .models import Note
from rest_framework.decorators import api_view
from .serializers import NoteSerializer
from rest_framework.views import APIView
from rest_framework import status


# Create your views here.



# -------------------------------------
#          FUNCTION BASED VIEWS
# -------------------------------------

@api_view(["GET"])
def getRoutes(request):

    routes= [
        {
            "Endpoint": "/notes/",
            "method": "GET",
            "body": None,
            "description": "Returns an array of notes"
        },
        {
            "Endpoint": "/notes/id/",
            "method": "GET",
            "body": None,
            "description": "Returns a single note object"
        },
        {
            "Endpoint": "/notes/create/",
            "method": "POST",
            "body": {"body": ""},
            "description": "Creates a new note with data sent in the post request"
        },
        {
            "Endpoint": "/notes/id/update/",
            "method": "PUT",
            "body": {"body": ""},
            "description": "Creates an existing note with data sent in the post request"
        },
        {
            "Endpoint": "/notes/id/delete/",
            "method": "DELETE",
            "body": None,
            "description": "Deletes an existing note"
        },
    ]

    return Response(routes)

@api_view(["GET"])
def getNotes(request):
    notes= Note.objects.all().order_by("-updated")
    notes= NoteSerializer(notes, many=True)
    return Response(notes.data)

@api_view(["GET"])
def getNote(request, pk):
    note= Note.objects.get(id=pk)
    note= NoteSerializer(note, many=False)
    return Response(note.data)

@api_view(["PUT"])
def updateNote(request, pk):
    data= request.data
    note= Note.objects.get(id=pk)
    note= NoteSerializer(instance=note, data=data)

    if note.is_valid():
        note.save()

    return Response(note.data)

@api_view(["DELETE"])
def deleteNote(request, pk):
    note= Note.objects.get(id=pk)
    note.delete()
    
    return Response("Note was deleted")

@api_view(["POST"])
def createNote(request) :

    data= request.data

    note= Note.objects.create(
        body= data["body"]
    )

    note= NoteSerializer(note, many=False)

    return Response(note.data)


# -------------------------------------
#           CLASS BASED VIEWS
# -------------------------------------



class Routes(APIView):
    def get(self, request):
        routes= [
            {
                "Endpoint": "/notes/",
                "method": "GET",
                "body": None,
                "description": "Returns an array of notes"
            },
            {
                "Endpoint": "/notes/id/",
                "method": "GET",
                "body": None,
                "description": "Returns a single note object"
            },
            {
                "Endpoint": "/notes/create/",
                "method": "POST",
                "body": {"body": ""},
                "description": "Creates a new note with data sent in the post request"
            },
            {
                "Endpoint": "/notes/id/update/",
                "method": "PUT",
                "body": {"body": ""},
                "description": "Creates an existing note with data sent in the post request"
            },
            {
                "Endpoint": "/notes/id/delete/",
                "method": "DELETE",
                "body": None,
                "description": "Deletes an existing note"
            },
        ]

        return Response(routes)

class Notes(APIView):
    def get(self, request):
        notes= Note.objects.all().order_by("-updated")
        notes= NoteSerializer(notes, many=True)
        return Response(notes.data)

    def post(self, request):
        data= request.data
        note= Note.objects.create(
            body= data["body"]
        )
        note= NoteSerializer(note, many=False)
        return Response(note.data)

class SingleNote(APIView):
    def getByPK(self, pk):
        try:
            return Note.objects.get(id=pk)
        except:
            return Response({
                "error": "Note does not exist"
            }, status= status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        note= self.getByPK(pk)
        note= NoteSerializer(note, many=False)
        return Response(note.data)

    def put(self, request, pk):
        data= request.data
        note= self.getByPK(pk)
        note= NoteSerializer(instance=note, data=data)

        if note.is_valid():
            note.save()

        return Response(note.data)
    
    def post(self, request):
        data= request.data

        note= Note.objects.create(
            body= data["body"]
        )

        note= NoteSerializer(note, many=False)

        return Response(note.data)

    def delete(self, request, pk):
        note= self.getByPK(pk)
        note.delete()
    
        return Response("Note was deleted")
