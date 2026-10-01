import React from 'react';
import { Flame, Leaf, ShoppingBag, Sparkles, ArrowRight, ShieldCheck, Award, Heart } from 'lucide-react';

interface HeroProps {
  onCheckMenu: () => void;
  onOpenShopee: () => void;
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckMenu, onOpenShopee, onOpenOrderModal }) => {
  return (
    <section id="beranda" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Red & Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/seblak_hero_bg_1790701951623.jpg"
          alt="Seblak Preanger Bumbu Rempah Merah Otentik"
          className="w-full h-full object-cover object-center scale-105 transform animate-in fade-in zoom-in-95 duration-1000"
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1E1E]/95 via-[#1E1E1E]/80 to-[#8B0000]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-[#1E1E1E]/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#1E1E1E]/60 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Quality Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-[#2E7D32] animate-ping" />
              <Leaf className="w-4 h-4 text-[#2E7D32]" />
              <span className="text-white">Resep Asli Priangan Sejak 2018</span>
              <span className="text-white/40">|</span>
              <span className="text-amber-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#C8102E]" /> Level 1 - 5
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight sm:leading-[1.15] tracking-tight">
              Otentik <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-[#C8102E] to-amber-500">Rempah Merah</span> & Wangi <span className="text-emerald-400 font-extrabold inline-flex items-center gap-1">Daun Jeruk<Leaf className="w-8 h-8 text-emerald-400 hidden sm:inline" /></span> Khas Priangan!
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg lg:text-xl text-stone-200 font-normal leading-relaxed max-w-2xl">
              Sensasi seblak kuah merah kental, baso aci kenyal, dan topping melimpah siap memanjakan lidahmu. Diracik dari kencur segar dan cabai pilihan tanpa bahan pengawet.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary Red Button */}
              <button
                onClick={onCheckMenu}
                className="inline-flex items-center justify-center gap-2.5 bg-[#C8102E] hover:bg-[#8B0000] text-white font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-[#C8102E]/40 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
              >
                <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
                <span>Cek Menu Pedas</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {/* Secondary Orange Button */}
              <button
                onClick={onOpenShopee}
                className="inline-flex items-center justify-center gap-2.5 bg-[#F57C00] hover:bg-[#E65100] text-white font-bold text-base px-7 py-4 rounded-xl shadow-lg shadow-[#F57C00]/30 transition-all duration-200 transform hover:-translate-y-1 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Beli Produk Instan (Shopee)</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-stone-300">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">100% Halal</div>
                  <div className="text-[11px] text-stone-400">Bahan Alami Pilihan</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Fresh Kaffir Lime</div>
                  <div className="text-[11px] text-stone-400">Aroma Daun Jeruk Asli</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">4.9 / 5.0 Rating</div>
                  <div className="text-[11px] text-stone-400">50K+ Ulasan Puas</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Showcase Card Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl text-white">
              
              {/* Top Accent Floating Tag */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#C8102E] to-[#F57C00] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Paling Laris Minggu Ini!</span>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-inner group">
                <img
                  src="/src/assets/images/seblak_beureum_1790701965524.jpg"
                  alt="Seblak Beureum Komplit Signature"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                      Signature Bowl
                    </span>
                    <h3 className="text-lg font-bold text-white">Seblak Beureum Komplit</h3>
                  </div>
                </div>
              </div>

              {/* Live Spice Meter Preview */}
              <div className="bg-black/30 rounded-xl p-3.5 mb-4 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-200 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#C8102E]" /> Pilih Level Pedasmu:
                  </span>
                  <span className="font-bold text-red-400">Level 1 s/d Level 5</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
                  <div className="bg-emerald-800/60 text-emerald-200 py-1 rounded font-medium">Lvl 1 (Santuy)</div>
                  <div className="bg-yellow-700/60 text-yellow-200 py-1 rounded font-medium">Lvl 2 (Sedang)</div>
                  <div className="bg-orange-700/70 text-orange-100 py-1 rounded font-bold ring-1 ring-amber-400">Lvl 3 (Nampol)</div>
                  <div className="bg-red-700/80 text-red-100 py-1 rounded font-bold">Lvl 4 (Geledek)</div>
                  <div className="bg-[#8B0000] text-red-200 py-1 rounded font-bold">Lvl 5 (Mercon)</div>
                </div>
              </div>

              {/* Price & Quick Order */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="text-xs text-stone-300 line-through">Rp 25.000</div>
                  <div className="text-2xl font-black text-amber-400">Rp 21.000</div>
                </div>

                <button
                  onClick={onOpenOrderModal}
                  className="bg-[#C8102E] hover:bg-[#A30C24] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-red-900/50 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pesan Sekarang</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Decorative Wave Divider at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#FFF8F5] [clip-path:polygon(0_100%,100%_100%,100%_0%,0%_100%)] pointer-events-none" />
    </section>
  );
};
