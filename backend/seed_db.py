import os
import sys
import json
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.programs.models import Program

def load_programs():
    data_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'programs.json')
    
    if not os.path.exists(data_path):
        print(f"File {data_path} tidak ditemukan!")
        return

    with open(data_path, 'r', encoding='utf-8') as f:
        programs_data = json.load(f)

    created_count = 0
    updated_count = 0
    slugs_in_json = [item['slug'] for item in programs_data]

    # Hapus data lama yang tidak ada di JSON lagi
    deleted_count, _ = Program.objects.exclude(slug__in=slugs_in_json).delete()

    for item in programs_data:
        # Menangani nilai fallback jika field tidak ada
        program, created = Program.objects.update_or_create(
            slug=item['slug'],
            defaults={
                'title': item['title'],
                'type': item['type'],
                'description': item['description'],
                'price': item['price'],
                'original_price': item.get('originalPrice'),
                'status': item.get('status', 'upcoming'),
                'tags': item.get('tags', []),
                'curriculum': item.get('curriculum', []),
                'facilitator_name': item.get('facilitator', ''),
                'facilitator_bio': item.get('facilitatorBio', ''),
                'duration': item.get('duration', ''),
                'is_featured': item.get('is_featured', False),
            }
        )
        if created:
            created_count += 1
        else:
            updated_count += 1

    print(f"Selesai! {created_count} program baru, {updated_count} diperbarui. {deleted_count} program lama telah dihapus.")

if __name__ == '__main__':
    load_programs()
