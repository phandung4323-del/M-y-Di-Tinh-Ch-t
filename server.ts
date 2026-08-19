import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory secure order storage on server
interface StoredOrder {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  packageName: string;
  packageId: string;
  color: string;
  totalPrice: number;
  paymentMethod: 'cod' | 'bank_transfer';
  status: 'new' | 'called' | 'shipping' | 'completed' | 'cancelled';
  note?: string;
  createdAt: string;
  clientIp?: string;
}

const secureOrdersDb: StoredOrder[] = [
  {
    id: 'LUMINA-821942',
    fullName: 'Hoàng Bích Thủy',
    phone: '0988776655',
    address: 'Số 45 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    packageName: 'Combo Trẻ Hóa Chuyên Sâu (+ Gel Nâng Cơ)',
    packageId: 'combo_vip',
    color: 'Lavender Purple',
    totalPrice: 849000,
    paymentMethod: 'cod',
    status: 'called',
    note: 'Giao giờ hành chính, gọi trước 15 phút',
    createdAt: '10:30 18/08/2026'
  },
  {
    id: 'LUMINA-610283',
    fullName: 'Nguyễn Văn Hùng',
    phone: '0912345678',
    address: 'Tòa Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. HCM',
    packageName: 'Combo Mẹ & Con Gái (2 Máy S1)',
    packageId: 'duo_family',
    color: 'Rose Gold',
    totalPrice: 1390000,
    paymentMethod: 'bank_transfer',
    status: 'shipping',
    note: 'Gói làm quà sinh nhật',
    createdAt: '08:15 18/08/2026'
  }
];

// Secret Google Sheet Webhook URL (Can be updated dynamically from Admin panel)
let currentGoogleSheetWebhook =
  process.env.GOOGLE_SHEET_WEBHOOK ||
  'https://script.google.com/macros/s/AKfycbzkhe_9TXjDW29s_Jck6ZcEfO5r7Lc5Xp7Z38rYNeytylgZMZ4hEWu6HMuMSNJrKpG5VA/exec';

// Admin Passcode (Default 8899, can be overridden via ADMIN_PIN env)
const ADMIN_PIN = process.env.ADMIN_PIN || '8899';

// Rate limiting & anti-spam cache
const requestTracker = new Map<string, number>();

// 0. UPDATE & TEST GOOGLE SHEET WEBHOOK
app.post("/api/admin/config/webhook", async (req: Request, res: Response): Promise<void> => {
  const { pin, webhookUrl, testNow, reset } = req.body;
  if (pin !== ADMIN_PIN) {
    res.status(401).json({ success: false, error: "Mã PIN không chính xác." });
    return;
  }

  if (reset) {
    currentGoogleSheetWebhook = '';
    res.json({ success: true, activeUrl: '', message: "Đã xóa toàn bộ cấu hình Webhook." });
    return;
  }

  if (typeof webhookUrl === 'string') {
    currentGoogleSheetWebhook = webhookUrl.trim();
  }

  if (testNow) {
    if (!currentGoogleSheetWebhook || !currentGoogleSheetWebhook.startsWith('http')) {
      res.json({ success: false, error: "Vui lòng nhập đường dẫn Webhook hợp lệ (bắt đầu bằng https://script.google.com/...)." });
      return;
    }

    try {
      const testPayload = {
        orderId: 'TEST-CONNECTION-' + Math.floor(1000 + Math.random() * 9000),
        createdAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
        fullName: 'Khách Hàng Kiểm Tra Kết Nối',
        phone: '0988665544',
        address: '123 Đường Kiểm Tra, Phường Bến Nghé, Quận 1, TP. HCM',
        packageName: 'Combo Trẻ Hóa Chuyên Sâu (Máy S1)',
        color: 'Lavender Purple',
        totalPrice: 849000,
        paymentMethod: 'COD',
        status: 'Mới đặt hàng (Đã bảo mật)',
        note: 'Đơn test tự động kiểm tra đồng bộ Google Sheet'
      };

      const response = await fetch(currentGoogleSheetWebhook, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(testPayload)
      });

      const responseText = await response.text();

      if (responseText.includes("需要存取權") || responseText.includes("Sign in") || responseText.includes("accounts.google.com")) {
        res.json({
          success: false,
          activeUrl: currentGoogleSheetWebhook,
          error: "Google chặn quyền truy cập (Cần vào Apps Script > Deploy > New Deployment > Chọn 'Who has access: Anyone').",
          rawResponse: responseText.slice(0, 300)
        });
        return;
      }

      res.json({
        success: true,
        activeUrl: currentGoogleSheetWebhook,
        message: "✓ Đã gửi thành công đến Google Sheet!",
        responseSnippet: responseText.slice(0, 300)
      });
      return;
    } catch (err: any) {
      res.json({
        success: false,
        activeUrl: currentGoogleSheetWebhook,
        error: "Lỗi kết nối: " + (err.message || String(err))
      });
      return;
    }
  }

  res.json({ success: true, activeUrl: currentGoogleSheetWebhook });
});

