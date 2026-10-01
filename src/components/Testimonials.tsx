import React from 'react';
import { Star, Quote, Heart, Flame } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#FFF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#C8102E] text-xs font-bold tracking-wide uppercase">
            <Heart className="w-3.5 h-3.5 fill-[#C8102E]" />
            <span>Kata Wargi & Pecinta Pedas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight">
            Lebih Dari 50.000+ Lidah Terpikat
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Cerita jujur dari para food vlogger dan wargi seblak sejati yang sudah membuktikan sensasi rempah merah & daun jeruk segar kami.
          </p>
        </div>

        {/* Testimonials 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-stone-200 group-hover:text-red-200 transition-colors" />
                </div>

                {/* Comment */}
                <p className="text-stone-700 text-sm leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author & Favorite Dish Footer */}
              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#C8102E]/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#1E1E1E]">{t.name}</h4>
                    <span className="text-xs text-stone-500">{t.role} · {t.handle}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#C8102E] bg-red-50 px-2.5 py-1 rounded-md">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Menu Favorit: {t.favoriteDish}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
