from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    """
    La permission permet à un utilisateur de modifier un objet s'il est le propriétaire, sinon il peut seulement le lire.
    """

    def has_object_permission(self, request, view, obj):
        # Les permissions de lecture sont toujours accordées
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # Vérifier si l'utilisateur est le propriétaire de l'objet
        return obj.user_name == request.user.username
