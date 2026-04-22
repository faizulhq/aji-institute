from django.contrib import admin
from .models import CompanyConfig, TeamMember, HeroBanner, Testimonial, ToolLogo

@admin.register(CompanyConfig)
class CompanyConfigAdmin(admin.ModelAdmin):
    list_display = ['whatsapp', 'email', 'instagram']

    def has_add_permission(self, request):
        # Mencegah penambahan lebih dari 1 konfigurasi (Singleton)
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'is_ceo', 'order']
    list_editable = ['order', 'is_ceo']
    list_filter = ['is_ceo']
    search_fields = ['name', 'role', 'tags']

@admin.register(HeroBanner)
class HeroBannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'badge_text', 'is_active', 'order']
    list_editable = ['is_active', 'order']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'rating', 'is_featured', 'order']
    list_editable = ['is_featured', 'order']
    list_filter = ['rating', 'is_featured']

@admin.register(ToolLogo)
class ToolLogoAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    list_editable = ['order']
