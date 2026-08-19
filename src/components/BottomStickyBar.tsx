import React from 'react';
import { Info, Sparkles, ShoppingBag, PhoneCall } from 'lucide-react';

interface BottomStickyBarProps {
  onOpenOrder: () => void;
  onOpenInfo: () => void;
}

export const BottomStickyBar: React.FC<BottomStickyBarProps> = ({ onOpenOrder, onOpenInfo }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex items-center justify-between px-4 py-2.5 gap-3 bg-white/95 backdrop-blur-lg border-t border-[#e2d9f3] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <a
        href="#six-modes"
        onClick={onOpenInfo}
        className="flex flex-col items-center justify-center text-[#484552] px-3 py-1.5 hover:text-[#6050af] active:scale-95 transition-all"
      >
        <Info className="w-5 h-5" />
        <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">Chức năng</span>
      </a>

      <a
        href="tel:0398636869"
        className="flex flex-col items-center justify-center text-[#484552] px-3 py-1.5 hover:text-[#6050af] active:scale-95 transition-all"
      >
        <PhoneCall className="w-5 h-5" />
        <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">Tư vấn</span>
      </a>

      <a
        href="#order-form-final"
        onClick={onOpenOrder}
        className="flex-1 flex items-center justify-center gap-1.5 bg-[#6050af] text-white rounded-full px-5 py-3 shadow-md hover:bg-[#483795] active:scale-95 transition-all"
      >
        <Sparkles className="w-4 h-4 text-amber-300" />
        <div className="flex flex-col text-left">
          <span className="font-['Manrope'] font-extrabold text-xs uppercase tracking-wide leading-none">
            ĐẶT HÀNG NGAY
          </span>
          <span className="text-[10px] font-normal text-white/80 leading-tight">
            749.000đ • Freeship
          </span>
        </div>
      </a>
    </nav>
  );
};
