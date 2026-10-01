import React, { useState } from 'react';
import { X, Flame, Sparkles, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { MenuItem, SPICE_LEVELS, MENU_ITEMS } from '../data/menuData';

interface SpiceQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderRecommended: (item: MenuItem, level: number) => void;
}

export const SpiceQuizModal: React.FC<SpiceQuizModalProps> = ({
  isOpen,
  onClose,
  onOrderRecommended,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{ level: number; item: MenuItem } | null>(null);

  if (!isOpen) return null;

  const questions = [
    {
      q: 'Seberapa sering kamu makan pedas dalam seminggu?',
      options: [
        { label: 'Jarang / Baru coba-coba', score: 1 },
        { label: '2-3 kali seminggu, yang penting ada sambal', score: 2 },
        { label: 'Hampir tiap hari, makanan hambar kalau ga pedas!', score: 3 },
        { label: 'Raja Cabai! Rawit utuh pun langsung dikunyah', score: 5 },
      ],
    },
    {
      q: 'Kuah seblak seperti apa yang paling bikin ngiler?',
      options: [
        { label: 'Kuah gurih rempah kencur lembut ramah lambung', score: 1 },
        { label: 'Kuah merah kental dengan wangi semerbak daun jeruk fresh', score: 3 },
        { label: 'Kuah cabai merah pekat oily berminyak panas mendidih', score: 4 },
        { label: 'Kuah merah banjir cabai rawit domba berapi-api!', score: 5 },
      ],
    },
    {
      q: 'Sensasi apa yang paling kamu cari?',
      options: [
        { label: 'Kenyal nikmat baso aci santai', score: 2 },
        { label: 'Kombinasi renyah cuanki lidah + kuah gurih nagih', score: 3 },
        { label: 'Keringat bercucuran puas dan bibir dower nikmat!', score: 5 },
      ],
    },
  ];

  const handleSelectOption = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate result
      const avg = Math.round(newAnswers.reduce((a, b) => a + b, 0) / newAnswers.length);
      const calculatedLevel = Math.min(Math.max(avg, 1), 5);
      
      let matchedItem = MENU_ITEMS[0];
      if (calculatedLevel <= 2) {
        matchedItem = MENU_ITEMS.find((m) => m.id === 'baso-aci-karesep') || MENU_ITEMS[0];
      } else if (calculatedLevel === 3) {
        matchedItem = MENU_ITEMS.find((m) => m.id === 'seblak-beureum-komplit') || MENU_ITEMS[0];
      } else if (calculatedLevel === 4) {
        matchedItem = MENU_ITEMS.find((m) => m.id === 'mie-gondang-monah') || MENU_ITEMS[0];
      } else {
        matchedItem = MENU_ITEMS.find((m) => m.id === 'seblak-ceker-mercon') || MENU_ITEMS[0];
      }

      setResult({ level: calculatedLevel, item: matchedItem });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const spiceLevelDetail = result ? SPICE_LEVELS.find((s) => s.level === result.level) : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-stone-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#C8102E] to-[#8B0000] text-white p-5 pr-12 relative">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kuis Karakter Pedas</span>
          </div>
          <h3 className="text-xl font-black mt-1">Temukan Level Pedas Preanger-mu!</h3>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!result ? (
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#C8102E] h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              <div>
                <span className="text-xs font-bold text-stone-400 block mb-1">
                  Pertanyaan {currentStep + 1} dari {questions.length}
                </span>
                <h4 className="text-base font-extrabold text-stone-900 leading-snug">
                  {questions[currentStep].q}
                </h4>
              </div>

              <div className="space-y-2.5">
                {questions[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt.score)}
                    className="w-full text-left p-3.5 rounded-2xl border border-stone-200 hover:border-[#C8102E] hover:bg-red-50/50 text-xs sm:text-sm font-semibold text-stone-800 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <Flame className="w-4 h-4 text-stone-300 group-hover:text-[#C8102E] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-[#C8102E] mx-auto shadow-inner">
                <Flame className="w-8 h-8 animate-bounce" />
              </div>

              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-stone-400">
                  Level Rekomendasi Kamu:
                </span>
                <h4 className="text-2xl font-black text-[#C8102E] mt-1">
                  Level {result.level} - {spiceLevelDetail?.name}
                </h4>
                <p className="text-xs text-stone-600 mt-2 max-w-xs mx-auto leading-relaxed">
                  {spiceLevelDetail?.desc}
                </p>
              </div>

              {/* Matched Dish Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left flex gap-3.5 items-center">
                <img
                  src={result.item.image}
                  alt={result.item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-[#2E7D32]">Menu Rekomendasi Cocok:</span>
                  <h5 className="text-sm font-extrabold text-stone-900">{result.item.name}</h5>
                  <span className="text-xs font-black text-[#C8102E]">
                    Rp {result.item.price.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOrderRecommended(result.item, result.level);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C8102E] hover:bg-[#8B0000] text-white font-bold text-sm py-3.5 px-5 rounded-xl shadow-lg cursor-pointer"
                >
                  <span>Pesan Menu Ini Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Kuis</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
