import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Heart, Sliders, HandMetal } from 'lucide-react';
import purpleImg from '../assets/images/s1_purple_hero_1787038880318.jpg';

export const ErgonomicsSection: React.FC = () => {
  return (
    <section id="ergonomics" className="py-8 sm:py-10 px-4 sm:px-6 bg-[#fcf9f8] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header matching Poster 4 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#e6deff] text-[#6050af] rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-[#c9beff]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NHỎ GỌN • DỄ CẦM • TIỆN SỬ DỤNG</span>
          </div>

          <h2 className="font-['Manrope'] font-black text-2xl sm:text-4xl text-[#1c1b1b] uppercase tracking-tight">
            THIẾT KẾ CAO CẤP – TINH TẾ TỪNG CHI TIẾT
          </h2>
          <p className="text-sm sm:text-base text-[#484552] mt-1 max-w-2xl mx-auto">
            Gọt giũa hoàn hảo trên từng đường cong kim loại, mang lại trải nghiệm cầm nắm êm ái và sang trọng chuẩn quý cô.
          </p>
        </div>

        {/* 3 Callout Cards matching Poster 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          
          {/* Detail 1: Viền mạ sáng bóng */}
          <div className="bg-white p-6 rounded-3xl soft-shadow border border-[#e5e2e1] hover:border-[#6050af] transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                Điểm Nhấn Vàng Gold
              </span>
              <h3 className="font-['Manrope'] font-bold text-lg text-[#1c1b1b] mt-2 mb-1.5">
                Viền Mạ Sáng Bóng
              </h3>
              <p className="text-xs sm:text-sm text-[#5d5e65] leading-relaxed">
                Được mạ xi vàng công nghệ PVD cao cấp, chống trầy xước và tạo điểm nhấn sang trọng, hiện đại cho bàn trang điểm.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Chống oxy hóa & chống gỉ 100%</span>
            </div>
          </div>

          {/* Detail 2: Nút bấm tiện lợi */}
          <div className="bg-white p-6 rounded-3xl soft-shadow border border-[#e5e2e1] hover:border-[#6050af] transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#e6deff] text-[#6050af] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sliders className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#6050af] bg-[#f8f7ff] px-2.5 py-1 rounded-md uppercase tracking-wider">
                Thao Tác 1 Chạm
              </span>
              <h3 className="font-['Manrope'] font-bold text-lg text-[#1c1b1b] mt-2 mb-1.5">
                Nút Bấm Tiện Lợi
              </h3>
              <p className="text-xs sm:text-sm text-[#5d5e65] leading-relaxed">
                Thiết kế chống trượt với độ nảy êm ái, dễ dàng chuyển đổi 6 chế độ và 3 mức độ rung chỉ bằng một tay trong lúc chăm sóc.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Màn hình LED hiển thị rõ ràng</span>
            </div>
          </div>

          {/* Detail 3: Thân máy thon gọn */}
          <div className="bg-white p-6 rounded-3xl soft-shadow border border-[#e5e2e1] hover:border-[#6050af] transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HandMetal className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                Trọng Lượng 150g
              </span>
              <h3 className="font-['Manrope'] font-bold text-lg text-[#1c1b1b] mt-2 mb-1.5">
                Thân Máy Thon Gọn
              </h3>
              <p className="text-xs sm:text-sm text-[#5d5e65] leading-relaxed">
                Cầm chắc tay không bị mỏi khi thao tác 15 phút, kích thước nhỏ gọn dễ dàng mang theo trong túi xách khi đi du lịch hoặc công tác.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Kèm đế sạc đứng thời thượng</span>
            </div>
          </div>

        </div>

        {/* Ergonomic Angle Feature Highlight */}
        <div className="bg-gradient-to-r from-[#241b47] to-[#160f2e] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase border border-amber-400/30">
              Góc Nghiêng Vàng 45°
            </span>
            <h3 className="font-['Manrope'] font-bold text-xl sm:text-2xl text-amber-100">
              Tiếp xúc 100% diện tích bề mặt da khuôn mặt
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl">
              Đầu máy vát cong đa chiều lướt mượt mà qua gò má, cằm V-line, trán và cả khóe cánh mũi, bọng mắt mà không gây tì đè tổn thương da.
            </p>
          </div>

          <a
            href="#order-form-final"
            className="py-3.5 px-6 bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:scale-105 transition-all shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>MUA NGAY GIÁ ƯU ĐÃI</span>
          </a>
        </div>

      </div>
    </section>
  );
};
