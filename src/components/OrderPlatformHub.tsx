import React, { useState } from 'react';
import { ExternalLink, Copy, Check, MessageCircle, Bike, Tag, Sparkles, Clock, MapPin } from 'lucide-react';

interface OrderPlatformHubProps {
  onQuickWhatsApp: () => void;
}

export const OrderPlatformHub: React.FC<OrderPlatformHubProps> = ({ onQuickWhatsApp }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const platforms = [
    {
      id: 'gofood',
      name: 'GoFood by Gojek',
      tagline: 'Pesan Kilat Sampai Dalam 30 Menit',
      color: '#00AA13',
      bgLight: 'bg-[#F2FAF4]',
      borderHover: 'hover:border-[#00AA13]',
      badge: 'Diskon s/d 35%',
      promoCode: 'GOFOODPREANGER',
      link: 'https://gofood.co.id',
      actionText: 'Buka di GoFood',
      description: 'Nikmati promo diskon ongkir dan potongan harga bundling di merchant resmi Seblak Preanger GoFood.',
    },
    {
      id: 'grabfood',
      name: 'GrabFood',
      tagline: 'GrabFood Signature Merchant',
      color: '#00B14F',
      bgLight: 'bg-[#F0FBF4]',
      borderHover: 'hover:border-[#00B14F]',
      badge: 'Gratis Ongkir Super',
      promoCode: 'GRABPREANGER',
      link: 'https://food.grab.com',
      actionText: 'Buka di GrabFood',
      description: 'Pesan porsi komplit dengan GrabFood Dine-in atau Delivery dengan jaminan makanan tetap panas & renyah.',
    },
    {
      id: 'shopeefood',
      name: 'ShopeeFood & Mall',
      tagline: 'Voucher Diskon & Flash Sale Pouch',
      color: '#EE4D2D',
      bgLight: 'bg-[#FDF3F1]',
      borderHover: 'hover:border-[#EE4D2D]',
      badge: 'Flash Sale Rp 19rb',
      promoCode: 'SHOPEEPREANGER',
      link: 'https://shopee.co.id',
      actionText: 'Buka di ShopeeFood',
      description: 'Tersedia menu siap santap (ShopeeFood) dan produk kemasan pouch instan (Shopee Mall) kirim se-Indonesia.',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Official Care',
      tagline: 'Order Khusus Catering & Kemitraan',
      color: '#25D366',
      bgLight: 'bg-[#F0FAF3]',
      borderHover: 'hover:border-[#25D366]',
      badge: 'Respon Cepat < 3 Menit',
      promoCode: 'WARGIPREANGER',
      link: 'https://wa.me/6281222445588?text=Halo%20Admin%20Seblak%20Preanger,%20saya%20mau%20order%20menu%20favorit',
      actionText: 'Chat WhatsApp Kami',
      description: 'Pesan langsung ke tim outlet terdekat, kustom topping sesukamu, atau order porsi besar untuk acara.',
      isDirectWA: true,
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <section id="pesan-online" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#2E7D32] text-xs font-bold tracking-wide uppercase">
            <Bike className="w-3.5 h-3.5" />
            <span>Pesan Delivery & Takeaway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight">
            Pesan Langsung ke Rumahmu
          </h2>
          <p className="text-stone-600 text-base">
            Nikmati aroma segar daun jeruk dan pedas kuah merah kental Seblak Preanger tanpa harus antre. Pilih platform pemesanan favoritmu!
          </p>
        </div>

        {/* 4 Interactive Delivery Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform) => {
            const isCopied = copiedCode === platform.promoCode;

            return (
              <div
                key={platform.id}
                className={`rounded-3xl border-2 border-stone-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 ${platform.borderHover}`}
              >
                <div>
                  {/* Platform Brand Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-md text-lg"
                      style={{ backgroundColor: platform.color }}
                    >
                      {platform.id === 'whatsapp' ? (
                        <MessageCircle className="w-6 h-6" />
                      ) : (
                        <span>{platform.name.charAt(0)}</span>
                      )}
                    </div>

                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white shadow-sm"
                      style={{ backgroundColor: platform.color }}
                    >
                      {platform.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1E1E1E] group-hover:text-stone-900 mb-1">
                    {platform.name}
                  </h3>
                  <p className="text-xs font-semibold text-stone-500 mb-3">
                    {platform.tagline}
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed mb-5">
                    {platform.description}
                  </p>

                  {/* Promo Code Box */}
                  <div className="bg-stone-50 border border-dashed border-stone-300 rounded-xl p-2.5 mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-stone-700">
                      <Tag className="w-3.5 h-3.5 text-amber-600" />
                      <span className="font-mono font-bold">{platform.promoCode}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(platform.promoCode)}
                      className="text-[11px] font-semibold text-stone-600 hover:text-stone-950 flex items-center gap-1 cursor-pointer bg-white px-2 py-0.5 rounded shadow-sm border border-stone-200"
                      title="Salin Kode Voucher"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <div>
                  {platform.isDirectWA ? (
                    <button
                      onClick={onQuickWhatsApp}
                      className="w-full inline-flex items-center justify-center gap-2 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all duration-200 hover:opacity-90 active:scale-98 cursor-pointer"
                      style={{ backgroundColor: platform.color }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{platform.actionText}</span>
                    </button>
                  ) : (
                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all duration-200 hover:opacity-90 active:scale-98"
                      style={{ backgroundColor: platform.color }}
                    >
                      <span>{platform.actionText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Guaranteed Delivery Notice Banner */}
        <div className="mt-12 bg-[#FFF8F5] border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1E1E1E]">Jaminan Kemasan Rapi & Kuah Terpisah</h4>
              <p className="text-xs text-stone-600">
                Setiap pesanan kuah dan kerupuk/cuanki dipisah agar tetap renyah saat sampai di tempatmu.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#C8102E]">
            <MapPin className="w-4 h-4" />
            <span>Tersedia di 15+ Titik Outlet</span>
          </div>
        </div>

      </div>
    </section>
  );
};
