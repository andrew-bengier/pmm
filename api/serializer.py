from rest_framework import serializers
from .models import SyncService


class SyncServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SyncService
        fields = "__all__"
