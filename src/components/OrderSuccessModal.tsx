import React from 'react';
import { OrderData } from '../types';
import { CheckCircle2, Package, Phone, Truck, ShieldCheck, X, Sparkles, QrCode, HeartHandshake } from 'lucide-react';

interface OrderSuccessModalProps {
  order: OrderData | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e2d9f3] relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="text-center mb-6">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Đặt Hàng Thành Công
          </span>
          <h3 className="font-['Manrope'] font-bold text-xl sm:text-2xl text-[#1c1b1b] mt-2">
            CẢM ƠN BẠN {order.fullName.toUpperCase()}!
          </h3>
          <p className="text-xs sm:text-sm text-[#5d5e65] mt-1">
            Mã đơn hàng: <strong className="text-[#6050af] font-mono text-base">{order.id}</strong>
          </p>
        </div>

        {/* Order Details box */}
        <div className="bg-[#f8f7ff] rounded-2xl p-4 border border-[#e2d9f3] space-y-2.5 text-xs text-[#484552] mb-5">
          <div className="flex justify-between">
            <span className="text-[#797583]">Sản phẩm:</span>
            <strong className="text-[#1c1b1b] text-right">{order.packageName}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797583]">Màu sắc:</span>
            <span className="font-semibold text-[#6050af]">{order.color}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797583]">Số điện thoại:</span>
            <span className="font-bold text-[#1c1b1b]">{order.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797583]">Địa chỉ nhận hàng:</span>
            <span className="text-right font-medium max-w-[220px] text-[#1c1b1b] truncate">{order.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797583]">Hình thức thanh toán:</span>
            <span className="font-semibold">{order.paymentMethod === 'cod' ? 'COD (Thanh toán khi nhận hàng)' : 'Chuyển khoản VietQR'}</span>
          </div>
          <div className="pt-2 border-t border-[#e2d9f3] flex justify-between items-baseline">
            <span className="font-bold text-[#1c1b1b]">Tổng thanh toán:</span>
            <span className="font-['Manrope'] font-extrabold text-lg text-[#6050af]">
              {order.totalPrice.toLocaleString('vi-VN')} VNĐ
            </span>
          </div>
        </div>

        {order.paymentMethod === 'bank_transfer' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 text-center text-xs text-amber-900">
            <div className="flex items-center justify-center gap-1.5 font-bold mb-1">
              <QrCode className="w-4 h-4 text-amber-700" />
              <span>Thông tin chuyển khoản:</span>
            </div>
            <p>Ngân hàng: <strong>MB BANK</strong> - STK: <strong>99998888S1</strong></p>
            <p>Chủ TK: <strong>CONG TY LUMINA S1 VIETNAM</strong></p>
            <p>Nội dung CK: <strong className="text-[#6050af]">{order.id} {order.phone}</strong></p>
          </div>
        )}

        {/* Friendly Delivery & Support Box */}
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 mb-5 text-xs text-[#484552] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#6050af]">
            <HeartHandshake className="w-4 h-4 text-[#6050af]" />
            <span>Thông tin giao hàng & hỗ trợ</span>
          </div>
          <p className="text-[12px] leading-relaxed text-[#5d5e65]">
            • Chuyên viên tư vấn sẽ liên hệ với bạn qua số <strong>{order.phone}</strong> trong thời gian sớm nhất để xác nhận và chuẩn bị gửi hàng.
          </p>
          <p className="text-[12px] leading-relaxed text-[#5d5e65]">
            • Quý khách được <strong>kiểm tra hàng trước khi thanh toán</strong> và đổi mới 1-1 trong 30 ngày nếu có lỗi kỹ thuật.
          </p>
          <div className="pt-1.5 border-t border-purple-200/60 flex items-center justify-between text-[11px]">
            <span className="text-gray-500">Hotline hỗ trợ 24/7:</span>
            <a href="tel:0398636869" className="font-bold text-[#6050af] hover:underline">0398.63.68.69</a>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#6050af] text-white rounded-xl font-['Manrope'] font-bold text-sm uppercase tracking-wider hover:bg-[#483795] transition-all shadow-md cursor-pointer"
        >
          XÁC NHẬN & ĐÓNG
        </button>
      </div>
    </div>
  );
};

