from django.contrib import admin
from .models import Program, Testimonial


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'status', 'price', 'is_featured')
    list_filter = ('type', 'status', 'is_featured')
    search_fields = ('title', 'facilitator_name')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'rating')
