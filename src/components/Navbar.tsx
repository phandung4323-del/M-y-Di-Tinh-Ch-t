import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Menu, X, ShieldCheck, Phone, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
  ordersCount: number;
  onOpenOrdersManager: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  cartCount,
  ordersCount,
  onOpenOrdersManager
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: '6 Chế độ', href: '#six-modes' },
    { name: 'Thử nghiệm ảo', href: '#virtual-tester' },
    { name: 'Công thái học', href: '#ergonomics' },
    { name: 'Liệu trình 15p', href: '#routine-timer' },
    { name: 'So sánh', href: '#comparison' },
    { name: 'Đánh giá', href: '#reviews' },
    { name: 'Đặt hàng ngay', href: '#order-form-final' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-[#fcf9f8]/90 backdrop-blur-md border-b border-[#e2d9f3]/60 z-50 transition-all duration-300">
      {/* Top micro banner */}
      <div className="bg-[#6050af] text-white text-xs py-1 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#e6deff] animate-spin" style={{ animationDuration: '8s' }} />
        <span>Ưu đãi duy nhất hôm nay: <strong>Giảm 45% + Miễn phí vận chuyển toàn quốc</strong></span>
        <span className="hidden sm:inline bg-[#9d8df1] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ml-2">Freeship</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#6050af] hover:bg-[#e6deff]/40 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 text-decoration-none group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6050af] to-[#9d8df1] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Manrope'] font-extrabold text-lg tracking-tight text-[#6050af] leading-tight">
              S1 PRECISION
            </span>
            <span className="text-[10px] font-medium tracking-widest text-[#797583] uppercase -mt-0.5">
              Lumina Essence
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#6050af] ${
                link.name === 'Đặt hàng ngay'
                  ? 'bg-[#6050af] text-white px-3.5 py-1.5 rounded-full hover:bg-[#483795] shadow-sm hover:text-white'
                  : 'text-[#484552]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right action icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:0398636869"
            className="hidden lg:flex items-center gap-1.5 text-xs text-[#6050af] font-semibold bg-[#e6deff]/50 px-3 py-1.5 rounded-full hover:bg-[#e6deff] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>0398.63.68.69</span>
          </a>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-white border border-[#c9c4d3] hover:border-[#6050af] text-[#6050af] rounded-full hover:bg-[#f6f3f2] transition-all shadow-sm active:scale-95"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ba1a1a] text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#e2d9f3] px-6 py-5 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrdersManager();
              }}
              className="py-2.5 px-3 rounded-lg text-xs font-bold bg-[#f6f3f2] text-[#484552] border border-[#e2d9f3] flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cổng Quản Trị & Bảo Mật Dữ Liệu</span>
              </span>
              <span className="text-[10px] text-gray-500 font-normal">PIN 8899</span>
            </button>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                  link.name === 'Đặt hàng ngay'
                    ? 'bg-[#6050af] text-white text-center shadow-md'
                    : 'text-[#1c1b1b] hover:bg-[#f6f3f2] hover:text-[#6050af]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-[#f0eded] flex items-center justify-between text-xs text-[#797583]">
              <div className="flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Bảo hành chính hãng 12 tháng</span>
              </div>
              <a href="tel:0398636869" className="text-[#6050af] font-bold">0398.63.68.69</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
