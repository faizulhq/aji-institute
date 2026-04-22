from rest_framework import serializers
from .models import CompanyConfig, TeamMember, HeroBanner, Testimonial, ToolLogo

class CompanyConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyConfig
        fields = '__all__'

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

class HeroBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroBanner
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class ToolLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolLogo
        fields = '__all__'
