import React from 'react';
import { Home, Briefcase, Car, Plane, Check, Sparkles, HeartHandshake } from 'lucide-react';

export const UseCasesSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#f6f3f2]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Use cases: Home / Office / Car */}
        <div>
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-white text-[#6050af] rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-[#e2d9f3]">
              Linh Hoạt Không Giới Hạn
            </span>
            <h2 className="font-['Manrope'] font-bold text-2xl sm:text-3xl text-[#1c1b1b]">
              THƯ GIÃN MỌI LÚC, MỌI NƠI
            </h2>
            <p className="text-sm text-[#484552] mt-1">
              Trọng lượng siêu nhẹ chỉ 150g, pin 1200mAh dùng 20 ngày không cần cắm dây
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl text-center soft-shadow border border-[#e5e2e1] hover:border-[#9d8df1] transition-all">
              <div className="w-16 h-16 mx-auto bg-[#f8f7ff] rounded-2xl flex items-center justify-center shadow-xs mb-3 text-[#6050af]">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="font-['Manrope'] font-bold text-base text-[#1c1b1b] mb-1">
                Tại Nhà
              </h3>
              <p className="text-xs text-[#5d5e65]">
                Chu trình skincare tối thư thái trước khi đi ngủ, thư giãn cùng âm nhạc.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl text-center soft-shadow border border-[#e5e2e1] hover:border-[#9d8df1] transition-all">
              <div className="w-16 h-16 mx-auto bg-[#f8f7ff] rounded-2xl flex items-center justify-center shadow-xs mb-3 text-[#6050af]">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="font-['Manrope'] font-bold text-base text-[#1c1b1b] mb-1">
                Văn Phòng
              </h3>
              <p className="text-xs text-[#5d5e65]">
                5 phút giải lao giữa giờ xoa dịu vùng mắt mỏi mệt vì ánh sáng màn hình.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl text-center soft-shadow border border-[#e5e2e1] hover:border-[#9d8df1] transition-all">
              <div className="w-16 h-16 mx-auto bg-[#f8f7ff] rounded-2xl flex items-center justify-center shadow-xs mb-3 text-[#6050af]">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="font-['Manrope'] font-bold text-base text-[#1c1b1b] mb-1">
                Trên Ô Tô & Du Lịch
              </h3>
              <p className="text-xs text-[#5d5e65]">
                Bỏ túi xách gọn gàng, giữ cho làn da luôn tươi tắn sau những chuyến bay dài.
              </p>
            </div>
          </div>
        </div>

        {/* 8 Buying Reasons Box */}
        <div className="bg-[#e6deff]/40 border border-[#c9beff] rounded-3xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-[#6050af] uppercase tracking-wider block mb-1">
              Giá Trị Thực Tế
            </span>
            <h3 className="font-['Manrope'] font-bold text-xl sm:text-2xl text-[#6050af]">
              8 LÝ DO BẠN NÊN SỞ HỮU S1 NGAY HÔM NAY
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs sm:text-sm font-semibold text-[#1c1b1b]">
            <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-xs">
              <Check className="w-4 h-4 text-[#6050af] shrink-0" />
              <span>Giải mỏi tức thì</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-xs">
              <Check className="w-4 h-4 text-[#6050af] shrink-0" />
              <span>Tiết kiệm chi phí Spa</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-xs">
              <Check className="w-4 h-4 text-[#6050af] shrink-0" />
              <span>Nhỏ gọn 150g di động</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-xs">
              <Check className="w-4 h-4 text-[#6050af] shrink-0" />
              <span>Nhiệt sưởi 42°C trị liệu</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-xs">
              <Check className="w-4 h-4 text-[#6050af] shrink-0" />
              <span>Dùng cho mọi lứa tuổi</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-xs">
              <Check className="w-4 h-4 text-[#6050af] shrink-0" />
              <span>Tự ngắt an toàn 15p</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-xs">
              <Check className="w-4 h-4 text-[#6050af] shrink-0" />
              <span>Chất liệu y tế bền bỉ</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-xs">
              <Check className="w-4 h-4 text-[#6050af] shrink-0" />
              <span>Quà tặng ý nghĩa</span>
            </div>
          </div>
        </div>

        {/* Value Breakdown: ~2.000đ/ngày */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2d9f3] text-center shadow-sm">
          <h3 className="font-['Manrope'] font-bold text-xl sm:text-2xl text-[#1c1b1b] mb-2">
            KHOẢN ĐẦU TƯ THÔNG MINH CHO NHAN SẮC
          </h3>
          <p className="text-sm text-[#484552] max-w-xl mx-auto mb-4">
            Chỉ với <strong className="text-[#6050af] text-lg">~2.000đ / ngày</strong>, bạn sở hữu ngay một chuyên viên chăm sóc da riêng tại nhà trọn đời. Rẻ hơn gấp 50 lần so với 1 buổi đi Spa (300.000đ - 800.000đ/buổi).
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f8f7ff] rounded-full text-xs font-bold text-[#6050af] border border-[#e2d9f3]">
            <Sparkles className="w-4 h-4 text-[#9d8df1]" />
            <span>Cam kết hoàn tiền 100% nếu không hài lòng trong 7 ngày</span>
          </div>
        </div>
      </div>
    </section>
  );
};
