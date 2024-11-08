from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlbumViewSet, ArtistViewSet, SongViewSet, CommentViewSet
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

# Initialisation du routeur DRF
router = DefaultRouter()
router.register(r'albums', AlbumViewSet)
router.register(r'artists', ArtistViewSet)
router.register(r'songs', SongViewSet)
router.register(r'comments', CommentViewSet)

# Définition des URL
urlpatterns = [
    path('admin/', admin.site.urls),  # Accès à l'interface d'administration
    path('api/', include(router.urls)),  # Inclure toutes les routes définies par le routeur
]

if settings.DEBUG:  # Assurez-vous que cela ne s'applique qu'en mode développement
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
