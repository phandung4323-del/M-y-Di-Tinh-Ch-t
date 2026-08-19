import React, { useState } from 'react';
import { Sparkles, HelpCircle, Check, ArrowRight, RefreshCw, Gift } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    skinType: string;
    recommendedMode: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Tình trạng da mặt của bạn vào buổi chiều như thế nào?',
    options: [
      { label: 'Đổ nhiều dầu vùng chữ T, bóng nhờn', skinType: 'Da dầu/hỗn hợp thiên dầu', recommendedMode: 'Làm sạch sâu + Làm lạnh Cryo' },
      { label: 'Căng rát, khô ráp, dễ bong tróc', skinType: 'Da khô/thiếu nước', recommendedMode: 'Đẩy tinh chất HA + Nhiệt ấm 40°C' },
      { label: 'Dễ ửng đỏ, ngứa khi thời tiết thay đổi', skinType: 'Da nhạy cảm', recommendedMode: 'Làm lạnh ánh sáng xanh 415nm' },
      { label: 'Xuất hiện nếp nhăn đuôi mắt, nọng cằm', skinType: 'Da bắt đầu lão hóa', recommendedMode: 'Nâng cơ EMS + Ánh sáng đỏ 630nm' }
    ]
  },
  {
    id: 2,
    question: 'Mối bận tâm lớn nhất về khuôn mặt của bạn hiện tại là gì?',
    options: [
      { label: 'Mặt to, có nọng cằm, đường viền hàm không rõ', skinType: 'Cần nâng cơ V-line', recommendedMode: 'EMS Lift cấp độ 3' },
      { label: 'Lỗ chân lông to, nhiều mụn đầu đen/bã nhờn', skinType: 'Bít tắc lỗ chân lông', recommendedMode: 'Cleanse ion dương' },
      { label: 'Quầng thâm mắt sâu, bọng mắt to vì thức khuya', skinType: 'Mắt mệt mỏi', recommendedMode: 'Eye Care nhiệt ấm' },
      { label: 'Da xỉn màu, thoa kem dưỡng mãi không trắng', skinType: 'Kém hấp thu dưỡng chất', recommendedMode: 'Infuse ion âm' }
    ]
  }
];

export const SkinConsultationQuiz: React.FC<{ onApplyVoucher: (code: string) => void }> = ({ onApplyVoucher }) => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [voucherCopied, setVoucherCopied] = useState<boolean>(false);

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQIndex(0);
    setAnswers([]);
    setIsFinished(false);
  };

  const handleCopyAndApply = () => {
    onApplyVoucher('DEPCHUANSPA50');
    setVoucherCopied(true);
    setTimeout(() => setVoucherCopied(false), 3000);
  };

  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 bg-[#f8f7ff]">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#e2d9f3] p-6 sm:p-8 shadow-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#e6deff] rounded-full text-[#6050af] text-xs font-bold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trắc Nghiệm 30 Giây</span>
          </div>
          <h2 className="font-['Manrope'] font-bold text-xl sm:text-2xl text-[#1c1b1b]">
            CHẨN ĐOÁN LÀN DA & NHẬN PHÁC ĐỒ ROUTINE RIÊNG
          </h2>
          <p className="text-xs sm:text-sm text-[#484552] mt-1">
            Hoàn thành trắc nghiệm để nhận ngay voucher giảm thêm <strong>50.000đ</strong> khi mua máy S1
          </p>
        </div>

        {!isFinished ? (
          <div>
            <div className="flex items-center justify-between text-xs text-[#797583] mb-3">
              <span>Câu hỏi {currentQIndex + 1} / {QUIZ_QUESTIONS.length}</span>
              <span className="font-semibold text-[#6050af]">Tiến độ {Math.round(((currentQIndex + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#f0eded] rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-[#6050af] transition-all duration-300 rounded-full"
                style={{ width: `${((currentQIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            <h3 className="font-['Manrope'] font-bold text-base sm:text-lg text-[#1c1b1b] mb-4">
              {QUIZ_QUESTIONS[currentQIndex].question}
            </h3>

            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentQIndex].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full p-4 text-left rounded-2xl border border-[#e2d9f3] bg-[#fcf9f8] hover:bg-[#e6deff]/40 hover:border-[#6050af] transition-all flex items-center justify-between group"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#1c1b1b] group-hover:text-[#6050af]">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#6050af] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 space-y-5 animate-fade-in">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <Check className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-['Manrope'] font-bold text-lg sm:text-xl text-[#1c1b1b]">
                Kết quả chẩn đoán: Cần phục hồi & Tăng cường đàn hồi
              </h3>
              <p className="text-xs sm:text-sm text-[#484552] mt-1 max-w-md mx-auto">
                Liệu trình tối ưu cho bạn: <strong>Chế độ Sạch sâu 3p ➔ Đẩy tinh chất 5p ➔ Nâng cơ EMS V-line 4p ➔ Khóa ẩm lạnh 3p</strong>.
              </p>
            </div>

            {/* Voucher Box */}
            <div className="bg-[#f8f7ff] border-2 border-dashed border-[#6050af] p-4 rounded-2xl max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#6050af] uppercase mb-1">
                <Gift className="w-4 h-4 text-rose-500" />
                <span>Mã Ưu Đãi Độc Quyền Dành Riêng Cho Bạn</span>
              </div>
              <div className="font-['Manrope'] font-extrabold text-xl text-[#6050af] tracking-wider my-1">
                DEPCHUANSPA50
              </div>
              <p className="text-[11px] text-[#797583] mb-3">Giảm thêm 50.000đ trực tiếp vào đơn hàng hôm nay</p>

              <button
                onClick={handleCopyAndApply}
                className="w-full py-2.5 px-4 bg-[#6050af] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#483795] transition-all shadow-xs"
              >
                {voucherCopied ? '✓ Đã Áp Dụng Mã Thành Công!' : 'ÁP DỤNG MÃ VÀO ĐƠN HÀNG NGAY'}
              </button>
            </div>

            <div>
              <button
                onClick={handleReset}
                className="text-xs text-[#797583] hover:text-[#6050af] inline-flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Làm lại trắc nghiệm</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
