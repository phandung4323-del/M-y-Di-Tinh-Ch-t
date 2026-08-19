/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveDeviceSimulator } from './components/InteractiveDeviceSimulator';
import { ProblemSection } from './components/ProblemSection';
import { SixInOneFeatures } from './components/SixInOneFeatures';
import { SkinTransformationGallery } from './components/SkinTransformationGallery';
import { ErgonomicsSection } from './components/ErgonomicsSection';
import { TechnologyDeepDive } from './components/TechnologyDeepDive';
import { RoutineTimerSection } from './components/RoutineTimerSection';
import { UseCasesSection } from './components/UseCasesSection';
import { ComparisonSection } from './components/ComparisonSection';
import { GiftAndSpecsSection } from './components/GiftAndSpecsSection';
import { SkinConsultationQuiz } from './components/SkinConsultationQuiz';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { OrderFormSection } from './components/OrderFormSection';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrdersManagerModal } from './components/OrdersManagerModal';
import { BottomStickyBar } from './components/BottomStickyBar';
import { Footer } from './components/Footer';
import { OrderData } from './types';
import { sendOrderToGoogleSheetWebhook, DEFAULT_SHEET_WEBHOOK_URL } from './utils/sheetExport';

const INITIAL_DEMO_ORDERS: OrderData[] = [
  {
    id: 'LUMINA-821942',
    fullName: 'Hoàng Bích Thủy',
    phone: '0988776655',
    address: 'Số 45 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    packageName: 'Gói Tiêu Chuẩn - 1 Máy S1',
    packageId: 'standard',
    color: 'Lavender Purple',
    totalPrice: 749000,
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

export default function App() {
  const [appliedVoucher, setAppliedVoucher] = useState<string>('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderData | null>(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState<boolean>(false);
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    return localStorage.getItem('lumina_sheet_webhook') || DEFAULT_SHEET_WEBHOOK_URL;
  });

  // Orders State with localStorage persistence
  const [orders, setOrders] = useState<OrderData[]>(() => {
    const saved = localStorage.getItem('lumina_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved orders', e);
      }
    }
    return INITIAL_DEMO_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('lumina_orders', JSON.stringify(orders));
  }, [orders]);

  const handleApplyVoucher = (code: string) => {
    setAppliedVoucher(code);
    // Smooth scroll to order form if quiz finished
    const el = document.getElementById('order-form-final');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSuccess = (newOrder: OrderData) => {
    setOrders((prev) => [newOrder, ...prev]);
    setConfirmedOrder(newOrder);

    // If a webhook URL is configured, push to Google Sheets automatically
    if (webhookUrl) {
      sendOrderToGoogleSheetWebhook(newOrder, webhookUrl);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderData['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    }
  };

  const handleSaveWebhook = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem('lumina_sheet_webhook', url);
  };

  const scrollToOrder = () => {
    const el = document.getElementById('order-form-final');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToModes = () => {
    const el = document.getElementById('six-modes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#1c1b1b] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col relative selection:bg-[#c9beff] selection:text-[#1b0062]">
      {/* Top Navbar */}
      <Navbar
        onOpenCart={scrollToOrder}
        cartCount={1}
        ordersCount={orders.length}
        onOpenOrdersManager={() => setIsOrdersModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onExploreModes={scrollToModes} onOpenOrderForm={scrollToOrder} />

        {/* 2. Interactive Device Virtual Simulator */}
        <InteractiveDeviceSimulator />

        {/* 3. Problem Section & Underlying Causes */}
        <ProblemSection />

        {/* 4. 6-in-1 Detailed Features */}
        <SixInOneFeatures />

        {/* 5. Real Clinical Skin Transformation Gallery (Before & After) */}
        <SkinTransformationGallery />

        {/* 6. Ergonomics & Face Contour */}
        <ErgonomicsSection />

        {/* 6. Technology Deep Dive (Rollers, 2-way rotation, Heat 42C, Vibration, 3 Levels) */}
        <TechnologyDeepDive />

        {/* 7. 15-Minute Daily Routine Step-by-Step with Countdown Timer */}
        <RoutineTimerSection />

        {/* 8. Use Cases & 8 Buying Reasons */}
        <UseCasesSection />

        {/* 9. Comparison Table (Vs Spa & Hand application) */}
        <ComparisonSection />

        {/* 10. Gift Box Packaging & Detailed Technical Specs */}
        <GiftAndSpecsSection />

        {/* 11. Skin Consultation Mini Quiz with Promo Voucher */}
        <SkinConsultationQuiz onApplyVoucher={handleApplyVoucher} />

        {/* 12. Verified Customer Reviews */}
        <ReviewsSection />

        {/* 13. Frequently Asked Questions (FAQ Accordion) */}
        <FaqSection />

        {/* 14. Checkout Order Form Section */}
        <OrderFormSection
          appliedVoucher={appliedVoucher}
          onApplyVoucher={handleApplyVoucher}
          onOrderSuccess={handleOrderSuccess}
        />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsOrdersModalOpen(true)} />

      {/* Mobile Sticky Floating Bar */}
      <BottomStickyBar onOpenOrder={scrollToOrder} onOpenInfo={scrollToModes} />

      {/* Order Confirmation Modal */}
      <OrderSuccessModal order={confirmedOrder} onClose={() => setConfirmedOrder(null)} />

      {/* Orders Manager & Google Sheets Export Modal */}
      {isOrdersModalOpen && (
        <OrdersManagerModal
          orders={orders}
          onClose={() => setIsOrdersModalOpen(false)}
          onUpdateStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          webhookUrl={webhookUrl}
          onSaveWebhookUrl={handleSaveWebhook}
        />
      )}
    </div>
  );
}
