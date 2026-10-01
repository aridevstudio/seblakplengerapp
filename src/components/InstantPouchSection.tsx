import React from 'react';
import { Package, Truck, ShieldCheck, Flame, ShoppingBag, ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { MenuItem } from '../data/menuData';

interface InstantPouchProps {
  onOrderPouch: (item: MenuItem) => void;
}

export const InstantPouchSection: React.FC<InstantPouchProps> = ({ onOrderPouch }) => {
  const instantProduct: MenuItem = {
    id: 'seblak-instan-pouch',
    name: 'Seblak Instan Pouch (Ready to Cook)',
    category: 'pack-instan',
    categoryLabel: 'Pack Instan',
    price: 22000,
    originalPrice: 27000,
    description: 'Kemasan pouch higienis siap seduh! Dilengkapi bumbu pasta rempah merah asli, cabai bubuk Priangan, daun jeruk kering, kerupuk, dan topping lengkap.',
    spiceLevels: [1, 2, 3, 4, 5],
    recommendedLevel: 3,
    tags: ['Bisa Kirim Se-Indonesia', 'Praktis 5 Menit'],
    image: '/src/assets/images/pouch_instan_1790702012519.jpg',
    toppingsIncluded: ['Pasta Bumbu Rempah', 'Cabai Bubuk Racikan', 'Minyak Daun Jeruk', 'Kerupuk Pelangi & Bawang', 'Cuanki & Batagor Kering'],
  };

  const steps = [
    { num: '01', title: 'Rebus 250ml Air', desc: 'Didihkan air mineral di panci kecil sampai mendidih bergolak.' },
    { num: '02', title: 'Tuang Bumbu & Topping', desc: 'Masukkan pasta bumbu rempah merah, kerupuk, cuanki & batagor.' },
    { num: '03', title: 'Rebus 3-5 Menit', desc: 'Aduk perlahan hingga kuah mengental dan kerupuk empuk kenyal.' },
    { num: '04', title: 'Tabur Daun Jeruk & Jeruk Limau', desc: 'Angkat ke mangkok, taburi daun jeruk purut & bubuk cabai sesuai selera!' },
  ];

  return (
    <section id="produk-instan" className="py-20 bg-[#FFF8F5] relative overflow-hidden scroll-mt-20">
      {/* Background Accent glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-gradient-to-br from-stone-900 via-[#1E1E1E] to-[#8B0000] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#C8102E] to-[#F57C00] rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
                  <img
                    src="/src/assets/images/pouch_instan_1790702012519.jpg"
                    alt="Kemasan Pouch Seblak Preanger"
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#2E7D32] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Kemasan Vacuum Pack 100% Higienis</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/15">
                    Tahan 30 Hari Suhu Ruang
                  </div>
                </div>
              </div>
            </div>

            {/* Right Information & Order */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/15">
                <Package className="w-3.5 h-3.5" />
                <span>Siap Kirim ke Seluruh Indonesia</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Seblak Preanger Instan Pouch <span className="text-amber-400">Siap Seduh 5 Menit!</span>
              </h2>

              <p className="text-stone-300 text-base leading-relaxed">
                Nikmati kelezatan seblak bumbu rempah merah dan wangi daun jeruk otentik langsung dari dapur rumahmu. Dilengkapi bumbu pasta basah asli (bukan sekadar bubuk perisa biasa), topping komplit, dan cabai rawit bubuk terpisah.
              </p>

              {/* Cooking Steps Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {steps.map((st) => (
                  <div key={st.num} className="bg-white/5 border border-white/10 rounded-xl p-3 text-left">
                    <span className="text-amber-400 font-black text-sm block mb-1">{st.num}</span>
                    <h4 className="text-xs font-bold text-white mb-1">{st.title}</h4>
                    <p className="text-[11px] text-stone-400 leading-snug">{st.desc}</p>
                  </div>
                ))}
              </div>

              {/* Price & Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div>
                  <div className="text-xs text-stone-400 line-through">Rp 27.000</div>
                  <div className="text-3xl font-black text-amber-400">
                    Rp 22.000 <span className="text-xs text-stone-300 font-normal">/ pouch</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col sm:flex-row gap-3">
                  <a
                    href="https://shopee.co.id/search?keyword=seblak%20preanger%20official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#EE4D2D] hover:bg-[#D73211] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Beli di Shopee Mall</span>
                  </a>

                  <button
                    onClick={() => onOrderPouch(instantProduct)}
                    className="inline-flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Order via WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Logistics & Delivery Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-400" /> Pengiriman J&T, JNE, SiCepat, SPX
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" /> Bubble Wrap Tebal & Fragile
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#C8102E]" /> Garansi Bumbu Asli Priangan
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
