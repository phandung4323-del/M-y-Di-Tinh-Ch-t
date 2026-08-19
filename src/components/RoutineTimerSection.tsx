import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, Sparkles, Droplets, Zap, Snowflake } from 'lucide-react';

interface RoutineStep {
  stepNumber: number;
  title: string;
  durationMinutes: number;
  description: string;
  recommendedAction: string;
  icon: 'droplets' | 'sparkles' | 'zap' | 'snowflake';
}

const ROUTINE_STEPS: RoutineStep[] = [
  {
    stepNumber: 1,
    title: 'Khởi động & Làm sạch sâu (Cleanse)',
    durationMinutes: 3,
    description: 'Kẹp bông tẩy trang tẩm toner/nước tẩy trang vào đầu máy. Chọn chế độ Sạch sâu ion dương để hút sạch cặn trang điểm và dầu thừa.',
    recommendedAction: 'Di chuyển máy theo vòng tròn từ dưới cằm lên má và trán.',
    icon: 'droplets'
  },
  {
    stepNumber: 2,
    title: 'Đẩy tinh chất & Thẩm thấu (Infuse)',
    durationMinutes: 5,
    description: 'Thoa serum HA/Vitamin C/tinh chất lên mặt. Bật chế độ Đẩy tinh chất ion âm kèm nhiệt ấm 40°C để dưỡng chất thấm sâu vào trung bì.',
    recommendedAction: 'Lướt nhẹ nhàng từ trong ra ngoài, từ cánh mũi sang mang tai.',
    icon: 'sparkles'
  },
  {
    stepNumber: 3,
    title: 'Nâng cơ EMS & Chống nhăn (Lift & Anti-Aging)',
    durationMinutes: 4,
    description: 'Kích hoạt vi dòng EMS định hình V-line kết hợp ánh sáng đỏ 630nm để kích thích tăng sinh collagen và mờ rãnh cười.',
    recommendedAction: 'Kéo nhẹ dọc theo đường viền hàm và vùng rãnh khóe cười.',
    icon: 'zap'
  },
  {
    stepNumber: 4,
    title: 'Khóa ẩm & Làm lạnh (Cryo Cool)',
    durationMinutes: 3,
    description: 'Chuyển sang chế độ Làm lạnh 10°C và ánh sáng xanh để se khít hoàn toàn lỗ chân lông, khóa chặt serum và làm dịu da.',
    recommendedAction: 'Ấn nhẹ nhàng lên các vùng da vừa chăm sóc trong 10-15 giây.',
    icon: 'snowflake'
  }
];

export const RoutineTimerSection: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(ROUTINE_STEPS[0].durationMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const currentStep = ROUTINE_STEPS[currentStepIndex];

  // Handle countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      // Move to next step automatically
      if (currentStepIndex < ROUTINE_STEPS.length - 1) {
        const nextIndex = currentStepIndex + 1;
        setCurrentStepIndex(nextIndex);
        setSecondsLeft(ROUTINE_STEPS[nextIndex].durationMinutes * 60);
      } else {
        setIsRunning(false);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, currentStepIndex]);

  const selectStep = (index: number) => {
    setCurrentStepIndex(index);
    setSecondsLeft(ROUTINE_STEPS[index].durationMinutes * 60);
    setIsRunning(false);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalRoutineMinutes = ROUTINE_STEPS.reduce((acc, s) => acc + s.durationMinutes, 0);

  return (
    <section id="routine-timer" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#fcf9f8]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-[#e6deff] text-[#6050af] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            Liệu Trình Chuẩn Y Khoa
          </span>
          <h2 className="font-['Manrope'] font-bold text-2xl sm:text-3xl text-[#1c1b1b]">
            CHUẨN LIỆU TRÌNH {totalRoutineMinutes} PHÚT MỖI NGÀY
          </h2>
          <p className="text-sm text-[#484552] mt-1 max-w-lg mx-auto">
            Máy tự động điều chỉnh nhiệt độ và ngắt an toàn sau mỗi chu trình, chuẩn hoá từng thao tác như tại Spa 5 sao.
          </p>
        </div>

        {/* Routine Player Card */}
        <div className="bg-white rounded-3xl border border-[#e2d9f3] p-6 sm:p-8 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Step Selector List */}
            <div className="md:col-span-7 space-y-3">
              {ROUTINE_STEPS.map((step, idx) => {
                const isCurrent = idx === currentStepIndex;
                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => selectStep(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isCurrent
                        ? 'bg-[#f8f7ff] border-[#6050af] shadow-sm ring-1 ring-[#c9beff]'
                        : 'bg-white border-[#f0eded] hover:border-[#c9beff]'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isCurrent
                          ? 'bg-[#6050af] text-white shadow-xs'
                          : 'bg-[#f0eded] text-[#5d5e65]'
                      }`}
                    >
                      {step.stepNumber}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-['Manrope'] font-bold text-sm ${isCurrent ? 'text-[#6050af]' : 'text-[#1c1b1b]'}`}>
                          {step.title}
                        </h4>
                        <span className="text-xs font-bold text-[#797583] bg-[#f6f3f2] px-2 py-0.5 rounded-full">
                          {step.durationMinutes} phút
                        </span>
                      </div>
                      <p className="text-xs text-[#5d5e65] mt-1 leading-relaxed">
                        {step.description}
                      </p>
                      {isCurrent && (
                        <div className="mt-2 text-xs font-semibold text-[#6050af] bg-white p-2 rounded-lg border border-[#e2d9f3]">
                          👉 Thao tác: {step.recommendedAction}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Interactive Timer Widget */}
            <div className="md:col-span-5 bg-gradient-to-b from-[#f8f7ff] to-[#e6deff]/40 p-6 rounded-2xl border border-[#e2d9f3] text-center flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-[#6050af] uppercase tracking-wider mb-1">
                Bước {currentStep.stepNumber} / {ROUTINE_STEPS.length}
              </span>
              <h3 className="font-['Manrope'] font-bold text-base text-[#1c1b1b] mb-4">
                {currentStep.title.split('(')[0]}
              </h3>

              {/* Big Digital Countdown */}
              <div className="w-36 h-36 rounded-full bg-white border-4 border-[#6050af] shadow-md flex flex-col items-center justify-center mb-6 relative">
                <Clock className="w-4 h-4 text-[#6050af] mb-1" />
                <span className="font-['Manrope'] font-extrabold text-3xl text-[#1c1b1b] tracking-tight">
                  {formatTime(secondsLeft)}
                </span>
                <span className="text-[10px] text-[#797583] uppercase mt-0.5">
                  {isRunning ? 'Đang chạy' : 'Sẵn sàng'}
                </span>
              </div>

              {/* Player Controls */}
              <div className="flex items-center gap-3 w-full justify-center">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all ${
                    isRunning
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-[#6050af] text-white hover:bg-[#483795]'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  <span>{isRunning ? 'Tạm dừng' : 'Bắt đầu bước này'}</span>
                </button>

                <button
                  onClick={() => {
                    setSecondsLeft(currentStep.durationMinutes * 60);
                    setIsRunning(false);
                  }}
                  className="p-3 bg-white border border-[#c9c4d3] text-gray-600 hover:text-[#6050af] rounded-xl transition-colors shadow-xs"
                  title="Đặt lại"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
