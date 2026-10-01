import React, { useState, useEffect } from 'react';
import { Flame, Leaf, Menu, X, ShoppingBag, PhoneCall, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenOrderModal: () => void;
  onOpenAdmin: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal, onOpenAdmin, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Menu Favorit', href: '#menu-favorit' },
    { name: 'Produk Instan (Pouch)', href: '#produk-instan' },
    { name: 'Lokasi Cabang', href: '#lokasi-cabang' },
    { name: 'Kemitraan', href: '#kemitraan' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1E1E1E]/95 backdrop-blur-md shadow-lg shadow-black/20 py-3'
          : 'bg-gradient-to-b from-[#1E1E1E]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#beranda"
            className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Seblak Preanger Official"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8102E] to-[#8B0000] text-white shadow-md shadow-[#C8102E]/30 ring-2 ring-[#C8102E]/30">
              <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2E7D32] ring-1 ring-white">
                <Leaf className="w-2.5 h-2.5 text-white" />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Seblak Preanger
                <span className="text-[10px] uppercase tracking-wider font-bold bg-[#2E7D32] text-white px-1.5 py-0.5 rounded">
                  Official
                </span>
              </span>
              <span className="text-[11px] text-amber-200/90 font-medium tracking-wide">
                Bumbu Rempah Merah & Daun Jeruk
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/90 hover:text-amber-400 transition-colors duration-200 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8102E] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white bg-stone-800/90 hover:bg-stone-750 border border-stone-700 px-3 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
              title="Buka Admin Database & SQL Console"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">Admin SQL</span>
            </button>

            <a
              href="https://wa.me/6281222445588?text=Halo%20Admin%20Seblak%20Preanger,%20saya%20mau%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white transition-colors px-2 py-1"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>CS: 0812-2244-5588</span>
            </a>

            <button
              onClick={onOpenOrderModal}
              className="relative inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A30C24] active:bg-[#8B0000] text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-[#C8102E]/30 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pesan Online</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu & Quick Order Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdmin}
              className="bg-stone-800 text-amber-300 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-stone-700"
            >
              SQL
            </button>
            <button
              onClick={onOpenOrderModal}
              className="relative bg-[#C8102E] text-white text-xs font-semibold px-3 py-2 rounded-full flex items-center gap-1.5 shadow"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-stone-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1E1E1E] border-t border-white/10 px-4 pt-3 pb-6 mt-3 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium text-white/90 hover:text-amber-400 hover:bg-white/5 px-3 py-2.5 rounded-lg transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#C8102E] hover:bg-[#8B0000] text-white font-bold py-3 rounded-xl shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Pesan Online Sekarang</span>
            </button>

            <a
              href="https://wa.me/6281222445588?text=Halo%20Admin%20Seblak%20Preanger"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-green-700 text-white font-medium py-2.5 rounded-xl text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Admin: 0812-2244-5588</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
