import React from 'react';
import { Flame, Leaf, Instagram, ShoppingBag, MapPin, Phone, Mail, Clock, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141414] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8102E] to-[#8B0000] text-white shadow-md">
                <Flame className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                  Seblak Preanger
                  <span className="text-[10px] uppercase font-bold bg-[#2E7D32] text-white px-1.5 py-0.5 rounded">
                    Official
                  </span>
                </span>
                <span className="text-xs text-amber-300 font-medium">
                  Bumbu Rempah Merah & Daun Jeruk
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Pelopor seblak dan baso aci khas Sunda/Priangan otentik dengan formula bumbu rempah merah asli dan kesegaran daun jeruk purut. Menyajikan kenikmatan pedas gurih nagih sejak 2018.
            </p>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com/seblakpreanger_official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-[#E1306C] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow"
                aria-label="Instagram @seblakpreanger_official"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@seblakpreanger"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-black text-stone-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow border border-stone-700/50"
                aria-label="TikTok @seblakpreanger"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.82 4.48c.38-.38.7-.82.95-1.31V9.58a8.28 8.28 0 0 0 4.68 1.45V7.58a4.83 4.83 0 0 1-.0-.89z" />
                </svg>
              </a>

              {/* Shopee Store */}
              <a
                href="https://shopee.co.id/seblakpreanger_official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-[#EE4D2D] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow"
                aria-label="Shopee Store Seblak Preanger"
              >
                <ShoppingBag className="w-4 h-4" />
              </a>
            </div>

            <div className="text-xs text-stone-400 flex items-center gap-1.5 pt-1">
              <span className="text-emerald-400 font-semibold">Instagram Resmi:</span>
              <a
                href="https://instagram.com/seblakpreanger_official"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-400 font-bold transition-colors underline"
              >
                @seblakpreanger_official
              </a>
            </div>
          </div>

          {/* Quick Nav (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#beranda" className="hover:text-amber-400 transition-colors">Beranda</a>
              </li>
              <li>
                <a href="#menu-favorit" className="hover:text-amber-400 transition-colors">Menu Favorit & Level Pedas</a>
              </li>
              <li>
                <a href="#produk-instan" className="hover:text-amber-400 transition-colors">Produk Instan (Pouch Vacuum)</a>
              </li>
              <li>
                <a href="#lokasi-cabang" className="hover:text-amber-400 transition-colors">Lokasi Cabang & Jam Buka</a>
              </li>
              <li>
                <a href="#kemitraan" className="hover:text-amber-400 transition-colors">Kemitraan & Waralaba</a>
              </li>
              <li>
                <a href="#pesan-online" className="hover:text-amber-400 transition-colors">Order Online (GoFood & Grab)</a>
              </li>
            </ul>
          </div>

          {/* Branch & Operational Hours (Col 8-12) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C8102E]" />
              <span>Dapur Pusat & Kontak Resmi</span>
            </h4>
            
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <span className="font-semibold text-stone-200 shrink-0">Pusat Bandung:</span>
                <span>Jl. Dipatiukur No. 84, Coblong, Kota Bandung, Jawa Barat 40132</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Jam Buka Outlet: Setiap Hari 10.00 - 22.00 WIB</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp Customer Care: +62 812-2244-5588</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>halo@seblakpreanger.id</span>
              </p>
            </div>

            {/* Embedded Location Badge */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-3 flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-medium text-stone-300">
                  Outlet Dipatiukur: <strong className="text-white">Buka Sekarang</strong>
                </span>
              </div>
              <a
                href="#lokasi-cabang"
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline"
              >
                Cek Semua Cabang
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>
            Copyright © 2026 <strong className="text-stone-300">Seblak Preanger Official</strong>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-stone-400">
              Dibuat dengan rempah asli khas Pasundan
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 bg-stone-800 hover:bg-[#C8102E] text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Kembali ke atas"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
