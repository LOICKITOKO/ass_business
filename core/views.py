from rest_framework import viewsets
from .models import Album, Artist, Song, Comment
from .serializers import AlbumSerializer, ArtistSerializer, SongSerializer, CommentSerializer

# ViewSet pour les Albums
class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

# ViewSet pour les Artistes
class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

# ViewSet pour les Chansons
class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

# ViewSet pour les Commentaires
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
