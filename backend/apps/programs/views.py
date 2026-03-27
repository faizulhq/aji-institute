from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Q
from .models import Program, Testimonial
from .serializers import ProgramListSerializer, ProgramDetailSerializer, TestimonialSerializer


class ProgramListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        qs = Program.objects.all()

        ptype = request.query_params.get('type')
        if ptype:
            qs = qs.filter(type=ptype)

        search = request.query_params.get('search', '').strip()
        if search:
            qs = qs.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(facilitator_name__icontains=search)
            )

        featured = request.query_params.get('featured')
        if featured == 'true':
            qs = qs.filter(is_featured=True)

        serializer = ProgramListSerializer(qs, many=True)
        return Response({'total': qs.count(), 'data': serializer.data})


class ProgramDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        try:
            program = Program.objects.get(slug=slug)
        except Program.DoesNotExist:
            return Response({'error': 'Program tidak ditemukan.'}, status=404)
        return Response(ProgramDetailSerializer(program).data)


class TestimonialListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        qs = Testimonial.objects.all()[:10]
        return Response({'data': TestimonialSerializer(qs, many=True).data})
