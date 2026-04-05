export function AjiMeaningStrip() {
  const pillars = [
    { letter: 'A', name: 'Amanah', desc: 'Integritas & Kepercayaan' },
    { letter: 'J', name: 'Jñāna', desc: 'Ilmiah & Analitis' },
    { letter: 'I', name: 'Insani', desc: 'Humanis & Empatik' },
  ];

  return (
    <section className="bg-[#162058] py-8 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-0">
          {pillars.map((p, i) => (
            <div key={p.letter} className="flex items-center">
              {/* Pillar item */}
              <div className="flex items-center gap-3 px-6 sm:px-10 py-3">
                <span className="text-4xl font-black text-[#F0A500] leading-none w-10 text-center shrink-0">
                  {p.letter}
                </span>
                <div>
                  <p className="text-white font-bold text-base leading-tight">{p.name}</p>
                  <p className="text-white/50 text-xs">{p.desc}</p>
                </div>
              </div>
              {/* Divider — tidak tampil setelah elemen terakhir */}
              {i < pillars.length - 1 && (
                <div className="hidden sm:block w-px h-10 bg-white/20 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
