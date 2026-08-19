import React, { useState } from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, Droplets, Zap, Snowflake } from 'lucide-react';
import moistureCleanImg from '../assets/images/ba_moisture_clean_1787040192644.jpg';
import acneCleanImg from '../assets/images/ba_acne_clean_1787040209082.jpg';
import cleanseCleanImg from '../assets/images/ba_cleanse_clean_1787040221998.jpg';

export const SkinTransformationGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'moisture' | 'acne' | 'cleanse'>('moisture');

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#1b1435] to-[#120d24] text-white relative overflow-hidden">
      {/* Luminous accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#7052c9]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#a78bfa]/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/15 border border-amber-400/30 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KẾT QUẢ KIỂM CHỨNG THỰC TẾ</span>
          </div>

          <h2 className="font-['Manrope'] font-black text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffe4be] via-[#ffd099] to-[#ffffff] uppercase tracking-tight">
            HIỆU QUẢ CẢI THIỆN LÀN DA RÕ RỆT
          </h2>
          <p className="text-sm sm:text-base text-purple-200/80 mt-2 max-w-2xl mx-auto">
            Khảo sát trên 1.200 phụ nữ sau 14–28 ngày sử dụng máy 6-in-1 đều đặn mỗi tối 15 phút
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('moisture')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'moisture'
                ? 'bg-amber-400 text-purple-950 shadow-[0_4px_15px_rgba(251,191,36,0.3)] ring-2 ring-amber-300'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>1. Thẩm Thấu Dưỡng Chất & Căng Mịn</span>
          </button>

          <button
            onClick={() => setActiveTab('acne')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'acne'
                ? 'bg-amber-400 text-purple-950 shadow-[0_4px_15px_rgba(251,191,36,0.3)] ring-2 ring-amber-300'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            <Snowflake className="w-4 h-4" />
            <span>2. Làm Dịu Da Ửng Đỏ & Da Mụn</span>
          </button>

          <button
            onClick={() => setActiveTab('cleanse')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'cleanse'
                ? 'bg-amber-400 text-purple-950 shadow-[0_4px_15px_rgba(251,191,36,0.3)] ring-2 ring-amber-300'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>3. Làm Sạch Sâu & Thông Thoáng</span>
          </button>
        </div>

        {/* Tab 1 Content: Moisture & Glow */}
        {activeTab === 'moisture' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center bg-white/5 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-white/10 shadow-2xl animate-fade-in">
            <div className="md:col-span-5 rounded-2xl border border-purple-400/30 overflow-hidden shadow-xl group max-w-sm mx-auto w-full aspect-square">
              <img
                src={moistureCleanImg}
                alt="Trước và sau khi dùng máy đẩy tinh chất S1"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
              />
            </div>

            <div className="md:col-span-7 space-y-3.5">
              <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-xs font-bold uppercase border border-purple-400/30">
                Chế độ Nutrition Import + Nhiệt 42°C
              </div>

              <h3 className="font-['Manrope'] font-extrabold text-xl sm:text-2xl text-amber-200 leading-tight">
                GIÚP DƯỠNG CHẤT THẤM TỐT HƠN – DA ẨM MƯỢT CĂNG MỊN
              </h3>

              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                Kết hợp sóng siêu âm và nhiệt ấm 42°C mở khóa biểu bì, giúp serum và ampoule thẩm thấu sâu gấp <strong>8 lần</strong> so với thoa tay thông thường.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5 bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-xs sm:text-sm block">Cấp ẩm tức thì tầng sâu:</strong>
                    <span className="text-[11px] sm:text-xs text-purple-200/80">Da ngậm nước, căng mướt và đàn hồi rõ rệt ngay sáng hôm sau.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-xs sm:text-sm block">Khóa chặt tinh chất dưỡng:</strong>
                    <span className="text-[11px] sm:text-xs text-purple-200/80">Không bị bay hơi hay dính bết trên gối khi ngủ.</span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href="#order-form-final"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:scale-105 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Trải nghiệm làn da căng mọng</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 Content: Acne & Blue Light Cooling */}
        {activeTab === 'acne' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center bg-white/5 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-white/10 shadow-2xl animate-fade-in">
            <div className="md:col-span-5 rounded-2xl border border-cyan-400/30 overflow-hidden shadow-xl group max-w-sm mx-auto w-full aspect-square">
              <img
                src={acneCleanImg}
                alt="Trước và sau khi dùng chế độ ánh sáng xanh làm mát"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
              />
            </div>

            <div className="md:col-span-7 space-y-3.5">
              <div className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-xs font-bold uppercase border border-cyan-400/30">
                Ánh Sáng Xanh Blue Light + Làm Mát Dịu Da
              </div>

              <h3 className="font-['Manrope'] font-extrabold text-xl sm:text-2xl text-cyan-200 leading-tight">
                LÀM DỊU DA ỬNG ĐỎ – HỖ TRỢ CHĂM SÓC DA DỄ NỔI MỤN
              </h3>

              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                Đầu chườm mát tức thì kết hợp bước sóng ánh sáng xanh 465nm giúp ức chế vi khuẩn P.acnes, làm xẹp nhanh các vết ửng đỏ và trả lại làn da dịu mát sảng khoái.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5 bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-xs sm:text-sm block">Làm mát dịu da tức thì:</strong>
                    <span className="text-[11px] sm:text-xs text-purple-200/80">Giảm cảm giác nóng rát, châm chích sau khi đi nắng hoặc nặn mụn.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-xs sm:text-sm block">Hỗ trợ se khít lỗ chân lông:</strong>
                    <span className="text-[11px] sm:text-xs text-purple-200/80">Cân bằng dầu thừa, hạn chế bít tắc gây mụn tái phát.</span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href="#order-form-final"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:scale-105 transition-all"
                >
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>Đặt mua chế độ làm mát</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3 Content: Deep Cleanse Technology */}
        {activeTab === 'cleanse' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center bg-white/5 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-white/10 shadow-2xl animate-fade-in">
            <div className="md:col-span-5 rounded-2xl border border-purple-400/30 overflow-hidden shadow-xl group max-w-sm mx-auto w-full aspect-square">
              <img
                src={cleanseCleanImg}
                alt="Công nghệ làm sạch sâu sóng rung ion siêu âm"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
              />
            </div>

            <div className="md:col-span-7 space-y-3.5">
              <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-xs font-bold uppercase border border-purple-400/30">
                Ion Galvanic + Rung Siêu Âm Tần Số Cao
              </div>

              <h3 className="font-['Manrope'] font-extrabold text-xl sm:text-2xl text-amber-200 leading-tight">
                LÀM SẠCH SÂU LỖ CHÂN LÔNG – CUỐN TRÔI BỤI BẨN & DẦU THỪA
              </h3>

              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                Kẹp bông tẩy trang lên đầu máy, ion dương (+) hút sạch bụi mịn PM2.5, bã nhờn ẩn sâu trong nang lông mà rửa mặt bằng tay hoàn toàn không thể chạm tới.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5 bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-xs sm:text-sm block">Giảm cảm giác bí tắc:</strong>
                    <span className="text-[11px] sm:text-xs text-purple-200/80">Lỗ chân lông thông thoáng, giảm hình thành mụn đầu đen tới 89%.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-xs sm:text-sm block">Kèm vòng kẹp bông tiện lợi:</strong>
                    <span className="text-[11px] sm:text-xs text-purple-200/80">Cố định bông tẩy trang chắc chắn, thao tác lướt êm ái trên da.</span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href="#order-form-final"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:scale-105 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Trải nghiệm làm sạch sâu</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
