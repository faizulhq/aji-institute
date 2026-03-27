from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'name', 'phone', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('email', 'name', 'phone')
    ordering = ('-date_joined',)
    
    # Kustomisasi form edit user
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Informasi Pribadi', {'fields': ('name', 'phone', 'avatar')}),
        ('Hak Akses AjiStat', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser')}),
        ('Izin Tambahan', {'fields': ('groups', 'user_permissions'), 'classes': ('collapse',)}),
        ('Metadata', {'fields': ('last_login', 'date_joined'), 'classes': ('collapse',)}),
    )
    
    # Form untuk tambah user di admin
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password', 'role', 'is_staff')}
        ),
    )
