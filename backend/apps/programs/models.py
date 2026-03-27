from django.db import models
import json


class Program(models.Model):
    TYPE_CHOICES = [
        ('bootcamp', 'Bootcamp'),
        ('short-class', 'Short Class'),
        ('private-class', 'Private Class'),
    ]
    STATUS_CHOICES = [
        ('upcoming', 'Akan Dilaksanakan'),
        ('ongoing', 'Sedang Berlangsung'),
        ('recorded', 'Rekaman Tersedia'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=0)
    original_price = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')

    # JSON fields stored as text
    tags = models.JSONField(default=list)
    curriculum = models.JSONField(default=list)

    # Facilitator
    facilitator_name = models.CharField(max_length=100, blank=True)
    facilitator_title = models.CharField(max_length=200, blank=True)
    facilitator_bio = models.TextField(blank=True)
    facilitator_avatar = models.CharField(max_length=10, blank=True)  # initials

    # Media
    demo_video_url = models.URLField(blank=True)  # YouTube embed URL
    thumbnail_color = models.CharField(max_length=7, default='#162660')  # hex color for placeholder

    # Meta
    duration = models.CharField(max_length=50, blank=True)
    schedule = models.CharField(max_length=100, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_featured', '-created_at']

    def __str__(self):
        return f"[{self.type.upper()}] {self.title}"


class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=150)
    program = models.ForeignKey(Program, null=True, blank=True, on_delete=models.SET_NULL, related_name='testimonials')
    program_name = models.CharField(max_length=200, blank=True)  # fallback if no FK
    rating = models.PositiveSmallIntegerField(default=5)
    comment = models.TextField()
    avatar = models.CharField(max_length=10, blank=True)

    def save(self, *args, **kwargs):
        if not self.avatar and self.name:
            parts = self.name.strip().split()
            self.avatar = (parts[0][0] + (parts[1][0] if len(parts) > 1 else '')).upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} — ⭐{self.rating}"
