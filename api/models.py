from django.db import models

# Create your models here.
class TimestampModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class SyncService(TimestampModel):
    name   = models.CharField(max_length=255, unique=True)
    url    = models.URLField(null=True)
    token  = models.TextField(null=True)
    active = models.BooleanField()

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.name
