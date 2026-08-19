import React from 'react';
import { Bug, Sparkles, Frown, EyeOff, AlertTriangle, Moon, Check, ArrowRight } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 bg-[#fcf9f8]">
      <div className="max-w-4xl mx-auto">
        {/* Section 1: Skincare Mistakes & Underlying Causes */}
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-[#ffdad6] text-[#93000a] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            Vấn Đề Thường Gặp
          </span>
          <h2 className="font-['Manrope'] font-bold text-2xl sm:text-3xl text-[#1c1b1b] leading-snug">
            DA ĐƯỢC CHĂM SÓC HẰNG NGÀY<br />
            <span className="text-[#615b71] font-medium">NHƯNG BẠN ĐÃ CHĂM ĐÚNG CÁCH?</span>
          </h2>
          <p className="text-sm text-[#5d5e65] mt-1 max-w-xl mx-auto">
            Dù bôi kem dưỡng đắt tiền hàng triệu đồng, 85% dưỡng chất chỉ nằm trên bề mặt nếu không có công nghệ đẩy ion và nhiệt ấm hỗ trợ.
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Card 1 */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center hover:border-[#9d8df1] transition-all group">
            <div className="w-12 h-12 bg-[#ffdad6] text-[#ba1a1a] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Bug className="w-6 h-6" />
            </div>
            <h3 className="font-['Manrope'] font-bold text-sm text-[#1c1b1b] mb-1">
              Bụi bẩn & Bã nhờn
            </h3>
            <p className="text-xs text-[#797583]">
              Ẩn sâu trong lỗ chân lông, gây mụn ẩn & lỗ chân lông to
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center hover:border-[#9d8df1] transition-all group">
            <div className="w-12 h-12 bg-[#ffdad6] text-[#ba1a1a] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-['Manrope'] font-bold text-sm text-[#1c1b1b] mb-1">
              Cặn trang điểm sót lại
            </h3>
            <p className="text-xs text-[#797583]">
              Tẩy trang bằng tay không sạch, làm da xỉn màu và bít tắc
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center hover:border-[#9d8df1] transition-all group">
            <div className="w-12 h-12 bg-[#dfdfe7] text-[#5d5e65] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Frown className="w-6 h-6" />
            </div>
            <h3 className="font-['Manrope'] font-bold text-sm text-[#1c1b1b] mb-1">
              Da xỉn màu, kém hấp thu
            </h3>
            <p className="text-xs text-[#797583]">
              Lớp biểu bì dày cản trở serum thẩm thấu vào lớp collagen
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center hover:border-[#9d8df1] transition-all group">
            <div className="w-12 h-12 bg-[#dfdfe7] text-[#5d5e65] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="font-['Manrope'] font-bold text-sm text-[#1c1b1b] mb-1">
              Mắt mệt mỏi, thâm quầng
            </h3>
            <p className="text-xs text-[#797583]">
              Ánh sáng xanh từ điện thoại khiến vùng mắt thâm quầng và nhăn
            </p>
          </div>
        </div>

        {/* Section 2: Pain point deep dive */}
        <div className="bg-gradient-to-r from-[#f6f3f2] to-[#e6deff]/40 p-6 sm:p-8 rounded-3xl border border-[#e2d9f3]">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-['Manrope'] font-bold text-xl sm:text-2xl text-[#1c1b1b] mb-3">
              NỖI ÁM ẢNH ĐAU MỎI CƠ MẶT & CỔ VAI GÁY
            </h3>
            <p className="text-sm text-[#484552] mb-6">
              Ngồi làm việc máy tính nhiều giờ, căng thẳng thần kinh, tư thế sai... khiến cơ mặt chùng nhão, cơ cổ vai co cứng, máu huyết lưu thông kém dẫn đến vẻ ngoài mệt mỏi và lão hóa nhanh hơn tuổi thật.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="bg-white p-4 rounded-xl border border-[#ffdad6] flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                  <Frown className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#1c1b1b] uppercase">Mệt mỏi triền miên</h4>
                  <p className="text-xs text-[#797583] mt-0.5">Khuôn mặt thiếu sức sống, cơ hàm căng cứng, nếp nhăn hằn sâu.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#ffdad6] flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#1c1b1b] uppercase">Mất ngủ, khó sâu giấc</h4>
                  <p className="text-xs text-[#797583] mt-0.5">Áp lực tuần hoàn kém khiến vùng trán và mắt luôn trong tình trạng căng thẳng.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
