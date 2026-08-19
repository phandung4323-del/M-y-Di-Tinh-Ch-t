import React, { useState } from 'react';
import { Droplets, Sparkles, Zap, Flame, Eye, Snowflake, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ModeDetail {
  number: string;
  name: string;
  subname: string;
  desc: string;
  colorTag: string;
  badgeBg: string;
  duration: string;
  tech: string;
  highlights: string[];
}

const MODES_LIST: ModeDetail[] = [
  {
    number: '01',
    name: 'LÀM SẠCH SÂU',
    subname: 'Deep Cleansing Mode',
    desc: 'Hỗ trợ làm sạch bụi bẩn, dầu thừa và cặn trang điểm ẩn sâu dưới lỗ chân lông.',
    colorTag: 'text-amber-300',
    badgeBg: 'bg-purple-900/60 border-purple-500/40',
    duration: '4 Phút',
    tech: 'Ion (+) + Nhiệt Ấm 42°C + Rung Vi Sóng',
    highlights: ['Hút sạch cặn trang điểm', 'Giảm bít tắc chân lông', 'Dùng kèm bông tẩy trang']
  },
  {
    number: '02',
    name: 'HỖ TRỢ ĐƯA DƯỠNG CHẤT',
    subname: 'Nutrition Import',
    desc: 'Giúp quá trình chăm sóc da với serum, tinh chất thuận tiện hơn, thẩm thấu tầng sâu.',
    colorTag: 'text-amber-300',
    badgeBg: 'bg-purple-900/60 border-purple-500/40',
    duration: '4 Phút',
    tech: 'Điện Di Ion (-) + Sóng Âm Siêu Tần',
    highlights: ['Thấm sâu gấp 8 lần thoa tay', 'Da căng mọng ngậm nước', 'Khóa tinh chất trên da']
  },
  {
    number: '03',
    name: 'CHĂM SÓC NẾP NHĂN',
    subname: 'EMS Care & Lifting',
    desc: 'Massage cơ mặt, hỗ trợ làn da trông săn chắc, định hình đường viền cằm V-line.',
    colorTag: 'text-amber-300',
    badgeBg: 'bg-purple-900/60 border-purple-500/40',
    duration: '4 Phút',
    tech: 'Vi Dòng EMS Microcurrent Sinh Học',
    highlights: ['Kích thích săn chắc cơ mặt', 'Nâng cung hàm thon gọn', 'Hỗ trợ mờ rãnh cười']
  },
  {
    number: '04',
    name: 'CHĂM DA BẰNG ÁNH SÁNG',
    subname: 'Anti-Aging Phototherapy',
    desc: 'Nhiều chế độ ánh sáng sinh học đáp ứng trọn vẹn mọi nhu cầu tái tạo làn da.',
    colorTag: 'text-rose-300',
    badgeBg: 'bg-rose-950/60 border-rose-500/40',
    duration: '4 Phút',
    tech: 'Ánh Sáng Đỏ 630nm Tái Sinh Collagen',
    highlights: ['Kích sinh nguyên bào sợi', 'Làm đều màu da xỉn', 'Tăng độ đàn hồi']
  },
  {
    number: '05',
    name: 'CHĂM SÓC VÙNG MẮT',
    subname: 'Eye Care Precision',
    desc: 'Massage nhẹ nhàng vùng da quanh mắt, hỗ trợ da trông mịn màng và tươi tắn hơn.',
    colorTag: 'text-amber-300',
    badgeBg: 'bg-purple-900/60 border-purple-500/40',
    duration: '3 Phút',
    tech: 'Đầu Bo Tròn Vàng + Rung Vi Mô',
    highlights: ['Giảm quầng thâm bọng mắt', 'Mờ vết chân chim đuôi mắt', 'Thư giãn cơ mắt mệt mỏi']
  },
  {
    number: '06',
    name: 'LÀM MÁT – SE KHÍT DA',
    subname: 'Blue Light Cooling',
    desc: 'Mang lại cảm giác mát dịu tức thì, khóa ẩm và giúp bề mặt da trông mịn màng hơn.',
    colorTag: 'text-cyan-300',
    badgeBg: 'bg-cyan-950/60 border-cyan-500/40',
    duration: '3 Phút',
    tech: 'Bán Dẫn Cryo Lạnh 10°C + Ánh Sáng Xanh 465nm',
    highlights: ['Làm dịu da ửng đỏ sau nắng', 'Khóa se khít lỗ chân lông', 'Diệt khuẩn hỗ trợ da mụn']
  }
];

export const SixInOneFeatures: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  return (
    <section id="six-modes" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#160f2e] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#6050af]/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/15 border border-amber-400/30 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ĐA NĂNG TOÀN DIỆN</span>
          </div>

          <h2 className="font-['Manrope'] font-black text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffe4be] via-[#ffd099] to-[#ffffff] uppercase tracking-tight">
            6 CHẾ ĐỘ CHĂM SÓC DA ĐA NĂNG
          </h2>
          <p className="text-sm sm:text-base text-purple-200/80 mt-2 max-w-2xl mx-auto">
            Trọn bộ 6 bước công nghệ chuyên sâu được tích hợp hoàn hảo trong một thân máy tinh gọn
          </p>
        </div>

        {/* 6 Grid Luxury Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODES_LIST.map((mode) => {
            const isExpanded = selectedMode === mode.number;

            return (
              <div
                key={mode.number}
                onClick={() => setSelectedMode(isExpanded ? null : mode.number)}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer border ${
                  isExpanded
                    ? 'bg-gradient-to-b from-[#2d1b54] to-[#1e133a] border-amber-400 shadow-[0_10px_30px_rgba(251,191,36,0.15)] scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-400/50 shadow-lg'
                } backdrop-blur-md flex flex-col justify-between group`}
              >
                <div>
                  {/* Top Number Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-['Manrope'] font-extrabold text-2xl text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-xl border border-amber-400/30">
                        {mode.number}.
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-purple-300/80 font-bold">
                        {mode.subname}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-purple-200 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                      {mode.duration}
                    </span>
                  </div>

                  {/* Mode Title */}
                  <h3 className={`font-['Manrope'] font-bold text-lg mb-2 ${mode.colorTag} tracking-wide`}>
                    {mode.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed mb-4">
                    {mode.desc}
                  </p>
                </div>

                {/* Tech & Expansion */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-[11px] text-amber-200/90 font-medium mb-2 flex items-center justify-between">
                    <span>⚡ {mode.tech}</span>
                    <ChevronRight className={`w-4 h-4 text-purple-300 transition-transform ${isExpanded ? 'rotate-90 text-amber-400' : 'group-hover:translate-x-1'}`} />
                  </div>

                  {/* Highlight bullets */}
                  <div className="space-y-1.5 mt-3 pt-2 border-t border-white/5">
                    {mode.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-purple-200/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-purple-900/60 via-purple-800/40 to-purple-900/60 border border-purple-400/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-['Manrope'] font-bold text-white text-base sm:text-lg">
              Tùy chỉnh 3 mức cường độ từ nhẹ đến nâng cao
            </h4>
            <p className="text-xs text-purple-200/80 mt-0.5">
              Phù hợp cho cả làn da nhạy cảm nhất lẫn người quen dùng liệu trình chuyên sâu
            </p>
          </div>

          <a
            href="#order-form-final"
            className="py-3 px-6 bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:scale-105 transition-all shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>ĐẶT MÁY 6-IN-1 NGAY</span>
          </a>
        </div>

      </div>
    </section>
  );
};
