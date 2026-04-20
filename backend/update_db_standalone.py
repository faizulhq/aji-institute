import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.programs.models import Program

programs = Program.objects.all()
changed = 0
brand_mapping = {
    'ajipr': 'ajicomm',
    'ajidigi': 'ajiai',
    'ajilangua': 'ajilingua',
}

for p in programs:
    dirty = False
    if p.brand in brand_mapping:
        p.brand = brand_mapping[p.brand]
        dirty = True
    new_tags = []
    for t in p.tags:
        nt = t.replace('ajipr', 'ajicomm').replace('ajidigi', 'ajiai').replace('ajilangua', 'ajilingua')
        nt = nt.replace('AjiPR', 'AjiComm').replace('AjiDigi', 'AjiAI').replace('AjiLangua', 'AjiLingua')
        new_tags.append(nt)
    if p.tags != new_tags:
        p.tags = new_tags
        dirty = True
    if dirty:
        p.save()
        changed += 1

print(f"Updated {changed} programs.")
