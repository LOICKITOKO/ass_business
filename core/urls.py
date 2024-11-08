from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlbumViewSet, ArtistViewSet, SongViewSet, CommentViewSet

# Initialisation du routeur DRF
router = DefaultRouter()
router.register(r'albums', AlbumViewSet)
router.register(r'artists', ArtistViewSet)
router.register(r'songs', SongViewSet)
router.register(r'comments', CommentViewSet)

# Définition des URL
urlpatterns = [
    path('api/', include(router.urls)),  # Inclure toutes les routes définies par le routeur
]
