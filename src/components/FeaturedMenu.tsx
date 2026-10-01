import React, { useState } from 'react';
import { Flame, Leaf, ShoppingBag, Plus, Sparkles, Check, ChevronRight } from 'lucide-react';
import { MENU_ITEMS, SPICE_LEVELS, MenuItem } from '../data/menuData';

interface FeaturedMenuProps {
  onSelectItemForOrder: (item: MenuItem, selectedLevel: number) => void;
}

export const FeaturedMenu: React.FC<FeaturedMenuProps> = ({ onSelectItemForOrder }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'seblak-mie' | 'baso-aci' | 'pack-instan'>('all');
  const [itemSelectedLevels, setItemSelectedLevels] = useState<{ [itemId: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    MENU_ITEMS.forEach((item) => {
      initial[item.id] = item.recommendedLevel || 3;
    });
    return initial;
  });

  const categories = [
    { id: 'all', label: 'Semua Menu' },
    { id: 'seblak-mie', label: 'Seblak & Mie' },
    { id: 'baso-aci', label: 'Baso Aci' },
    { id: 'pack-instan', label: 'Pack Instan (Pouch)' },
  ];

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleLevelChange = (itemId: string, level: number) => {
    setItemSelectedLevels((prev) => ({
      ...prev,
      [itemId]: level,
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="menu-favorit" className="py-20 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#C8102E] text-xs font-bold tracking-wide uppercase">
              <Flame className="w-3.5 h-3.5" />
              <span>Menu Favorit & Signature</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight">
              Pilihan Menu Pedas Gurih Bikin Ketagihan
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Pilih tingkat kepedasanmu dari Level 1 (Santuy) hingga Level 5 (Mercon Preanger). Semua porsi dimasak dadakan dengan wajan panas!
            </p>
          </div>

          {/* Spice Level Legend Box */}
          <div className="bg-[#FFF8F5] border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 text-xs space-y-1.5 self-start md:self-auto shrink-0 shadow-sm">
            <div className="font-bold text-[#1E1E1E] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#C8102E]" />
              <span>Panduan Tingkat Kepedasan:</span>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-stone-700">
              <span className="font-medium text-emerald-700">L1: Santuy</span>
              <span className="text-stone-300">·</span>
              <span className="font-medium text-amber-700">L2: Sedang</span>
              <span className="text-stone-300">·</span>
              <span className="font-bold text-orange-600">L3: Nampol 🔥</span>
              <span className="text-stone-300">·</span>
              <span className="font-bold text-red-600">L4: Geledek</span>
              <span className="text-stone-300">·</span>
              <span className="font-black text-[#8B0000]">L5: Mercon 💣</span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#FFF8F5] border border-stone-200 rounded-2xl w-full sm:w-max mb-10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#C8102E] text-white shadow-md shadow-[#C8102E]/25'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const currentLevel = itemSelectedLevels[item.id] || item.recommendedLevel || 3;
            const levelInfo = SPICE_LEVELS.find((l) => l.level === currentLevel);

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-2xl hover:border-[#C8102E]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Top Status Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      {item.isBestSeller ? (
                        <span className="bg-[#C8102E] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          Best Seller
                        </span>
                      ) : item.isPopular ? (
                        <span className="bg-[#F57C00] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                          Favorit Wargi
                        </span>
                      ) : (
                        <span className="bg-[#2E7D32] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          Fresh Jeruk
                        </span>
                      )}

                      <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                        {item.categoryLabel}
                      </span>
                    </div>

                    {/* Level Pedas Badge on Image */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                        <Flame className="w-4 h-4 text-red-500" />
                        <span className="font-semibold">Pilihan Level: 1 - 5</span>
                      </div>
                      <span className="bg-emerald-900/80 text-emerald-200 text-[11px] px-2 py-0.5 rounded font-medium">
                        Daun Jeruk Fresh
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#1E1E1E] group-hover:text-[#C8102E] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Toppings preview tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.toppingsIncluded.slice(0, 4).map((top, idx) => (
                        <span
                          key={idx}
                          className="bg-stone-100 text-stone-700 text-[11px] font-medium px-2 py-0.5 rounded-md"
                        >
                          +{top}
                        </span>
                      ))}
                      {item.toppingsIncluded.length > 4 && (
                        <span className="text-[11px] text-stone-400 font-medium py-0.5">
                          +{item.toppingsIncluded.length - 4} lainnya
                        </span>
                      )}
                    </div>

                    {/* Interactive Spice Level Selector */}
                    <div className="pt-2 border-t border-stone-100">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-stone-700 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-[#C8102E]" />
                          Pilih Kepedasan:
                        </span>
                        <span className="font-bold text-xs text-[#C8102E]">
                          Level {currentLevel}: {levelInfo?.name}
                        </span>
                      </div>

                      {/* Level Buttons 1-5 */}
                      <div className="grid grid-cols-5 gap-1.5">
                        {[1, 2, 3, 4, 5].map((lvl) => {
                          const isSelected = currentLevel === lvl;
                          return (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => handleLevelChange(item.id, lvl)}
                              className={`py-1.5 px-1 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#C8102E] text-white shadow-md scale-105'
                                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                              }`}
                            >
                              Lvl {lvl}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Order Action */}
                <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-stone-100 pt-4">
                  <div>
                    {item.originalPrice && (
                      <span className="text-xs text-stone-400 line-through block">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                    <span className="text-2xl font-black text-[#C8102E]">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectItemForOrder(item, currentLevel)}
                    className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#8B0000] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-md shadow-[#C8102E]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Pesan Menu</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
