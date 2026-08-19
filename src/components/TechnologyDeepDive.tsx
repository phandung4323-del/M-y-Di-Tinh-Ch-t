import React, { useState } from 'react';
import { Sparkles, Flame, Activity, Snowflake, Sliders, CheckCircle2, Shield, HeartPulse, RefreshCw, Zap } from 'lucide-react';
import ultrasonicImg from '../assets/images/ultrasonic_cleansing_tech_1787039501187.jpg';
import coolingModelImg from '../assets/images/cryo_cooling_model_1787039483405.jpg';

export const TechnologyDeepDive: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(2);

  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 bg-[#f8f7ff] space-y-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Technology Highlight 1: Ultrasonic Sonic Cleansing (Poster 10) */}
        <div className="bg-gradient-to-r from-[#1b1435] to-[#26174a] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-purple-400/20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-400/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CÔNG NGHỆ LÀM SẠCH ĐỘT PHÁ</span>
              </div>

              <h2 className="font-['Manrope'] font-black text-2xl sm:text-3xl text-amber-200 uppercase leading-snug">
                LÀM SẠCH SÂU LỖ CHÂN LÔNG – CUỐN TRÔI BỤI BẨN & DẦU THỪA
              </h2>

              <p className="text-sm text-purple-100/90 leading-relaxed">
                Tích hợp vi dòng Ion Galvanic phân cực cùng sóng rung siêu âm tần số 12.000 nhịp/phút, đánh bật các cặn bã nhờn, tế bào chết và bụi mịn sâu trong chân lông.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-sm shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white text-sm block">Rung Tần Số Cao:</strong>
                    <span className="text-xs text-purple-200/80">Rung động mạnh mẽ vi sóng giúp làm mềm cồi mụn cám và làm sạch sâu.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-sm shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white text-sm block">Làm Sạch Toàn Diện:</strong>
                    <span className="text-xs text-purple-200/80">Cuốn trôi bụi bẩn, cặn trang điểm bám chặt sau lớp kem nền.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-sm shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white text-sm block">Da Thông Thoáng Mịn Màng:</strong>
                    <span className="text-xs text-purple-200/80">Ngăn chặn vi khuẩn sinh sôi, giúp da hấp thu serum gấp nhiều lần.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-purple-400/30 shadow-2xl group max-w-md mx-auto w-full">
              <img
                src={ultrasonicImg}
                alt="Sóng siêu âm làm sạch sâu chân lông"
                referrerPolicy="no-referrer"
                className="w-full h-60 sm:h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Technology Highlight 2: Cryo Cooling + Blue Light (Poster 8) */}
        <div className="bg-gradient-to-r from-[#0d2238] to-[#151c38] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-cyan-400/20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-cyan-400/30 shadow-2xl group order-2 lg:order-1 max-w-md mx-auto w-full">
              <img
                src={coolingModelImg}
                alt="Chườm mát dịu da bằng ánh sáng xanh"
                referrerPolicy="no-referrer"
                className="w-full h-60 sm:h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-cyan-400/20 border border-cyan-400/40 rounded-full text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Snowflake className="w-3.5 h-3.5" />
                <span>LIỆU PHÁP CRYO ICE LẠNH</span>
              </div>

              <h2 className="font-['Manrope'] font-black text-2xl sm:text-3xl text-cyan-200 uppercase leading-snug">
                MÁT LẠNH DỊU DA – CÂN BẰNG ĐỘ ẨM & THU NHỎ LỖ CHÂN LÔNG
              </h2>

              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Tấm bán dẫn làm lạnh nhanh tới 10°C trong vòng 3 giây kết hợp ánh sáng xanh 465nm giúp khóa chặt mọi giọt dưỡng chất và se khít mịn màng làn da.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center font-bold text-sm shrink-0">
                    <Snowflake className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white text-sm block">Mát Lạnh Dịu Da Tức Thì:</strong>
                    <span className="text-xs text-cyan-200/80">Làm dịu làn da mệt mỏi, giải tỏa cảm giác nóng rát và kích ứng.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center font-bold text-sm shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white text-sm block">Thu Nhỏ Bề Mặt Chân Lông:</strong>
                    <span className="text-xs text-cyan-200/80">Khóa ẩm chặt chẽ, bề mặt da căng mướt, mềm mịn không tì vết.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center font-bold text-sm shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white text-sm block">Hỗ Trợ Cân Bằng Dầu – Ẩm:</strong>
                    <span className="text-xs text-cyan-200/80">Kiểm soát tuyến bã nhờn, da không còn bóng nhẫy dầu thừa.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Intensity Levels Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2d9f3] shadow-sm">
          <h3 className="font-['Manrope'] font-bold text-xl sm:text-2xl text-[#1c1b1b] text-center mb-2">
            3 MỨC ĐỘ TÙY CHỈNH CHUYÊN SÂU
          </h3>
          <p className="text-xs sm:text-sm text-[#484552] text-center mb-6 max-w-lg mx-auto">
            Dễ dàng điều chỉnh qua nút bấm tiện lợi trên thân máy
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
            <button
              onClick={() => setSelectedLevel(1)}
              className={`p-4 rounded-2xl text-center border transition-all ${
                selectedLevel === 1
                  ? 'bg-[#e6deff] border-[#6050af] text-[#6050af] ring-2 ring-[#c9beff]'
                  : 'bg-[#f8f7ff] border-[#e2d9f3] text-[#484552] hover:bg-white'
              }`}
            >
              <span className="font-bold text-sm block mb-1">Cấp 1 • Dịu Nhẹ</span>
              <span className="text-xs text-[#5d5e65]">Thư giãn, làm quen và chăm sóc vùng da nhạy cảm / mắt</span>
            </button>

            <button
              onClick={() => setSelectedLevel(2)}
              className={`p-4 rounded-2xl text-center border transition-all ${
                selectedLevel === 2
                  ? 'bg-[#e6deff] border-[#6050af] text-[#6050af] ring-2 ring-[#c9beff]'
                  : 'bg-[#f8f7ff] border-[#e2d9f3] text-[#484552] hover:bg-white'
              }`}
            >
              <span className="font-bold text-sm block mb-1">Cấp 2 • Tiêu Chuẩn</span>
              <span className="text-xs text-[#5d5e65]">Massage thẩm thấu serum và nâng cơ hằng ngày</span>
            </button>

            <button
              onClick={() => setSelectedLevel(3)}
              className={`p-4 rounded-2xl text-center border transition-all ${
                selectedLevel === 3
                  ? 'bg-[#e6deff] border-[#6050af] text-[#6050af] ring-2 ring-[#c9beff]'
                  : 'bg-[#f8f7ff] border-[#e2d9f3] text-[#484552] hover:bg-white'
              }`}
            >
              <span className="font-bold text-sm block mb-1">Cấp 3 • Chuyên Sâu</span>
              <span className="text-xs text-[#5d5e65]">Liệu trình nâng cơ vi dòng EMS định hình cằm V-line</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
