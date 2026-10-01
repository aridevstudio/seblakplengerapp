import React from 'react';
import { Flame, Leaf, UtensilsCrossed, PackageCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const BrandHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Flame,
      iconBg: 'bg-red-50 text-[#C8102E] border-red-200',
      badgeColor: 'text-[#C8102E] bg-red-100/70',
      title: 'Bumbu Rempah Merah',
      subtitle: 'Formula Rahasia Asli Priangan',
      description:
        'Diracik dari cabai merah segar, kencur cikur kualitas terbaik, dan rempah Sunda warisan turun-temurun. Kuahnya kental, gurih, dan pedas meresap sempurna ke setiap suapan.',
      badgeText: 'Racikan Otentik',
      highlights: ['Kencur Cikur Pilihan', 'Cabai Segar Tanpa Pewarna', 'Kuah Kental Berkaldu'],
    },
    {
      icon: Leaf,
      iconBg: 'bg-emerald-50 text-[#2E7D32] border-emerald-200',
      badgeColor: 'text-[#2E7D32] bg-emerald-100/70',
      title: 'Aroma Daun Jeruk Fresh',
      subtitle: 'Menyegarkan & Membangkitkan Selera',
      description:
        'Ciri khas otentik Seblak Preanger! Potongan daun jeruk purut segar dimasukkan saat wajan panas mengepul, menciptakan aroma wangi segar yang khas dan tidak enek.',
      badgeText: 'Signature Khas',
      highlights: ['Wangi Segar Daun Jeruk', 'Menyeimbangkan Rasa Pedas', 'Bikin Nagih & Ga Enek'],
    },
    {
      icon: UtensilsCrossed,
      iconBg: 'bg-amber-50 text-[#F57C00] border-amber-200',
      badgeColor: 'text-[#F57C00] bg-amber-100/70',
      title: 'Topping Melimpah',
      subtitle: 'Sensasi Renyah & Kenyal Berpadu',
      description:
        'Kombinasi cuanki lidah renyah jumbo, batagor kering garing, baso aci kenyal isi ayam, telur orak-arik, dan aneka kerupuk basah yang meresap sempurna.',
      badgeText: 'Porsi Puas',
      highlights: ['Cuanki Lidah Gurih', 'Batagor Kering Krispi', 'Baso Aci Kenyal Padat'],
    },
    {
      icon: PackageCheck,
      iconBg: 'bg-stone-100 text-stone-800 border-stone-300',
      badgeColor: 'text-stone-800 bg-stone-200/80',
      title: 'Kemasan Instan Pouch',
      subtitle: 'Siap Seduh, Kirim Seluruh Indonesia',
      description:
        'Rindu pedasnya Seblak Preanger dari luar kota? Hadir dalam pouch vacuum pack higienis, bumbu rempah cair asli, dan cabai terpisah yang awet hingga 30 hari.',
      badgeText: 'Kirim Nasional',
      highlights: ['Vacuum Pack Higienis', 'Praktis Rebus 5 Menit', 'Tahan Kirim Luar Kota'],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FFF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#C8102E] text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Keistimewaan Seblak Preanger</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight">
            Kenapa Ribuan Wargi Jatuh Cinta Pada Suapan Pertama?
          </h2>
          <p className="text-base text-stone-600">
            Kami menjaga keaslian rasa seblak Priangan sejati dengan bahan rempah segar pilihan, tanpa kompromi pada kualitas rasa.
          </p>
        </div>

        {/* 4 Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-[#C8102E]/30 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
              >
                <div>
                  {/* Icon & Badge Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${item.badgeColor}`}>
                      {item.badgeText}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-[#1E1E1E] mb-1 group-hover:text-[#C8102E] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-amber-700 mb-3">
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-stone-600 leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Key Bullet Points */}
                <div className="pt-4 border-t border-stone-100 space-y-1.5">
                  {item.highlights.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs font-medium text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
