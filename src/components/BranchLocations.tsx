import React, { useState } from 'react';
import { MapPin, Clock, Phone, ExternalLink, Navigation, Search, Check, Sparkles } from 'lucide-react';
import { BRANCH_LOCATIONS, BranchLocation } from '../data/menuData';

interface BranchLocationsProps {
  onSelectBranchOrder?: (branch: BranchLocation) => void;
}

export const BranchLocations: React.FC<BranchLocationsProps> = ({ onSelectBranchOrder }) => {
  const [selectedCity, setSelectedCity] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = ['Semua', 'Bandung', 'Jakarta Selatan', 'Bekasi', 'Tangerang Selatan', 'Surabaya'];

  const filteredBranches = BRANCH_LOCATIONS.filter((branch) => {
    const matchCity = selectedCity === 'Semua' || branch.city === selectedCity;
    const matchSearch =
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <section id="lokasi-cabang" className="py-20 bg-[#FFF8F5] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#C8102E] text-xs font-bold tracking-wide uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>Jaringan Outlet Resmi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight">
              Kunjungi Outlet Seblak Preanger Terdekat
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Nikmati sensasi makan seblak panas mengepul langsung dari wajan di gerai nyaman kami, atau pesan take-away cepat.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-xs font-bold text-stone-700 bg-white p-3 rounded-2xl border border-stone-200 shadow-sm shrink-0">
            <div className="text-center px-2">
              <div className="text-lg font-black text-[#C8102E]">15+</div>
              <div className="text-[11px] text-stone-500">Titik Cabang</div>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div className="text-center px-2">
              <div className="text-lg font-black text-[#2E7D32]">5</div>
              <div className="text-[11px] text-stone-500">Kota Besar</div>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div className="text-center px-2">
              <div className="text-lg font-black text-[#F57C00]">100%</div>
              <div className="text-[11px] text-stone-500">Bumbu Standar</div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          
          {/* City Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#C8102E] text-white shadow-md shadow-[#C8102E]/25'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari jalan, cabang, atau kota..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E]"
            />
          </div>

        </div>

        {/* Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-[#C8102E]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-[#2E7D32] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {branch.city}
                    </span>
                    <h3 className="text-lg font-bold text-[#1E1E1E] mt-1.5 group-hover:text-[#C8102E] transition-colors">
                      {branch.name}
                    </h3>
                  </div>

                  {branch.isNew && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      Outlet Baru
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 text-xs text-stone-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{branch.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{branch.hours}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono">{branch.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-stone-100 flex items-center gap-3">
                <a
                  href={branch.gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>

                <a
                  href={`https://wa.me/${branch.phone.replace(/[^0-9]/g, '')}?text=Halo%20Admin%20${encodeURIComponent(branch.name)},%20saya%20mau%20order%20dine-in%20atau%20takeaway`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#2E7D32] hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-3.5 rounded-xl shadow-sm transition-colors"
                >
                  <span>Chat Cabang</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
            <MapPin className="w-8 h-8 text-stone-400 mx-auto" />
            <h4 className="text-base font-bold text-stone-800">Tidak ada cabang ditemukan untuk pencarian ini</h4>
            <p className="text-xs text-stone-500">Coba gunakan kata kunci kota lain atau reset filter pilihan kota.</p>
            <button
              onClick={() => {
                setSelectedCity('Semua');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-[#C8102E] hover:underline"
            >
              Tampilkan Semua Cabang
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