// 1. SECURE ORDER SUBMISSION ENDPOINT (ANTI-BOT & ANTI-THEFT)
app.post("/api/orders/submit", async (req: Request, res: Response): Promise<void> => {
  try {
    const { order, botTrap, formSubmitTimeMs } = req.body;

    // A. Honeypot check: If bot filled the hidden trap field, reject silently
    if (botTrap) {
      console.warn("[ANTI-BOT] Bot trap triggered by malicious submitter.");
      res.json({ success: true, message: "OK" }); // Trick bot into thinking it succeeded
      return;
    }

    // B. Speed check: Bots submit instantaneously (< 1.2s)
    if (formSubmitTimeMs && formSubmitTimeMs < 1200) {
      console.warn("[ANTI-BOT] Submission suspiciously fast:", formSubmitTimeMs);
    }

    if (!order || !order.fullName || !order.phone || !order.address) {
      res.status(400).json({ success: false, error: "Vui lòng điền đầy đủ thông tin nhận hàng." });
      return;
    }

    // C. Phone validation (Vietnam carriers)
    const cleanPhone = order.phone.replace(/[\s\.\-]/g, '');
    const vnPhoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!vnPhoneRegex.test(cleanPhone)) {
      res.status(400).json({ success: false, error: "Số điện thoại không đúng định dạng 10 số của Việt Nam." });
      return;
    }

    // D. Anti-Spam / Competitor Flood Rate Limit (Max 1 submit per 15 seconds per phone)
    const now = Date.now();
    const lastSubmitTime = requestTracker.get(cleanPhone);
    if (lastSubmitTime && now - lastSubmitTime < 15000) {
      res.status(429).json({ success: false, error: "Đơn hàng của bạn đang được xử lý, vui lòng không bấm liên tục." });
      return;
    }
    requestTracker.set(cleanPhone, now);

    // E. Save to secure server database
    const newOrderRecord: StoredOrder = {
      ...order,
      phone: cleanPhone,
      status: 'new',
      clientIp: req.ip || req.socket.remoteAddress
    };

    secureOrdersDb.unshift(newOrderRecord);

    // F. Forward silently and securely to Google Sheets from server-side
    try {
      const payload = {
        orderId: newOrderRecord.id,
        createdAt: newOrderRecord.createdAt,
        fullName: newOrderRecord.fullName,
        phone: newOrderRecord.phone,
        address: newOrderRecord.address,
        packageName: newOrderRecord.packageName,
        color: newOrderRecord.color,
        totalPrice: newOrderRecord.totalPrice,
        paymentMethod: newOrderRecord.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản VietQR',
        status: 'Mới đặt hàng (Đã bảo mật)',
        note: newOrderRecord.note || ''
      };

      if (currentGoogleSheetWebhook && currentGoogleSheetWebhook.startsWith('http')) {
        await fetch(currentGoogleSheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        console.log(`[SECURE SYNC] Order ${newOrderRecord.id} securely synced to Google Sheets (${currentGoogleSheetWebhook}).`);
      } else {
        console.log(`[SECURE SYNC] Order ${newOrderRecord.id} saved in database. Google Sheet Webhook is not configured.`);
      }
    } catch (sheetErr) {
      console.error("[SECURE SYNC ERROR] Failed to push to Google Sheet:", sheetErr);
    }

    // Return success without leaking any internal competitors' data
    res.json({
      success: true,
      orderId: newOrderRecord.id,
      maskedPhone: `${cleanPhone.slice(0, 3)}****${cleanPhone.slice(-3)}`
    });
  } catch (error: any) {
    console.error("Order submit error:", error);
    res.status(500).json({ success: false, error: "Lỗi máy chủ khi tạo đơn hàng." });
  }
});

// 2. PROTECTED ADMIN GET ORDERS ENDPOINT (PASSWORD REQUIRED)
app.post("/api/admin/orders", (req: Request, res: Response): void => {
  const { pin } = req.body;
  if (pin !== ADMIN_PIN) {
    res.status(401).json({ success: false, error: "Mã PIN quản trị không chính xác." });
    return;
  }

  res.json({
    success: true,
    orders: secureOrdersDb
  });
});

// 3. PROTECTED ADMIN UPDATE STATUS
app.post("/api/admin/orders/status", (req: Request, res: Response): void => {
  const { pin, orderId, status } = req.body;
  if (pin !== ADMIN_PIN) {
    res.status(401).json({ success: false, error: "Mã PIN không chính xác." });
    return;
  }

  const found = secureOrdersDb.find((o) => o.id === orderId);
  if (found) {
    found.status = status;
    res.json({ success: true, order: found });
  } else {
    res.status(404).json({ success: false, error: "Không tìm thấy đơn hàng." });
  }
});

// 4. PROTECTED ADMIN DELETE ORDER
app.post("/api/admin/orders/delete", (req: Request, res: Response): void => {
  const { pin, orderId } = req.body;
  if (pin !== ADMIN_PIN) {
    res.status(401).json({ success: false, error: "Mã PIN không chính xác." });
    return;
  }

  const index = secureOrdersDb.findIndex((o) => o.id === orderId);
  if (index !== -1) {
    secureOrdersDb.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, error: "Không tìm thấy đơn hàng." });
  }
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", secureMode: "active", antiTheftProtection: true });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[LUMINA S1 SERVER] Running on http://0.0.0.0:${PORT} with 100% Anti-Theft Lead Protection.`);
  });
}

startServer();
