from rest_framework import viewsets
from django.shortcuts import render
from .models import Album, Artist, Song, Comment
from .serializers import AlbumSerializer, ArtistSerializer, SongSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

# ViewSet pour les Albums
class AlbumViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les albums. Permet les opérations CRUD (Create, Read, Update, Delete).
    """
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

# ViewSet pour les Artistes
class ArtistViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les artistes. Permet les opérations CRUD (Create, Read, Update, Delete).
    """
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

# ViewSet pour les Chansons
class SongViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les chansons. Permet les opérations CRUD (Create, Read, Update, Delete).
    """
    queryset = Song.objects.all()
    serializer_class = SongSerializer

# ViewSet pour les Commentaires (API)
class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les commentaires. Permet les opérations CRUD (Create, Read, Update, Delete).
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

# Vue pour afficher les commentaires dans une page HTML
def comment_list(request):
    """
    Vue pour afficher les commentaires d'une chanson spécifique sur une page HTML.
    """
    # Optionnel : Si tu veux filtrer par chanson spécifique, tu peux le faire avec un paramètre dans l'URL.
    song_id = request.GET.get('song_id', None)  # Par exemple, song_id=1 pour filtrer par chanson

    if song_id:
        # Si un ID de chanson est passé, récupère les commentaires de cette chanson
        comments = Comment.objects.filter(song_id=song_id)
    else:
        # Sinon, récupère tous les commentaires
        comments = Comment.objects.all()

    # Passe les commentaires au template
    return render(request, 'comments/comment_list.html', {'comments': comments})
