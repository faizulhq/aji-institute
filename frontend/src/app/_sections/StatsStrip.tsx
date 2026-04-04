import { Users, BookOpen, Award, Briefcase } from 'lucide-react';

const STATS = [
  { icon: Users, value: '500+', label: 'Alumni Terlatih' },
  { icon: BookOpen, value: '30+', label: 'Program Aktif' },
  { icon: Briefcase, value: '10+', label: 'Fasilitator Expert' },
  { icon: Award, value: '5', label: 'Divisi Program' },
];

export function StatsStrip() {
  return (
    <div className="bg-[#054E7A] border-b border-[#47C2EA]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-[#47C2EA]/20 rounded-xl flex items-center justify-center mb-1">
                <Icon className="w-5 h-5 text-[#47C2EA]" />
              </div>
              <p className="text-2xl font-black text-white">{value}</p>
              <p className="text-white/50 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
