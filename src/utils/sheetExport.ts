import { OrderData } from '../types';

export function exportToGoogleSheetsCsv(orders: OrderData[]) {
  if (!orders || orders.length === 0) return;

  const headers = [
    'Mã Đơn Hàng',
    'Thời Gian Đặt',
    'Họ Và Tên',
    'Số Điện Thoại',
    'Địa Chỉ Giao Hàng',
    'Gói Sản Phẩm',
    'Màu Sắc',
    'Tổng Tiền (VNĐ)',
    'Phương Thức',
    'Trạng Thái',
    'Ghi Chú'
  ];

  const statusLabels: Record<string, string> = {
    new: 'Mới đặt hàng',
    called: 'Đã gọi tư vấn',
    shipping: 'Đang giao hàng',
    completed: 'Đã hoàn tất',
    cancelled: 'Đã hủy'
  };

  const rows = orders.map((o) => [
    o.id,
    o.createdAt,
    `"${o.fullName.replace(/"/g, '""')}"`,
    `'${o.phone}`, // Prefix with quote so Excel/Sheets keeps leading zero
    `"${o.address.replace(/"/g, '""')}"`,
    `"${o.packageName.replace(/"/g, '""')}"`,
    o.color,
    o.totalPrice,
    o.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản VietQR',
    statusLabels[o.status || 'new'] || 'Mới đặt hàng',
    `"${(o.note || '').replace(/"/g, '""')}"`
  ]);

  // UTF-8 BOM \uFEFF for proper Vietnamese display in Google Sheets & Excel
  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Don_Hang_Lumina_S1_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function copyOrdersToGoogleSheetsClipboard(orders: OrderData[]): boolean {
  if (!orders || orders.length === 0) return false;

  const headers = [
    'Mã Đơn Hàng',
    'Thời Gian Đặt',
    'Họ Và Tên',
    'Số Điện Thoại',
    'Địa Chỉ Giao Hàng',
    'Gói Sản Phẩm',
    'Màu Sắc',
    'Tổng Tiền (VNĐ)',
    'Phương Thức',
    'Trạng Thái',
    'Ghi Chú'
  ];

  const statusLabels: Record<string, string> = {
    new: 'Mới đặt hàng',
    called: 'Đã gọi tư vấn',
    shipping: 'Đang giao hàng',
    completed: 'Đã hoàn tất',
    cancelled: 'Đã hủy'
  };

  const lines = orders.map((o) => [
    o.id,
    o.createdAt,
    o.fullName,
    o.phone,
    o.address,
    o.packageName,
    o.color,
    o.totalPrice,
    o.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản VietQR',
    statusLabels[o.status || 'new'] || 'Mới đặt hàng',
    o.note || ''
  ].join('\t'));

  const tsvText = [headers.join('\t'), ...lines].join('\n');

  try {
    navigator.clipboard.writeText(tsvText);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}

export const DEFAULT_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbzkhe_9TXjDW29s_Jck6ZcEfO5r7Lc5Xp7Z38rYNeytylgZMZ4hEWu6HMuMSNJrKpG5VA/exec';

export async function sendOrderToGoogleSheetWebhook(order: OrderData, customWebhookUrl?: string): Promise<boolean> {
  const webhookUrl = customWebhookUrl || DEFAULT_SHEET_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.startsWith('http')) return false;

  try {
    const payload = {
      orderId: order.id,
      createdAt: order.createdAt,
      fullName: order.fullName,
      phone: order.phone,
      address: order.address,
      packageName: order.packageName,
      color: order.color,
      totalPrice: order.totalPrice,
      paymentMethod: order.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản VietQR',
      status: 'Mới đặt hàng',
      note: order.note || ''
    };

    // Use text/plain in no-cors mode to ensure Google Apps Script receives the raw JSON string in e.postData.contents without CORS preflight issues
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return true;
  } catch (error) {
    console.error('Failed to trigger Google Sheet webhook', error);
    return false;
  }
}
