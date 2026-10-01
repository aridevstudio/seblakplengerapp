import React, { useState, useEffect } from 'react';
import { X, Flame, Plus, Minus, ShoppingBag, MessageCircle, ExternalLink, Check, Sparkles } from 'lucide-react';
import { MenuItem, SPICE_LEVELS, EXTRA_TOPPINGS } from '../data/menuData';
import { createOrder } from '../services/databaseService';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: MenuItem | null;
  initialLevel?: number;
  onOrderSaved?: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedItem,
  initialLevel = 3,
  onOrderSaved,
}) => {
  const [level, setLevel] = useState<number>(initialLevel);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (selectedItem) {
      setLevel(initialLevel || selectedItem.recommendedLevel || 3);
      setQuantity(1);
      setSelectedToppings([]);
      setNotes('');
      setOrderSuccess(false);
    }
  }, [selectedItem, initialLevel]);

  if (!isOpen || !selectedItem) return null;

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const toppingsTotalPrice = selectedToppings.reduce((total, id) => {
    const topping = EXTRA_TOPPINGS.find((t) => t.id === id);
    return total + (topping ? topping.price : 0);
  }, 0);

  const unitPrice = selectedItem.price + toppingsTotalPrice;
  const grandTotal = unitPrice * quantity;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const levelInfo = SPICE_LEVELS.find((l) => l.level === level);

  const handleWhatsAppCheckout = async () => {
    setIsSubmitting(true);
    const toppingsList = selectedToppings
      .map((id) => {
        const top = EXTRA_TOPPINGS.find((t) => t.id === id);
        return top ? top.name : '';
      })
      .filter(Boolean)
      .join(', ');

    // Save order to cloud database
    try {
      await createOrder({
        customerName: customerName.trim() || 'Wargi Seblak',
        customerPhone: customerPhone.trim() || 'WhatsApp Customer',
        menuId: selectedItem.id,
        menuName: selectedItem.name,
        spiceLevel: level,
        spiceLevelName: levelInfo?.name || `Level ${level}`,
        quantity,
        toppings: toppingsList || '-',
        notes: notes.trim() || '-',
        totalPrice: grandTotal,
        platform: 'WhatsApp',
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      if (onOrderSaved) onOrderSaved();
    } catch (e) {
      console.warn('Direct order save fallback:', e);
    } finally {
      setIsSubmitting(false);
    }

    const message = `Halo Admin *Seblak Preanger Official*! 👋%0A%0A` +
      `Saya mau order pesanan online:%0A` +
      `👤 *Nama:* ${encodeURIComponent(customerName.trim() || 'Wargi Seblak')}%0A` +
      `🍜 *Menu:* ${encodeURIComponent(selectedItem.name)}%0A` +
      `🔥 *Level Pedas:* Level ${level} (${levelInfo?.name})%0A` +
      `🔢 *Jumlah:* ${quantity} porsi%0A` +
      `🥟 *Extra Topping:* ${toppingsList ? encodeURIComponent(toppingsList) : 'Tanpa topping tambahan'}%0A` +
      `📝 *Catatan Khusus:* ${notes ? encodeURIComponent(notes) : '-' }%0A` +
      `💰 *Total Estimasi:* ${encodeURIComponent(formatPrice(grandTotal))}%0A%0A` +
      `Mohon info ketersediaan dan ongkir ke alamat saya ya kak. Terima kasih! 🙏`;

    window.open(`https://wa.me/6281222445588?text=${message}`, '_blank');
    setOrderSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-stone-200">
        
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-[#C8102E] to-[#8B0000] text-white p-5 pr-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-200">
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Kustomisasi Pesananmu</span>
          </div>
          <h3 className="text-xl font-black mt-1">{selectedItem.name}</h3>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          
          {/* Item Preview */}
          <div className="flex gap-4 items-center bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-16 h-16 rounded-xl object-cover ring-1 ring-stone-200 shrink-0"
            />
            <div className="flex-1">
              <span className="text-xs font-bold text-stone-500">{selectedItem.categoryLabel}</span>
              <h4 className="text-sm font-extrabold text-stone-900">{selectedItem.name}</h4>
              <span className="text-sm font-black text-[#C8102E]">{formatPrice(selectedItem.price)}</span>
            </div>
          </div>

          {/* Customer Info Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/80">
            <div>
              <label className="text-[11px] font-bold text-stone-700 block mb-1">
                Nama Pemesan:
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nama Anda (contoh: Siti)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white placeholder-stone-400 focus:outline-none focus:border-[#C8102E]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-700 block mb-1">
                No. WhatsApp:
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0812-xxxx-xxxx"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white placeholder-stone-400 focus:outline-none focus:border-[#C8102E]"
              />
            </div>
          </div>

          {/* Spice Level Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-stone-800 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#C8102E]" />
                Tingkat Kepedasan:
              </label>
              <span className="font-extrabold text-sm text-[#C8102E]">
                Level {level} · {levelInfo?.name}
              </span>
            </div>

            <p className="text-[11px] text-stone-500 italic">
              {levelInfo?.desc}
            </p>

            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {SPICE_LEVELS.map((sl) => (
                <button
                  key={sl.level}
                  type="button"
                  onClick={() => setLevel(sl.level)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    level === sl.level
                      ? 'bg-[#C8102E] text-white shadow-md ring-2 ring-[#C8102E]/30 scale-105'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <div className="text-[10px]">Lvl</div>
                  <div className="text-sm font-black">{sl.level}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Extra Toppings Checkboxes */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-stone-800 block">
              Tambahan Topping Spesial (Opsional):
            </label>
            <div className="space-y-2">
              {EXTRA_TOPPINGS.map((top) => {
                const isChecked = selectedToppings.includes(top.id);
                return (
                  <button
                    key={top.id}
                    type="button"
                    onClick={() => toggleTopping(top.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer text-left ${
                      isChecked
                        ? 'border-[#C8102E] bg-red-50/50 text-[#C8102E]'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-[#C8102E] border-[#C8102E] text-white' : 'border-stone-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{top.name}</span>
                    </div>
                    <span className="font-bold">+{formatPrice(top.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Notes Input */}
          <div className="space-y-1.5">
            <label htmlFor="notes" className="text-xs font-bold text-stone-800 block">
              Catatan untuk Koki (Opsional):
            </label>
            <input
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Kuah agak banyak, jangan terlalu asin, dll."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E]"
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-800">Jumlah Porsi:</span>
            <div className="flex items-center gap-3 bg-stone-100 p-1.5 rounded-xl">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-stone-700 disabled:opacity-40 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-black w-6 text-center text-stone-900">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-stone-700 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer / Direct Checkout Actions */}
        <div className="bg-stone-50 p-5 border-t border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Subtotal ({quantity} porsi):</span>
            <span className="text-2xl font-black text-[#C8102E]">{formatPrice(grandTotal)}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-stone-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-stone-950 text-[#25D366]" />
              <span>Checkout via WhatsApp</span>
            </button>

            <a
              href="https://gofood.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 bg-[#00AA13] hover:bg-[#009210] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02]"
            >
              <span>Pesan di GoFood</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {orderSuccess && (
            <p className="text-center text-xs font-semibold text-emerald-700 bg-emerald-50 py-1.5 rounded-lg">
              ✨ Format pesanan telah disiapkan di WhatsApp Anda!
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
