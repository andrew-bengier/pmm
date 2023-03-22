from rest_framework import status
from rest_framework.generics import (ListCreateAPIView, RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from api import serializer
from api.models import SyncService


# Create your views here.
class SyncServiceApi(ListCreateAPIView):
    queryset = SyncService.objects.all()
    serializer_class = serializer.SyncServiceSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
                "status": status.HTTP_201_CREATED,
                "message": "Sync Service created.",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED,
            headers=headers)


class SyncServiceRetrieveUpdateDestroyApi(RetrieveUpdateDestroyAPIView):
    serializer_class = serializer.SyncServiceSerializer

    def get_queryset(self):
        return SyncService.objects.filter(id=self.kwargs.get('pk', None))

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        # headers = self.get_success_headers(serializer.data)
        return Response({
                "status": status.HTTP_200_OK,
                "message": "Sync Service updated.",
                "data": serializer.data
            },
            status=status.HTTP_200_OK)
            # headers=headers)
