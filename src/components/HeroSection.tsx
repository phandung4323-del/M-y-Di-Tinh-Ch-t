import React, { useState } from 'react';
import { Sparkles, BatteryCharging, ShieldCheck, ArrowRight, Star, CheckCircle2, Play, Award, Zap } from 'lucide-react';
import purpleImg from '../assets/images/s1_purple_hero_1787038880318.jpg';
import pearlWhiteImg from '../assets/images/s1_white_hero_1787038901821.jpg';
import roseGoldImg from '../assets/images/s1_rose_hero_1787038924175.jpg';
import modelGlowImg from '../assets/images/model_spa_glow_1787039420200.jpg';

interface HeroSectionProps {
  onExploreModes: () => void;
  onOpenOrderForm: () => void;
}

type ColorKey = 'lavender' | 'white' | 'rose';

const COLOR_VARIANTS = {
  lavender: {
    name: 'Tím Lavender',
    tagline: 'Lavender Purple • Bản Giới Hạn Sang Trọng',
    image: purpleImg,
    haloColor: 'bg-[#9d8df1]',
    badgeBg: 'bg-[#6050af]',
    swatchBg: 'bg-[#9d8df1]',
    glow: 'rgba(96,80,175,0.25)'
  },
  white: {
    name: 'Trắng Ngọc Trai',
    tagline: 'Pearl White • Tinh Khôi Ánh Kim Champagne',
    image: pearlWhiteImg,
    haloColor: 'bg-amber-100',
    badgeBg: 'bg-slate-800',
    swatchBg: 'bg-[#f8f9fa] border border-gray-300',
    glow: 'rgba(251,191,36,0.3)'
  },
  rose: {
    name: 'Hồng Rose Gold',
    tagline: 'Rose Gold • Quyến Rũ Nữ Tính Quý Phái',
    image: roseGoldImg,
    haloColor: 'bg-rose-200',
    badgeBg: 'bg-rose-600',
    swatchBg: 'bg-[#fecdd3]',
    glow: 'rgba(244,114,182,0.3)'
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreModes, onOpenOrderForm }) => {
  const [selectedColor, setSelectedColor] = useState<ColorKey>('lavender');
  const [activeHalo, setActiveHalo] = useState(true);

  const currentVariant = COLOR_VARIANTS[selectedColor];

  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 bg-gradient-to-b from-[#1b1435] via-[#241b47] to-[#160f2e] text-white overflow-hidden rounded-b-[2.5rem] shadow-xl">
      {/* Background Luminous Auras */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#7052c9]/25 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c4a1ff]/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Top Gold Luxury Heading Poster Style */}
        <div className="text-center mb-8 animate-fade-in flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-amber-300 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm uppercase tracking-wider mb-4 border border-amber-400/30 shadow-sm max-w-full">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-bold whitespace-normal text-center">CÔNG NGHỆ CHĂM SÓC DA TOÀN DIỆN 2026</span>
          </div>

          <h1 className="font-['Manrope'] font-black text-2xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffe4be] via-[#ffd099] to-[#ffffff] mb-2 tracking-tight uppercase leading-snug sm:leading-tight py-1">
            ĐÁNH THỨC LÀN DA CĂNG MỊN
          </h1>
          <p className="font-['Manrope'] font-bold text-lg sm:text-2xl md:text-3xl text-amber-200/90 tracking-wide uppercase py-1">
            CHĂM DA CHUYÊN SÂU TẠI NHÀ
          </p>

          <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-purple-200/90 mt-2 max-w-2xl mx-auto font-normal leading-relaxed px-2">
            1 Thiết bị giải quyết <span className="text-amber-300 font-bold">6 vấn đề cốt lõi</span>: Làm sạch sâu • Đẩy tinh chất • Nâng cơ EMS • Chống nhăn • Chăm sóc mắt • Làm lạnh se khít
          </p>
        </div>

        {/* 2-Column Luxury Presentation Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-6">
          
          {/* Left Column: Model Spa Experience Shot */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-purple-400/30 bg-purple-950/40 shadow-2xl group">
            <img
              src={modelGlowImg}
              alt="Chăm sóc da chuyên sâu chuẩn Spa tại nhà"
              referrerPolicy="no-referrer"
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#160f2e] via-transparent to-transparent flex flex-col justify-end p-5">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 backdrop-blur-md px-3 py-1 rounded-full text-amber-300 border border-amber-400/40 text-xs font-bold w-fit mb-2">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>CHĂM SÓC CHUẨN SPA</span>
              </div>
              <h3 className="font-['Manrope'] font-bold text-white text-lg">
                Tập trung 6 vấn đề lão hóa
              </h3>
              <p className="text-xs text-purple-200/80 mt-0.5">
                Cảm nhận làn da săn chắc, căng mướt và sáng khỏe sau mỗi liệu trình 15 phút.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Product Device & 3 Colors */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            
            {/* Pulsing Aura */}
            <div
              className={`absolute inset-0 ${currentVariant.haloColor} opacity-20 rounded-full blur-3xl w-72 h-72 mx-auto transition-all duration-700 pointer-events-none`}
            ></div>

            {/* Product Image Canvas */}
            <div className="relative group cursor-pointer w-64 sm:w-76 h-64 sm:h-76 flex items-center justify-center" onClick={() => setActiveHalo(!activeHalo)}>
              <img
                key={selectedColor}
                src={currentVariant.image}
                alt={`Máy di tinh chất 6 in 1 màu ${currentVariant.name}`}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain relative z-10 rounded-2xl drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:scale-105 animate-fade-in"
              />

              {/* Tag overlay */}
              <div className="absolute top-2 right-0 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg text-[11px] font-bold text-[#6050af] border border-purple-200 z-20 flex items-center gap-1.5 animate-bounce">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{currentVariant.tagline}</span>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="flex items-center gap-2 sm:gap-3 mt-4 z-20 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/20 shadow-inner">
              <span className="text-xs font-semibold text-purple-200 hidden sm:inline">Chọn màu:</span>
              
              <button
                onClick={() => setSelectedColor('lavender')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedColor === 'lavender'
                    ? 'bg-[#6050af] text-white shadow-md ring-2 ring-purple-300'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#9d8df1] shadow-xs"></span>
                <span>Tím Lavender</span>
              </button>

              <button
                onClick={() => setSelectedColor('white')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedColor === 'white'
                    ? 'bg-[#6050af] text-white shadow-md ring-2 ring-purple-300'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-white border border-gray-300 shadow-xs"></span>
                <span>Trắng Ngọc Trai</span>
              </button>

              <button
                onClick={() => setSelectedColor('rose')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedColor === 'rose'
                    ? 'bg-[#6050af] text-white shadow-md ring-2 ring-purple-300'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#fecdd3] shadow-xs"></span>
                <span>Hồng Rose Gold</span>
              </button>
            </div>

            {/* Quick Price & Action */}
            <div className="w-full mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-xs line-through text-purple-300/70">782.000đ</span>
                  <span className="text-xs bg-red-500/80 text-white font-bold px-2 py-0.5 rounded-md">
                    -33.000đ
                  </span>
                </div>
                <div className="font-['Manrope'] text-2xl font-extrabold text-amber-300">
                  749.000 VNĐ
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href="#order-form-final"
                  onClick={onOpenOrderForm}
                  className="flex-1 sm:flex-initial py-3 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_4px_15px_rgba(251,191,36,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ĐẶT MUA NGAY</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#six-modes"
                  onClick={onExploreModes}
                  className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">Xem 6 Chế Độ</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Feature Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center">
            <div className="font-['Manrope'] font-bold text-base text-amber-300">6 Trong 1</div>
            <div className="text-[11px] text-purple-200/80 mt-0.5">Liệu trình chuẩn Spa</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center">
            <div className="font-['Manrope'] font-bold text-base text-amber-300">Vi Dòng EMS</div>
            <div className="text-[11px] text-purple-200/80 mt-0.5">Nâng cơ V-line</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center">
            <div className="font-['Manrope'] font-bold text-base text-amber-300">Chườm Lạnh Blue</div>
            <div className="text-[11px] text-purple-200/80 mt-0.5">Làm dịu & se chân lông</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center">
            <div className="font-['Manrope'] font-bold text-base text-amber-300">Bảo Hành 1 Đổi 1</div>
            <div className="text-[11px] text-purple-200/80 mt-0.5">Chính hãng 12 tháng</div>
          </div>
        </div>

      </div>
    </section>
  );
};
