import React, { useState, useRef, useEffect } from 'react';
import { PRODUCT_PACKAGES } from '../data/productData';
import { ProductPackage, OrderData } from '../types';
import { Sparkles, Truck, ShieldCheck, Check, Gift, Tag, ArrowRight, CreditCard, Banknote, ShieldAlert, Lock, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { trackPixelEvent } from '../utils/pixel';

interface OrderFormSectionProps {
  appliedVoucher: string;
  onApplyVoucher: (code: string) => void;
  onOrderSuccess: (order: OrderData) => void;
}

export const OrderFormSection: React.FC<OrderFormSectionProps> = ({
  appliedVoucher,
  onApplyVoucher,
  onOrderSuccess
}) => {
  const [selectedPackage, setSelectedPackage] = useState<ProductPackage>(PRODUCT_PACKAGES[1]); // Default to popular combo
  const [selectedColor, setSelectedColor] = useState<'Lavender Purple' | 'Pearl White' | 'Rose Gold'>('Lavender Purple');
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer'>('cod');
  const [voucherInput, setVoucherInput] = useState(appliedVoucher);
  const [voucherError, setVoucherError] = useState('');
  const [voucherSuccess, setVoucherSuccess] = useState(!!appliedVoucher);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Security & Anti-bot tracking
  const [botTrap, setBotTrap] = useState(''); // Honeypot field: must stay empty
  const formLoadTimeRef = useRef<number>(Date.now());
  const hasTriggeredInitiateCheckout = useRef<boolean>(false);

  const handleSelectPackage = (pkg: ProductPackage) => {
    setSelectedPackage(pkg);
    trackPixelEvent('AddToCart', {
      content_name: pkg.name,
      content_ids: [pkg.id],
      content_type: 'product',
      value: pkg.salePrice,
      currency: 'VND'
    });
  };

  const handleInputFocus = () => {
    if (!hasTriggeredInitiateCheckout.current) {
      hasTriggeredInitiateCheckout.current = true;
      trackPixelEvent('InitiateCheckout', {
        content_name: selectedPackage.name,
        content_ids: [selectedPackage.id],
        content_type: 'product',
        value: finalPrice,
        currency: 'VND'
      });
    }
  };

  useEffect(() => {
    formLoadTimeRef.current = Date.now();
  }, []);

  const discountAmount = appliedVoucher.toUpperCase() === 'DEPCHUANSPA50' ? 50000 : 0;
  const finalPrice = Math.max(0, selectedPackage.salePrice - discountAmount);

  const handleApplyVoucherCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherInput.trim().toUpperCase() === 'DEPCHUANSPA50') {
      onApplyVoucher('DEPCHUANSPA50');
      setVoucherSuccess(true);
      setVoucherError('');
    } else {
      setVoucherError('Mã ưu đãi không hợp lệ hoặc đã hết hạn.');
      setVoucherSuccess(false);
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Vui lòng nhập họ và tên';
    
    const cleanPhone = phone.replace(/[\s\.\-]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^(0[3|5|7|8|9])[0-9]{8}$/.test(cleanPhone)) {
      errs.phone = 'Số điện thoại không hợp lệ (Phải là số ĐTDĐ 10 số của Việt Nam)';
    }
    
    if (!address.trim()) errs.address = 'Vui lòng nhập địa chỉ giao hàng cụ thể';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const formSubmitTimeMs = Date.now() - formLoadTimeRef.current;

    const newOrder: OrderData = {
      id: 'LUMINA-' + Math.floor(100000 + Math.random() * 900000),
      fullName: fullName.trim(),
      phone: phone.replace(/[\s\.\-]/g, ''),
      address: address.trim(),
      note: note.trim(),
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      color: selectedColor,
      totalPrice: finalPrice,
      paymentMethod,
      status: 'new',
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN')
    };

    try {
      // Send to server backend with honeypot & timing defense
      const res = await fetch('/api/orders/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: newOrder,
          botTrap, // Honeypot field
          formSubmitTimeMs
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || 'Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.');
        setIsSubmitting(false);
        return;
      }

      // Trigger celebration confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Track Meta (Facebook) Pixel Purchase and Lead conversion events
      trackPixelEvent('Purchase', {
        content_name: newOrder.packageName,
        content_ids: [newOrder.packageId],
        content_type: 'product',
        value: newOrder.totalPrice,
        currency: 'VND',
        num_items: 1,
        order_id: newOrder.id
      });
      trackPixelEvent('Lead', {
        content_name: newOrder.packageName,
        value: newOrder.totalPrice,
        currency: 'VND'
      });

      onOrderSuccess(newOrder);
    } catch (err) {
      console.error('Order submit error:', err);
      // Client-side fallback if server temporarily unreachable
      trackPixelEvent('Purchase', {
        content_name: newOrder.packageName,
        content_ids: [newOrder.packageId],
        content_type: 'product',
        value: newOrder.totalPrice,
        currency: 'VND',
        num_items: 1,
        order_id: newOrder.id
      });
      onOrderSuccess(newOrder);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form-final" className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-lavender rounded-t-[2.5rem]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3.5 py-1 bg-[#ffdad6] text-[#ba1a1a] rounded-full text-xs font-bold uppercase tracking-wider mb-2 animate-pulse">
            Chương Trình Ưu Đãi Trực Tiếp Từ Nhà Máy
          </span>
          <h2 className="font-['Manrope'] font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#1c1b1b] leading-tight">
            NHẬN ƯU ĐÃI – ĐẶT HÀNG NGAY
          </h2>
          <p className="text-sm text-[#484552] mt-1">
            Giao hàng hỏa tốc 1-3 ngày • Kiểm tra hàng trước khi thanh toán • 100% Freeship
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Package & Color Selector */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-['Manrope'] font-bold text-lg text-[#1c1b1b]">
              1. Chọn phiên bản sản phẩm:
            </h3>

            <div className="space-y-3">
              {PRODUCT_PACKAGES.map((pkg) => {
                const isSelected = selectedPackage.id === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => handleSelectPackage(pkg)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer bg-white relative ${
                      isSelected
                        ? 'border-[#6050af] shadow-md ring-2 ring-[#c9beff]'
                        : 'border-[#e2d9f3] hover:border-[#9d8df1]'
                    }`}
                  >
                    {pkg.badge && (
                      <span className={`absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        pkg.isPopular ? 'bg-[#6050af] text-white' : 'bg-[#ffdad6] text-[#93000a]'
                      }`}>
                        {pkg.badge}
                      </span>
                    )}

                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-['Manrope'] font-bold text-sm sm:text-base text-[#1c1b1b]">
                          {pkg.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-['Manrope'] font-extrabold text-lg text-[#6050af]">
                            {pkg.salePrice.toLocaleString('vi-VN')}đ
                          </span>
                          <span className="text-xs text-[#797583] line-through">
                            {pkg.originalPrice.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#6050af] bg-[#6050af] text-white' : 'border-gray-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>

                    {/* Gifts List */}
                    <div className="pt-2 border-t border-[#f0eded] space-y-1">
                      {pkg.gifts.map((g, i) => (
                        <div key={i} className="text-xs text-[#5d5e65] flex items-center gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{g}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Color selection */}
            <div className="bg-white p-4 rounded-2xl border border-[#e2d9f3]">
              <h4 className="font-bold text-xs text-[#484552] uppercase mb-2">
                2. Chọn màu sắc máy S1:
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Lavender Purple' as const, label: 'Tím Lavender', colorClass: 'bg-[#9d8df1]' },
                  { name: 'Pearl White' as const, label: 'Trắng Ngọc Trai', colorClass: 'bg-white border border-gray-300' },
                  { name: 'Rose Gold' as const, label: 'Hồng Rose Gold', colorClass: 'bg-[#fecdd3]' }
                ].map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 border transition-all ${
                      selectedColor === c.name
                        ? 'border-[#6050af] bg-[#f8f7ff] text-[#6050af] ring-1 ring-[#c9beff]'
                        : 'border-[#f0eded] text-[#484552] hover:bg-gray-50'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${c.colorClass} shadow-xs`}></span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Checkout Shipping Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#e2d9f3] relative">
            <h3 className="font-['Manrope'] font-bold text-lg text-[#1c1b1b] mb-4">
              3. Thông tin nhận hàng:
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* BOT HONEYPOT TRAP (Hidden from humans) */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <label htmlFor="botTrap">Do not fill this</label>
                <input
                  type="text"
                  id="botTrap"
                  name="botTrap"
                  tabIndex={-1}
                  value={botTrap}
                  onChange={(e) => setBotTrap(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#484552] uppercase mb-1">
                  Họ và tên người nhận *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onFocus={handleInputFocus}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Thị Mai"
                  className={`w-full px-4 py-3 rounded-xl border bg-[#fcf9f8] text-sm focus:outline-none focus:ring-2 focus:ring-[#6050af] transition-all ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#c9c4d3]'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#484552] uppercase mb-1">
                  Số điện thoại nhận hàng *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onFocus={handleInputFocus}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ví dụ: 0912 345 678"
                  className={`w-full px-4 py-3 rounded-xl border bg-[#fcf9f8] text-sm focus:outline-none focus:ring-2 focus:ring-[#6050af] transition-all ${
                    errors.phone ? 'border-red-500 bg-red-50/20' : 'border-[#c9c4d3]'
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#484552] uppercase mb-1">
                  Địa chỉ giao hàng chi tiết *
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onFocus={handleInputFocus}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                  className={`w-full px-4 py-3 rounded-xl border bg-[#fcf9f8] text-sm focus:outline-none focus:ring-2 focus:ring-[#6050af] transition-all resize-none ${
                    errors.address ? 'border-red-500 bg-red-50/20' : 'border-[#c9c4d3]'
                  }`}
                />
                {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#484552] uppercase mb-1">
                  Ghi chú cho shipper (Không bắt buộc)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Giao giờ hành chính, gọi trước khi giao..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c9c4d3] bg-[#fcf9f8] text-xs focus:outline-none focus:ring-2 focus:ring-[#6050af]"
                />
              </div>

              {/* Voucher Code Input */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-[#797583] absolute left-3 top-3" />
                    <input
                      type="text"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      placeholder="Nhập mã giảm giá (VD: DEPCHUANSPA50)"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#c9c4d3] text-xs bg-[#fcf9f8] uppercase"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyVoucherCode}
                    className="py-2.5 px-4 bg-[#e6deff] text-[#6050af] rounded-xl text-xs font-bold hover:bg-[#c9beff] transition-colors"
                  >
                    Áp Dụng
                  </button>
                </div>
                {voucherSuccess && (
                  <p className="text-xs text-emerald-700 font-semibold mt-1">✓ Đã áp dụng mã DEPCHUANSPA50 (-50.000đ)</p>
                )}
                {voucherError && (
                  <p className="text-xs text-rose-600 mt-1">{voucherError}</p>
                )}
              </div>

              {/* Payment Method */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#484552] uppercase mb-2">
                  Hình thức thanh toán:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#6050af] bg-[#f8f7ff] text-[#6050af] ring-1 ring-[#c9beff]'
                        : 'border-[#f0eded] text-[#484552] hover:bg-gray-50'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#6050af]" />
                    <span>Thanh toán COD khi nhận</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#6050af] bg-[#f8f7ff] text-[#6050af] ring-1 ring-[#c9beff]'
                        : 'border-[#f0eded] text-[#484552] hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#6050af]" />
                    <span>Chuyển khoản VietQR</span>
                  </button>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-[#f8f7ff] p-4 rounded-2xl border border-[#e2d9f3] space-y-1.5 text-xs text-[#484552]">
                <div className="flex justify-between">
                  <span>Gói sản phẩm ({selectedColor}):</span>
                  <span>{selectedPackage.salePrice.toLocaleString('vi-VN')}đ</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Mã giảm giá (DEPCHUANSPA50):</span>
                    <span>-50.000đ</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="text-emerald-700 font-bold">MIỄN PHÍ</span>
                </div>
                <div className="pt-2 border-t border-[#e2d9f3] flex justify-between items-baseline">
                  <span className="font-bold text-sm text-[#1c1b1b]">Tổng thanh toán:</span>
                  <span className="font-['Manrope'] font-extrabold text-xl text-[#6050af]">
                    {finalPrice.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-[#6050af] text-white rounded-2xl font-['Manrope'] font-extrabold text-base uppercase tracking-wider hover:bg-[#483795] transition-all shadow-[0_8px_25px_rgba(96,80,175,0.4)] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>{isSubmitting ? 'ĐANG BẢO MẬT & TẠO ĐƠN...' : 'HOÀN TẤT ĐẶT HÀNG NGAY'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#797583] pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  Giao nhanh 24-48h
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Bảo mật thông tin 100%
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
