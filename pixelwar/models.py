# from django.conf import settings
# from django.db import models


# class Pixel(models.Model):
#     x = models.IntegerField()
#     y = models.IntegerField()
#     color = models.PositiveSmallIntegerField()  # Color in a palette

#     creation_time = models.DateTimeField(auto_now_add=True)
#     update_time = models.DateTimeField(auto_now=True)

#     class Meta:
#         unique_together = ("x", "y")

#     def __str__(self):
#         return f"Pixel at ({self.x}, {self.y}) with color {self.color}"


# class PixelHistory(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     x = models.IntegerField()
#     y = models.IntegerField()
#     color = models.PositiveSmallIntegerField()  # Color in a palette

#     creation_time = models.DateTimeField(auto_now_add=True)
