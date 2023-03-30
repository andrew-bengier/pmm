from rest_framework import status
from rest_framework.generics import (ListCreateAPIView, RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from api import serializer
from api.models import SyncService

import logging
logger = logging.getLogger(__name__)

# Create your views here.
class SyncServiceApi(ListCreateAPIView):
    queryset = SyncService.objects.all()
    serializer_class = serializer.SyncServiceSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        logger.debug('Adding new syncservice')
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
    
    def list(self, request, *args, **kwargs):
        logger.debug('Retrieving all syncservices')
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SyncServiceRetrieveUpdateDestroyApi(RetrieveUpdateDestroyAPIView):
    serializer_class = serializer.SyncServiceSerializer

    def get_queryset(self):
        logger.debug('Retrieving syncservice: ' + self.kwargs.get('pk', None))
        return SyncService.objects.filter(id=self.kwargs.get('pk', None))

    def update(self, request, *args, **kwargs):
        logger.debug('Updating syncservice: ' + self.kwargs.get('pk', None))
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        headers = self.get_success_headers(serializer.data)
        return Response({
                "status": status.HTTP_200_OK,
                "message": "Sync Service updated.",
                "data": serializer.data
            },
            status=status.HTTP_200_OK,
            headers=headers)
