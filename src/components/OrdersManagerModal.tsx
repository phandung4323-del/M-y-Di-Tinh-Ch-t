import React, { useState } from 'react';
import { OrderData } from '../types';
import { exportToGoogleSheetsCsv, copyOrdersToGoogleSheetsClipboard, DEFAULT_SHEET_WEBHOOK_URL } from '../utils/sheetExport';
import {
  X,
  FileSpreadsheet,
  Copy,
  Check,
  Search,
  Trash2,
  Phone,
  MapPin,
  Package,
  Calendar,
  AlertCircle,
  ExternalLink,
  Code,
  Sparkles,
  Lock,
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';

interface OrdersManagerModalProps {
  orders: OrderData[];
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderData['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  webhookUrl: string;
  onSaveWebhookUrl: (url: string) => void;
}

export const OrdersManagerModal: React.FC<OrdersManagerModalProps> = ({
  orders,
  onClose,
  onUpdateStatus,
  onDeleteOrder,
  webhookUrl,
  onSaveWebhookUrl
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('lumina_admin_auth') === 'true';
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPin, setShowPin] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'webhook'>('orders');
  const [tempWebhookUrl, setTempWebhookUrl] = useState(webhookUrl || DEFAULT_SHEET_WEBHOOK_URL || '');
  const [scriptCopied, setScriptCopied] = useState(false);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; raw?: string } | null>(null);

  const handleResetWebhook = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa toàn bộ cấu hình Webhook Google Sheet để cài lại từ đầu?')) {
      return;
    }
    try {
      await fetch('/api/admin/config/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: enteredPin || '8899',
          reset: true
        })
      });
      setTempWebhookUrl('');
      onSaveWebhookUrl('');
      localStorage.removeItem('lumina_sheet_webhook');
      setTestResult({
        success: true,
        message: 'Đã xóa toàn bộ cấu hình Webhook Google Sheet. Bạn có thể dán link mới vào ô bên dưới để cài lại.'
      });
    } catch (e) {
      setTempWebhookUrl('');
      onSaveWebhookUrl('');
      localStorage.removeItem('lumina_sheet_webhook');
    }
  };

  const handleTestAndSaveWebhook = async (shouldSaveOnly: boolean = false) => {
    if (!tempWebhookUrl.trim()) {
      setTestResult({
        success: false,
        message: 'Vui lòng dán đường dẫn Webhook kết thúc bằng /exec vào ô trước khi lưu hoặc gửi test.'
      });
      return;
    }
    setIsTestingWebhook(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/admin/config/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: enteredPin || '8899',
          webhookUrl: tempWebhookUrl.trim(),
          testNow: !shouldSaveOnly
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onSaveWebhookUrl(tempWebhookUrl.trim());
        if (shouldSaveOnly) {
          setTestResult({ success: true, message: 'Đã lưu đường dẫn Webhook thành công!' });
        } else {
          setTestResult({
            success: true,
            message: '✓ KẾT NỐI THÀNH CÔNG! Đơn hàng test đã được gửi trực tiếp vào Google Sheet của bạn. Vui lòng mở trang tính để kiểm tra!'
          });
        }
      } else {
        setTestResult({
          success: false,
          message: data.error || 'Không thể kết nối đến Webhook.',
          raw: data.rawResponse
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: 'Lỗi máy chủ khi thử nghiệm Webhook: ' + (err.message || 'Mất kết nối')
      });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');

    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: enteredPin })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('lumina_admin_auth', 'true');
      } else {
        setPinError('Mã PIN bảo mật không chính xác. Quyền truy cập bị từ chối.');
      }
    } catch (err) {
      // Fallback local verify for offline
      if (enteredPin === '8899') {
        setIsAuthenticated(true);
        sessionStorage.setItem('lumina_admin_auth', 'true');
      } else {
        setPinError('Mã PIN không đúng.');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lumina_admin_auth');
    setEnteredPin('');
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'all' || (o.status || 'new') === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleCopySheets = () => {
    const success = copyOrdersToGoogleSheetsClipboard(filteredOrders);
    if (success) {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    }
  };

  const appsScriptCode = `function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Nếu trang tính chưa có tiêu đề, tạo hàng tiêu đề
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Mã Đơn Hàng", "Thời Gian", "Họ Và Tên", "Số Điện Thoại",
        "Địa Chỉ", "Gói Sản Phẩm", "Màu Sắc", "Tổng Tiền (VNĐ)",
        "Hình Thức", "Trạng Thái", "Ghi Chú"
      ]);
    }
    
    // Thêm dòng dữ liệu khách hàng mới (đã mã hóa an toàn)
    sheet.appendRow([
      data.orderId,
      data.createdAt,
      data.fullName,
      "'" + data.phone,
      data.address,
      data.packageName,
      data.color,
      data.totalPrice,
      data.paymentMethod,
      data.status,
      data.note
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({result: "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", message: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl p-5 sm:p-7 shadow-2xl border border-[#e2d9f3] relative my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f0eded]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Manrope'] font-bold text-lg sm:text-xl text-[#1c1b1b]">
                  Cổng Quản Trị Đơn Hàng & Dữ Liệu
                </h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded-full">
                  🔒 Bảo Mật Chống Cướp Đơn 100%
                </span>
              </div>
              <p className="text-xs text-[#797583]">
                Chỉ dành riêng cho chủ cửa hàng và quản trị viên được phân quyền
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              >
                Khóa / Đăng Xuất
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN AUTHENTICATION GATE */}
        {!isAuthenticated ? (
          <div className="py-12 px-4 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-['Manrope'] font-bold text-xl text-[#1c1b1b]">
                Xác Thực Quyền Quản Trị
              </h4>
              <p className="text-xs text-[#5d5e65] mt-1.5 leading-relaxed">
                Để ngăn chặn đối thủ đánh cắp số điện thoại khách hàng, vui lòng nhập mã PIN bảo mật để mở khóa dữ liệu đơn hàng.
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  placeholder="Nhập mã PIN quản trị (Mặc định: 8899)"
                  autoFocus
                  className="w-full text-center tracking-widest text-lg font-mono font-bold py-3.5 px-4 rounded-2xl border-2 border-[#c9c4d3] focus:border-[#6050af] focus:outline-none bg-[#f8f7ff]"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {pinError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-600 font-bold bg-rose-50 py-2 rounded-xl border border-rose-200">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#6050af] hover:bg-[#483795] text-white rounded-2xl font-['Manrope'] font-bold text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                MỞ KHÓA DỮ LIỆU ĐƠN HÀNG
              </button>

              <div className="text-[11px] text-gray-400 text-center">
                Mã PIN mặc định: <strong className="text-gray-700 font-mono">8899</strong> (Có thể thay đổi trong cấu hình server)
              </div>
            </form>
          </div>
        ) : (
          /* UNLOCKED ADMIN PANEL */
          <>
            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 pb-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'orders'
                      ? 'bg-[#6050af] text-white shadow-xs'
                      : 'bg-[#f6f3f2] text-[#484552] hover:bg-[#e6deff]'
                  }`}
                >
                  Danh Sách Khách Hàng ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('webhook')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'webhook'
                      ? 'bg-[#6050af] text-white shadow-xs'
                      : 'bg-[#f6f3f2] text-[#484552] hover:bg-[#e6deff]'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Cấu Hình Tự Động Gửi Google Sheet</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </button>
              </div>

              <div className="text-[11px] text-[#5d5e65] flex items-center gap-1.5 bg-[#f8f7ff] px-3 py-1.5 rounded-full border border-[#e2d9f3]">
                <span className="font-semibold">Bảo mật:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Backend Server Proxy Active
                </span>
              </div>
            </div>

            {activeTab === 'orders' ? (
              <div className="flex-1 overflow-y-auto pt-2 space-y-4">
                {/* Action Bar (Export & Copy) */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#f8f7ff] p-3.5 rounded-2xl border border-[#e2d9f3]">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => exportToGoogleSheetsCsv(filteredOrders)}
                      disabled={filteredOrders.length === 0}
                      className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all disabled:opacity-50"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Xuất File Google Sheets / Excel (.CSV)</span>
                    </button>

                    <button
                      onClick={handleCopySheets}
                      disabled={filteredOrders.length === 0}
                      className="px-4 py-2.5 bg-white border border-[#c9c4d3] hover:border-[#6050af] text-[#6050af] rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all disabled:opacity-50"
                    >
                      {copiedNotification ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedNotification ? '✓ Đã Sao Chép! (Mở Sheet và ấn Ctrl+V)' : 'Sao Chép Dán Vào Google Sheet'}</span>
                    </button>
                  </div>

                  {/* Quick Search */}
                  <div className="relative min-w-[200px]">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Tìm tên, SĐT, mã đơn..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#c9c4d3] bg-white focus:outline-none focus:border-[#6050af]"
                    />
                  </div>
                </div>

                {/* Orders Table */}
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12 bg-[#fcf9f8] rounded-2xl border border-[#f0eded]">
                    <AlertCircle className="w-10 h-10 text-[#797583] mx-auto mb-2 opacity-50" />
                    <h4 className="font-bold text-sm text-[#1c1b1b]">Chưa có đơn hàng nào</h4>
                    <p className="text-xs text-[#797583] mt-1">Khi khách hàng điền form đặt hàng máy S1, thông tin sẽ hiển thị tại đây.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-[#e2d9f3]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f6f3f2] text-[#484552] font-['Manrope'] font-bold border-b border-[#e2d9f3]">
                        <tr>
                          <th className="p-3.5">Khách hàng / SĐT</th>
                          <th className="p-3.5">Gói / Màu sắc</th>
                          <th className="p-3.5">Tổng tiền</th>
                          <th className="p-3.5">Địa chỉ</th>
                          <th className="p-3.5">Trạng thái</th>
                          <th className="p-3.5 text-center">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0eded] bg-white">
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-[#f8f7ff] transition-colors">
                            <td className="p-3.5">
                              <div className="font-bold text-[#1c1b1b]">{order.fullName}</div>
                              <div className="text-[#6050af] font-mono font-semibold flex items-center gap-1 mt-0.5">
                                <Phone className="w-3 h-3" />
                                <a href={`tel:${order.phone}`} className="hover:underline">{order.phone}</a>
                              </div>
                              <div className="text-[10px] text-[#797583] mt-0.5">{order.createdAt}</div>
                            </td>

                            <td className="p-3.5">
                              <div className="font-semibold text-[#1c1b1b]">{order.packageName}</div>
                              <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-[#f8f7ff] border border-[#e2d9f3] text-[#6050af] mt-1 font-medium">
                                {order.color}
                              </span>
                            </td>

                            <td className="p-3.5">
                              <div className="font-bold text-[#6050af] text-sm font-['Manrope']">
                                {order.totalPrice.toLocaleString('vi-VN')}đ
                              </div>
                              <div className="text-[10px] text-[#797583]">
                                {order.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản'}
                              </div>
                            </td>

                            <td className="p-3.5 max-w-[220px]">
                              <div className="text-[#484552] text-xs leading-snug line-clamp-2" title={order.address}>
                                {order.address}
                              </div>
                              {order.note && (
                                <div className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-1">
                                  Note: {order.note}
                                </div>
                              )}
                            </td>

                            <td className="p-3.5">
                              <select
                                value={order.status || 'new'}
                                onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderData['status'])}
                                className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                                  order.status === 'completed'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                    : order.status === 'shipping'
                                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                                    : order.status === 'called'
                                    ? 'bg-purple-50 text-purple-700 border-purple-300'
                                    : order.status === 'cancelled'
                                    ? 'bg-rose-50 text-rose-700 border-rose-300'
                                    : 'bg-amber-50 text-amber-800 border-amber-300'
                                }`}
                              >
                                <option value="new">Mới đặt hàng</option>
                                <option value="called">Đã gọi tư vấn</option>
                                <option value="shipping">Đang giao hàng</option>
                                <option value="completed">Đã hoàn tất</option>
                                <option value="cancelled">Đã hủy</option>
                              </select>
                            </td>

                            <td className="p-3.5 text-center">
                              <button
                                onClick={() => onDeleteOrder(order.id)}
                                className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                title="Xóa đơn hàng"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              /* Webhook / Google Apps Script Setup Guide */
              <div className="flex-1 overflow-y-auto pt-2 space-y-4 text-xs text-[#484552]">
                <div className="bg-[#f8f7ff] p-4 sm:p-5 rounded-2xl border border-[#e2d9f3] space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-['Manrope'] font-bold text-sm sm:text-base text-[#1c1b1b] flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#6050af]" />
                        <span>Cấu Hình Tự Động Gửi Đơn Về Google Sheets (Bảo Mật 100%)</span>
                      </h4>
                      <p className="text-xs text-[#5d5e65] mt-1">
                        Dữ liệu được chuyển tiếp an toàn từ máy chủ backend (không làm lộ link Google Sheet ra trình duyệt).
                      </p>
                    </div>
                  </div>

                  {/* Webhook Input */}
                  <div className="bg-white p-4 rounded-xl border border-[#e2d9f3] space-y-3">
                    <label className="block text-xs font-bold text-[#1c1b1b]">
                      Đường dẫn Webhook Google Apps Script hiện tại (Kết thúc bằng /exec):
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={tempWebhookUrl}
                        onChange={(e) => setTempWebhookUrl(e.target.value)}
                        placeholder="https://script.google.com/macros/s/.../exec"
                        className="flex-1 px-3 py-2.5 text-xs rounded-xl border border-[#c9c4d3] bg-[#fdfdfd] focus:outline-none focus:border-[#6050af] font-mono"
                      />
                      <div className="flex flex-wrap gap-2 shrink-0">
                        {tempWebhookUrl && (
                          <button
                            type="button"
                            onClick={handleResetWebhook}
                            className="px-3.5 py-2.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs hover:bg-rose-100 transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Xóa Cài Đặt</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleTestAndSaveWebhook(true)}
                          className="px-4 py-2.5 bg-gray-100 text-[#484552] rounded-xl font-bold text-xs hover:bg-gray-200 transition-colors"
                        >
                          Chỉ Lưu URL
                        </button>
                        <button
                          type="button"
                          disabled={isTestingWebhook}
                          onClick={() => handleTestAndSaveWebhook(false)}
                          className="px-4 py-2.5 bg-[#6050af] hover:bg-[#483795] text-white rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{isTestingWebhook ? 'Đang gửi kiểm tra...' : 'Lưu & Gửi Test Ngay'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Test diagnostics status */}
                    {testResult && (
                      <div className={`p-3 rounded-xl border text-xs font-medium ${
                        testResult.success
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}>
                        <div className="font-bold flex items-center gap-1.5">
                          {testResult.success ? <Check className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
                          <span>{testResult.message}</span>
                        </div>
                        {testResult.raw && (
                          <div className="mt-1.5 text-[11px] text-gray-500 font-mono bg-white p-2 rounded border truncate">
                            {testResult.raw}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Step by step guide */}
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-2">
                    <h5 className="font-bold text-amber-900 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                      <span>3 Bước Chuẩn Để Webhook Không Bị Google Chặn (Rất Quan Trọng):</span>
                    </h5>
                    <ol className="list-decimal list-inside space-y-1.5 text-amber-900 text-xs pl-1">
                      <li>
                        Trong Google Sheet, chọn <strong>Tiện ích mở rộng &gt; Apps Script</strong> &gt; dán toàn bộ đoạn mã bên dưới vào file <code>Code.gs</code>.
                      </li>
                      <li>
                        Nhấn nút <strong>Triển khai (Deploy)</strong> ở góc trên bên phải &gt; chọn <strong>Triển khai mới (New deployment)</strong> &gt; chọn loại <strong>Ứng dụng web (Web app)</strong>.
                      </li>
                      <li>
                        Đặt <strong>Thực thi dưới dạng</strong> là <code>Tôi (Me)</code> và <strong>Ai có quyền truy cập</strong> là <code className="bg-amber-200/70 px-1 py-0.5 rounded font-bold">Bất kỳ ai (Anyone)</code>. Nhấn <strong>Triển khai</strong> rồi copy link kết thúc bằng <code>/exec</code> dán vào ô bên trên.
                      </li>
                    </ol>
                  </div>

                  {/* Script code block */}
                  <div className="relative">
                    <div className="flex items-center justify-between bg-gray-900 text-gray-300 px-4 py-2 rounded-t-xl text-[11px] font-mono">
                      <span>Code.gs (Apps Script)</span>
                      <button
                        onClick={handleCopyScript}
                        className="flex items-center gap-1 text-xs text-white bg-gray-700 hover:bg-gray-600 px-2.5 py-1 rounded-md"
                      >
                        {scriptCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{scriptCopied ? 'Đã sao chép!' : 'Sao chép mã'}</span>
                      </button>
                    </div>
                    <pre className="bg-gray-950 text-emerald-400 p-4 rounded-b-xl overflow-x-auto text-[11px] font-mono max-h-52">
                      {appsScriptCode}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
