import React from 'react';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#1c1b1b] text-white pt-8 pb-20 md:pb-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#9d8df1] text-[#1c1b1b] flex items-center justify-center font-bold shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-['Manrope'] font-bold text-lg text-white">
                S1 PRECISION
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Lumina Essence S1 - Máy di tinh chất và massage chăm sóc da 6-in-1 cao cấp, giải pháp chăm sóc sắc đẹp chuẩn spa ngay tại ngôi nhà của bạn.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Chứng nhận kiểm định an toàn y tế CE / RoHS</span>
            </div>
          </div>

          {/* Hotline & Contact */}
          <div>
            <h4 className="font-['Manrope'] font-bold text-sm text-white uppercase tracking-wider mb-3">
              Liên Hệ & Hỗ Trợ
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9d8df1]" />
                <span>Hotline 24/7: <strong><a href="tel:0398636869" className="hover:underline">0398.63.68.69</a></strong> (Miễn phí cước)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#9d8df1]" />
                <span>Email: <strong>cskh@lumina-s1.vn</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#9d8df1] shrink-0 mt-0.5" />
                <span>Quận 1, TP. Hồ Chí Minh</span>
              </li>
            </ul>
          </div>

          {/* Guarantee Policies */}
          <div>
            <h4 className="font-['Manrope'] font-bold text-sm text-white uppercase tracking-wider mb-3">
              Chính Sách Bán Hàng
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>• Bảo hành chính hãng 12 tháng</li>
              <li>• Lỗi 1 đổi 1 trong 30 ngày</li>
              <li>• Kiểm tra hàng trước khi thanh toán</li>
              <li>• Miễn phí giao hàng toàn quốc</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© {new Date().getFullYear()} Lumina Precision S1. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              Thiết kế vì sắc đẹp phụ nữ Việt <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </p>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-gray-500 hover:text-gray-300 flex items-center gap-1 text-[11px] transition-colors p-1"
                title="Cổng Quản Trị & Tra Cứu Bảo Mật"
              >
                <Lock className="w-3 h-3" />
                <span>Quản trị</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
