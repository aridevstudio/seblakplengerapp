import React, { useState } from 'react';
import { Store, TrendingUp, CheckCircle, Award, Users, MessageCircle, HelpCircle, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { FRANCHISE_PACKAGES } from '../data/menuData';

export const FranchiseBanner: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('booth-hemat');

  return (
    <section id="kemitraan" className="py-20 bg-stone-900 text-white relative overflow-hidden scroll-mt-20">
      {/* Background Glow Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Callout Box */}
        <div className="bg-gradient-to-r from-[#C8102E] via-[#8B0000] to-stone-950 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl border border-red-500/30 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Store className="w-3.5 h-3.5" />
                <span>Peluang Bisnis Kuliner Gurih & Autentik</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Ingin Buka Usaha Seblak Preanger di Kotamu?
              </h2>

              <p className="text-stone-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                Bergabunglah dengan jaringan kemitraan Seblak Preanger Official! Sistem kemitraan transparan tanpa bagi hasil berbelit, margin profit tinggi hingga 60%, dan supply bumbu rempah merah terpusat berstandar rasa otentik.
              </p>

              {/* Highlights row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                  <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>BEP Cepat (3 - 5 Bulan)</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Brand Terkenal</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>SOP & Training Lengkap</span>
                </div>
              </div>
            </div>

            {/* Right Action Call */}
            <div className="lg:col-span-4 flex flex-col items-stretch lg:items-end justify-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center w-full max-w-sm space-y-4">
                <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                  Slot Mitra Terbatas Tiap Kota
                </div>
                <div className="text-2xl font-black text-white">
                  Konsultasi Gratis Sekarang
                </div>
                <p className="text-xs text-stone-300">
                  Dapatkan proposal analisa modal, estimasi omset harian, dan ketersediaan titik kota Anda.
                </p>

                <a
                  href="https://wa.me/6281222445588?text=Halo%20Tim%20Kemitraan%20Seblak%20Preanger%20Official,%20saya%20tertarik%20membuka%20usaha%20kemitraan%20di%20kota%20saya.%20Mohon%20info%20paket%20dan%20proposalnya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-emerald-600 text-stone-950 font-black text-sm py-4 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-stone-950" />
                  <span>Hubungi Tim Kemitraan</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Package Comparison Options */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pilihan Paket Investasi Kemitraan
            </h3>
            <p className="text-stone-400 text-sm">
              Pilih model usaha yang paling sesuai dengan lokasi dan anggaran modal Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FRANCHISE_PACKAGES.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;

              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                    isSelected
                      ? 'bg-stone-800/90 border-[#C8102E] shadow-2xl ring-2 ring-[#C8102E]/40 scale-[1.02]'
                      : 'bg-stone-850/60 border-stone-800 hover:border-stone-700 hover:bg-stone-800/50'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      {pkg.badge ? (
                        <span className="bg-[#C8102E] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                          {pkg.badge}
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-stone-400">
                          Paket Usaha
                        </span>
                      )}

                      <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/20">
                        ROI: {pkg.roi}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2">{pkg.name}</h4>
                    <div className="text-3xl font-black text-amber-400 mb-4">{pkg.price}</div>
                    
                    <p className="text-xs text-stone-400 mb-6 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                      💡 Cocok untuk: <span className="text-stone-200">{pkg.bestFor}</span>
                    </p>

                    {/* Features List */}
                    <div className="space-y-2.5 text-xs text-stone-300 mb-8">
                      {pkg.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Inquire */}
                  <a
                    href={`https://wa.me/6281222445588?text=Halo%20Tim%20Kemitraan%20Seblak%20Preanger,%20saya%20tertarik%20dengan%20${encodeURIComponent(pkg.name)}%20(${pkg.price}).%20Bisa%20kirimkan%20katalog%20dan%20proposalnya?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 font-bold text-xs py-3 px-4 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-[#C8102E] hover:bg-[#8B0000] text-white shadow-lg'
                        : 'bg-stone-750 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    <span>Pilih {pkg.name.split(' ')[0]}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
