from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from django.db.models import Q
from .models import Program, Testimonial
from .serializers import ProgramListSerializer, ProgramDetailSerializer, TestimonialSerializer


class ProgramListView(APIView):
    """
    GET /api/programs/
    Query params: type, search, featured
    Rate-limited: 100 req/jam per IP anonim.
    """
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle]

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
    """GET /api/programs/<slug>/"""
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle]

    def get(self, request, slug):
        try:
            program = Program.objects.get(slug=slug)
        except Program.DoesNotExist:
            return Response({'error': 'Program tidak ditemukan.'}, status=404)
        return Response(ProgramDetailSerializer(program).data)


class ProgramSlugListView(APIView):
    """
    GET /api/programs/slugs/
    Hanya mengembalikan daftar slug semua program.
    Digunakan oleh Next.js generateStaticParams() saat npm run build.
    Sangat ringan — tidak perlu autentikasi.
    """
    permission_classes = [AllowAny]
    # Tidak di-throttle: hanya dipanggil saat build, bukan oleh user biasa

    def get(self, request):
        slugs = list(Program.objects.values_list('slug', flat=True))
        return Response({'count': len(slugs), 'slugs': slugs})


class TestimonialListView(APIView):
    """GET /api/programs/testimonials/all/"""
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle]

    def get(self, request):
        qs = Testimonial.objects.all()[:10]
        return Response({'data': TestimonialSerializer(qs, many=True).data})
