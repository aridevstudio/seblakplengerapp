/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandHighlights } from './components/BrandHighlights';
import { FeaturedMenu } from './components/FeaturedMenu';
import { InstantPouchSection } from './components/InstantPouchSection';
import { OrderPlatformHub } from './components/OrderPlatformHub';
import { BranchLocations } from './components/BranchLocations';
import { FranchiseBanner } from './components/FranchiseBanner';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { SpiceQuizModal } from './components/SpiceQuizModal';
import { AdminDashboard } from './components/AdminDashboard';
import { MENU_ITEMS, MenuItem } from './data/menuData';
import { Flame, ShoppingBag, Sparkles, MessageCircle, HelpCircle, Database } from 'lucide-react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedItemForOrder, setSelectedItemForOrder] = useState<MenuItem | null>(MENU_ITEMS[0]);
  const [selectedInitialLevel, setSelectedInitialLevel] = useState<number>(3);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const handleOpenOrderModal = (item?: MenuItem, level?: number) => {
    setSelectedItemForOrder(item || MENU_ITEMS[0]);
    setSelectedInitialLevel(level || item?.recommendedLevel || 3);
    setIsOrderModalOpen(true);
  };

  const handleCheckMenu = () => {
    const el = document.getElementById('menu-favorit');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenShopee = () => {
    const el = document.getElementById('produk-instan');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickWhatsApp = () => {
    window.open(
      'https://wa.me/6281222445588?text=Halo%20Admin%20Seblak%20Preanger%20Official,%20saya%20mau%20order%20menu%20favorit',
      '_blank'
    );
  };

  const handleOrderFromQuiz = (item: MenuItem, level: number) => {
    handleOpenOrderModal(item, level);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F5] text-[#1E1E1E] font-sans selection:bg-[#C8102E] selection:text-white flex flex-col">
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenOrderModal={() => handleOpenOrderModal()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        cartCount={cartCount}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onCheckMenu={handleCheckMenu}
          onOpenShopee={handleOpenShopee}
          onOpenOrderModal={() => handleOpenOrderModal(MENU_ITEMS[0], 3)}
        />

        {/* 4 USP Brand Highlights */}
        <BrandHighlights />

        {/* Featured Menu with Category Filter Tabs */}
        <FeaturedMenu
          onSelectItemForOrder={(item, level) => handleOpenOrderModal(item, level)}
        />

        {/* Interactive Floating Spice Quiz Teaser Banner */}
        <section className="py-8 bg-gradient-to-r from-red-600 via-[#C8102E] to-amber-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6 text-amber-300 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight">Bingung Pilih Tingkat Kepedasan?</h3>
                <p className="text-xs text-stone-100">Ikuti kuis 30 detik untuk temukan racikan kuah rempah & level pedas yang pas buat lidahmu.</p>
              </div>
            </div>

            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-[#C8102E] hover:bg-stone-100 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Cari Level Pedasmu (Kuis)</span>
            </button>
          </div>
        </section>

        {/* Ready to Cook Instant Pouch Section */}
        <InstantPouchSection
          onOrderPouch={(pouchItem) => handleOpenOrderModal(pouchItem, 3)}
        />

        {/* Order Delivery Hub (GoFood, GrabFood, Shopee, WhatsApp) */}
        <OrderPlatformHub
          onQuickWhatsApp={handleQuickWhatsApp}
        />

        {/* Interactive Branch Locations */}
        <BranchLocations />

        {/* Franchise / Kemitraan Opportunities Banner */}
        <FranchiseBanner />

        {/* Social Proof & Customer Reviews */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button (Mobile & Desktop Quick Order) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setIsQuizModalOpen(true)}
          className="bg-stone-900/90 hover:bg-stone-950 backdrop-blur-md text-amber-300 border border-stone-700/80 px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          title="Kuis Level Pedas"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Kuis Level Pedas</span>
        </button>

        <button
          onClick={() => setIsAdminOpen(true)}
          className="bg-stone-900/95 hover:bg-stone-950 backdrop-blur-md text-white border border-stone-700 px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          title="Buka Database Admin"
        >
          <Database className="w-4 h-4 text-[#C8102E]" />
          <span className="hidden sm:inline">Admin Dashboard (SQL)</span>
        </button>

        <button
          onClick={() => handleOpenOrderModal()}
          className="bg-[#C8102E] hover:bg-[#8B0000] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full font-bold text-sm shadow-2xl shadow-[#C8102E]/50 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-[#C8102E]/20"
          aria-label="Pesan Online Sekarang"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="hidden sm:inline">Pesan Online</span>
        </button>
      </div>

      {/* Admin Management Dashboard & SQL Console */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Order Customization Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedItem={selectedItemForOrder}
        initialLevel={selectedInitialLevel}
      />

      {/* Spice Quiz Modal */}
      <SpiceQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onOrderRecommended={handleOrderFromQuiz}
      />
    </div>
  );
}
