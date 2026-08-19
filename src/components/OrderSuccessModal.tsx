import React from 'react';
import { OrderData } from '../types';
import { CheckCircle2, Package, Phone, Truck, ShieldCheck, X, Sparkles, QrCode, Lock, AlertTriangle } from 'lucide-react';

interface OrderSuccessModalProps {
  order: OrderData | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  // Mask phone for customer privacy and anti-shoulder surfing
  const maskedPhone = order.phone.length >= 7 
    ? `${order.phone.slice(0, 3)}****${order.phone.slice(-3)}`
    : order.phone;

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
            🔒 Đã Tiếp Nhận & Bảo Mật Tuyệt Đối
          </span>
          <h3 className="font-['Manrope'] font-bold text-xl sm:text-2xl text-[#1c1b1b] mt-2">
            CẢM ƠN QUÝ KHÁCH {order.fullName.toUpperCase()}!
          </h3>
          <p className="text-xs sm:text-sm text-[#5d5e65] mt-1">
            Mã bảo mật vận đơn: <strong className="text-[#6050af] font-mono text-base">{order.id}</strong>
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
            <span className="text-[#797583]">Số điện thoại (Đã mã hóa):</span>
            <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">{maskedPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797583]">Địa chỉ nhận hàng:</span>
            <span className="text-right font-medium max-w-[200px] text-[#1c1b1b] truncate">{order.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797583]">Hình thức thanh toán:</span>
            <span className="font-semibold">{order.paymentMethod === 'cod' ? 'COD (Nhận hàng kiểm tra thanh toán)' : 'Chuyển khoản VietQR'}</span>
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
              <span>Thông tin chuyển khoản chính hãng:</span>
            </div>
            <p>Ngân hàng: <strong>MB BANK</strong> - STK: <strong>99998888S1</strong></p>
            <p>Chủ TK: <strong>CONG TY LUMINA S1 VIETNAM</strong></p>
            <p>Nội dung CK: <strong className="text-[#6050af]">{order.id} {order.phone}</strong></p>
          </div>
        )}

        {/* Anti-Theft Lead Protection Warning Box */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-5 text-xs text-rose-900 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-rose-800">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>CẢNH BÁO CHỐNG ĐỐI THỦ MẠO DANH GIAO HÀNG NHÁI:</span>
          </div>
          <p className="text-[11px] leading-relaxed text-rose-950">
            • Bộ phận điều vận Lumina S1 <strong>chỉ gọi xác nhận từ hotline 0398.63.68.69</strong>.
          </p>
          <p className="text-[11px] leading-relaxed text-rose-950">
            • Khi bưu tá giao đến, quý khách vui lòng đối chiếu đúng mã vận đơn <strong className="font-mono text-[#6050af] bg-white px-1 py-0.5 rounded border border-rose-200">{order.id}</strong> trên bưu kiện.
          </p>
          <p className="text-[11px] leading-relaxed text-rose-950">
            • Tuyệt đối từ chối nhận nếu gói hàng không có tem niêm phong chống hàng giả Lumina.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#6050af] text-white rounded-xl font-['Manrope'] font-bold text-sm uppercase tracking-wider hover:bg-[#483795] transition-all shadow-md"
        >
          ĐÃ HIỂU VÀ HOÀN TẤT
        </button>
      </div>
    </div>
  );
};
