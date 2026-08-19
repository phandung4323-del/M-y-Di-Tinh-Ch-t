import React from 'react';
import { Gift, Award, CheckCircle, Package, ShieldCheck } from 'lucide-react';

export const GiftAndSpecsSection: React.FC = () => {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 bg-[#f6f3f2]">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Gift Box Spotlight */}
        <div className="text-center border-2 border-[#6050af]/20 rounded-3xl p-6 sm:p-8 bg-white relative shadow-sm">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6050af] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5" />
            <span>Món Quà Sức Khỏe & Sắc Đẹp</span>
          </span>

          <h2 className="font-['Manrope'] font-bold text-2xl sm:text-3xl text-[#6050af] mt-3 mb-3">
            TẶNG NGƯỜI TRÂN QUÝ
          </h2>

          <p className="text-xs sm:text-sm text-[#484552] max-w-xl mx-auto leading-relaxed mb-6">
            Đi kèm <strong>Hộp Quà Premium Gift Box</strong> sang trọng dập kim nhũ vàng, đây là món quà thiết thực và tinh tế nhất thể hiện sự quan tâm tới mẹ, vợ, đối tác, hay tự thưởng cho chính bản thân bạn sau những ngày làm việc vất vả.
          </p>

          <div className="flex justify-center gap-4 text-xs font-semibold text-[#1c1b1b] flex-wrap">
            <div className="flex items-center gap-1.5 bg-[#f8f7ff] px-3.5 py-1.5 rounded-full border border-[#e2d9f3]">
              <CheckCircle className="w-3.5 h-3.5 text-[#6050af]" />
              <span>Hộp quà dập nổi ép kim cao cấp</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#f8f7ff] px-3.5 py-1.5 rounded-full border border-[#e2d9f3]">
              <CheckCircle className="w-3.5 h-3.5 text-[#6050af]" />
              <span>Tặng kèm thiệp viết tay chúc mừng</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#f8f7ff] px-3.5 py-1.5 rounded-full border border-[#e2d9f3]">
              <CheckCircle className="w-3.5 h-3.5 text-[#6050af]" />
              <span>Túi xách quà tặng thời trang</span>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2d9f3] shadow-sm">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-[#6050af] uppercase tracking-wider block mb-1">
              Thông Tin Kỹ Thuật
            </span>
            <h3 className="font-['Manrope'] font-bold text-xl sm:text-2xl text-[#1c1b1b]">
              THÔNG SỐ KỸ THUẬT CHI TIẾT
            </h3>
          </div>

          <ul className="divide-y divide-[#f0eded] text-xs sm:text-sm text-[#484552]">
            <li className="py-3 flex justify-between items-center">
              <span className="text-[#797583]">Model sản phẩm:</span>
              <strong className="text-[#1c1b1b]">Lumina S1 Precision (2026 Edition)</strong>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-[#797583]">6 Chức năng tích hợp:</span>
              <strong className="text-[#1c1b1b]">Cleanse • Infuse • EMS Lift • Anti-Aging • Eye Care • Cryo Cool</strong>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-[#797583]">Dung lượng Pin:</span>
              <strong className="text-[#1c1b1b]">1200mAh Lithium-ion (Dùng 20 ngày)</strong>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-[#797583]">Cổng sạc:</span>
              <strong className="text-[#1c1b1b]">Type-C sạc nhanh 5V/1A</strong>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-[#797583]">Nhiệt độ hoạt động:</span>
              <strong className="text-[#1c1b1b]">10°C (Làm lạnh) - 42°C (Hồng ngoại)</strong>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-[#797583]">Tự động ngắt thông minh:</span>
              <strong className="text-[#1c1b1b]">15 phút an toàn chuẩn y khoa</strong>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-[#797583]">Trọng lượng máy:</span>
              <strong className="text-[#1c1b1b]">150g (Cầm nhẹ êm ái)</strong>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-[#797583]">Chất liệu:</span>
              <strong className="text-[#1c1b1b]">Hợp kim y tế kháng khuẩn + Nhựa ABS nguyên sinh</strong>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-[#797583]">Bảo hành:</span>
              <strong className="text-emerald-700">12 tháng 1 đổi 1 chính hãng</strong>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
