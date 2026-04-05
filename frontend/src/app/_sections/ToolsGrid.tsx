'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useState } from 'react';
import { TOOLS, WA_LINK } from '@/lib/config';

type ToolType = typeof TOOLS[0];

function ToolModal({ tool, onClose }: { tool: ToolType; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-10"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center shadow-lg bg-white border border-gray-100">
            {tool.logo ? (
              <Image src={tool.logo} alt={tool.name} width={48} height={48} className="object-contain p-1" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-black text-lg"
                style={{ backgroundColor: tool.color }}>
                {tool.name.slice(0, 2)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900">{tool.name}</h3>
            <span className="text-xs font-semibold bg-[#1B3A8C]/10 text-[#1B3A8C] px-2 py-0.5 rounded-full">
              Tersedia di AjiStat
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{tool.desc}</p>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Digunakan untuk:</p>
          <p className="text-gray-700 text-sm">{tool.useFor}</p>
        </div>
        <a href={WA_LINK(`Halo, saya ingin belajar ${tool.name} di AjiStat`)}
          target="_blank" rel="noopener noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#1B3A8C] hover:bg-[#2348A8] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          Tanya Kelas {tool.name}
        </a>
      </div>
    </div>
  );
}

export function ToolsGrid() {
  const [activeTool, setActiveTool] = useState<ToolType | null>(null);

  return (
    <section id="blog" className="py-16 bg-gray-50 border-y border-gray-100 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Tools &amp; Software yang Kami Kuasai
          </p>
          <p className="text-gray-500 text-xs">Klik logo untuk informasi lebih lanjut</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {TOOLS.map((tool) => (
            <button
              key={tool.name}
              onClick={() => setActiveTool(tool)}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              title={`Klik untuk info tentang ${tool.name}`}
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center shadow-md group-hover:scale-110 transition-all bg-white border border-gray-100">
                {tool.logo ? (
                  <Image src={tool.logo} alt={tool.name} width={48} height={48} className="object-contain p-1" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-black text-sm"
                    style={{ backgroundColor: tool.color }}>
                    {tool.name.length <= 4 ? tool.name : tool.name.slice(0, 3)}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gray-800 font-medium transition-colors">{tool.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeTool && <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />}
    </section>
  );
}
