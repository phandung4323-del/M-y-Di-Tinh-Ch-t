import React, { useState, useEffect } from 'react';
import { DEVICE_MODES } from '../data/productData';
import { DeviceMode } from '../types';
import { Sparkles, Power, Flame, Zap, Droplets, Volume2, VolumeX, Eye, Snowflake, Play, Pause, RefreshCw, CheckCircle } from 'lucide-react';

export const InteractiveDeviceSimulator: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<DeviceMode>(DEVICE_MODES[0]);
  const [intensity, setIntensity] = useState<1 | 2 | 3>(2);
  const [isOn, setIsOn] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [activeTimer, setActiveTimer] = useState<number>(180); // seconds
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Reset timer whenever mode changes
  useEffect(() => {
    setActiveTimer(selectedMode.durationMinutes * 60);
    setIsTimerRunning(false);
  }, [selectedMode]);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && activeTimer > 0) {
      interval = setInterval(() => {
        setActiveTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (activeTimer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, activeTimer]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get color themes for simulator ring
  const getHaloStyle = () => {
    if (!isOn) return 'bg-gray-300 opacity-20';
    switch (selectedMode.lightColor) {
      case 'red':
        return 'bg-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.6)] animate-pulse';
      case 'blue':
      case 'cyan':
        return 'bg-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.6)] animate-pulse';
      case 'amber':
        return 'bg-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.6)] animate-pulse';
      case 'lavender':
      default:
        return 'bg-[#9d8df1] shadow-[0_0_40px_rgba(157,141,241,0.6)] animate-pulse';
    }
  };

  return (
    <section id="virtual-tester" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#fcf9f8] relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e6deff] rounded-full text-[#6050af] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phòng Thí Nghiệm Ảo</span>
          </div>
          <h2 className="font-['Manrope'] font-bold text-2xl sm:text-3xl text-[#1c1b1b]">
            TRẢI NGHIỆM TƯƠNG TÁC 6 CHẾ ĐỘ
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-[#484552] mt-2 max-w-xl mx-auto">
            Bấm chọn các chế độ bên dưới để xem trực tiếp bước sóng ánh sáng, nhiệt độ nhiệt trị liệu và công nghệ ion hoạt động trên da.
          </p>
        </div>

        {/* Interactive Simulator Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-[#e2d9f3] shadow-lg">
          {/* Left Column: Virtual Device Graphic & Feedback */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#f8f7ff] to-[#f0eded] rounded-2xl border border-[#e2d9f3]/60 relative overflow-hidden">
            {/* Device Head Glow Simulator */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-6">
              {/* Outer Wave Rings */}
              {isOn && (
                <>
                  <div
                    className={`absolute inset-0 rounded-full ${getHaloStyle()} opacity-40 transition-all duration-500`}
                    style={{
                      animationDuration: intensity === 3 ? '1s' : intensity === 2 ? '1.8s' : '2.5s'
                    }}
                  ></div>
                  <div
                    className={`absolute -inset-4 rounded-full border-2 border-dashed border-[#9d8df1]/40 animate-spin`}
                    style={{ animationDuration: '20s' }}
                  ></div>
                </>
              )}

              {/* Physical Head Rim */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-slate-100 to-slate-300 border-4 border-white shadow-xl flex flex-col items-center justify-center relative z-10">
                {/* Mode Icon & Status */}
                <div
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-white transition-all duration-300 ${
                    isOn ? 'shadow-inner' : 'bg-gray-400'
                  }`}
                  style={{
                    backgroundColor: isOn ? selectedMode.lightHex : '#9ca3af'
                  }}
                >
                  {selectedMode.id === 'cleanse' && <Droplets className="w-8 h-8 animate-bounce" />}
                  {selectedMode.id === 'infuse' && <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />}
                  {selectedMode.id === 'ems' && <Zap className="w-8 h-8 animate-pulse" />}
                  {selectedMode.id === 'anti-aging' && <Flame className="w-8 h-8 animate-bounce" />}
                  {selectedMode.id === 'eyecare' && <Eye className="w-8 h-8" />}
                  {selectedMode.id === 'cool' && <Snowflake className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />}
                  
                  <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">
                    {isOn ? `Cấp ${intensity}` : 'OFF'}
                  </span>
                </div>

                {/* Heat Indicator */}
                {isOn && (
                  <span className="text-[10px] font-bold text-[#6050af] mt-1 bg-white/90 px-2 py-0.5 rounded-full shadow-xs">
                    {selectedMode.temperature.split('(')[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Device Hardware Controls */}
            <div className="flex items-center gap-3 z-10 w-full justify-center">
              {/* Power button */}
              <button
                onClick={() => setIsOn(!isOn)}
                className={`p-3 rounded-full flex items-center justify-center transition-all ${
                  isOn
                    ? 'bg-[#6050af] text-white shadow-md'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                title="Bật / Tắt máy"
              >
                <Power className="w-5 h-5" />
              </button>

              {/* Intensity Switcher */}
              <div className="flex bg-white rounded-full p-1 border border-[#c9c4d3] shadow-xs">
                {[1, 2, 3].map((lvl) => (
                  <button
                    key={lvl}
                    disabled={!isOn}
                    onClick={() => setIntensity(lvl as 1 | 2 | 3)}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                      intensity === lvl && isOn
                        ? 'bg-[#6050af] text-white shadow-xs'
                        : 'text-[#484552] hover:bg-[#f0eded]'
                    } ${!isOn ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Mức {lvl}
                  </button>
                ))}
              </div>

              {/* Sound Simulation toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2.5 rounded-full border transition-all ${
                  soundEnabled
                    ? 'bg-[#e6deff] border-[#6050af] text-[#6050af]'
                    : 'bg-white border-[#c9c4d3] text-gray-400'
                }`}
                title="Âm thanh mô phỏng rung siêu âm"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Routine Timer Preview */}
            <div className="mt-4 w-full bg-white/80 rounded-xl p-3 border border-[#e2d9f3] flex items-center justify-between">
              <div className="text-left">
                <span className="text-[11px] text-[#797583] block">Thời gian chuẩn</span>
                <span className="font-['Manrope'] font-bold text-base text-[#1c1b1b]">
                  {formatTimer(activeTimer)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={!isOn}
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    isTimerRunning
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-[#6050af] text-white'
                  } ${!isOn ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isTimerRunning ? 'Tạm dừng' : 'Bắt đầu'}</span>
                </button>
                <button
                  disabled={!isOn}
                  onClick={() => {
                    setActiveTimer(selectedMode.durationMinutes * 60);
                    setIsTimerRunning(false);
                  }}
                  className="p-2 text-gray-500 hover:text-[#6050af] rounded-lg hover:bg-gray-100"
                  title="Đặt lại thời gian"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Mode Selector Chips & Detailed Specs */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="font-['Manrope'] font-bold text-lg text-[#1c1b1b]">
              Chọn chế độ muốn trải nghiệm:
            </h3>

            {/* 6 Mode Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {DEVICE_MODES.map((mode) => {
                const isActive = selectedMode.id === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setSelectedMode(mode);
                      setIsOn(true);
                    }}
                    className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#6050af] text-white border-[#6050af] shadow-md scale-[1.02]'
                        : 'bg-[#f8f7ff] text-[#1c1b1b] border-[#e2d9f3] hover:border-[#9d8df1] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`w-2.5 h-2.5 rounded-full`}
                        style={{ backgroundColor: mode.lightHex }}
                      ></span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#e2d9f3] text-[#6050af]'
                      }`}>
                        {mode.durationMinutes}p
                      </span>
                    </div>
                    <span className="font-['Manrope'] font-bold text-xs leading-snug">
                      {mode.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Mode Details Card */}
            <div className="bg-[#f8f7ff] border border-[#e2d9f3] rounded-2xl p-5 mt-2">
              <div className="flex items-center justify-between border-b border-[#e2d9f3] pb-3 mb-3">
                <div>
                  <h4 className="font-['Manrope'] font-bold text-base text-[#6050af]">
                    Chế độ: {selectedMode.name}
                  </h4>
                  <p className="text-xs text-[#5d5e65] font-medium">
                    {selectedMode.tagline}
                  </p>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: selectedMode.lightHex }}
                >
                  ✓
                </div>
              </div>

              <p className="text-sm text-[#1c1b1b] mb-4">
                {selectedMode.description}
              </p>

              {/* Key Benefits Bullets */}
              <div className="space-y-1.5 mb-4">
                <span className="text-xs font-bold text-[#484552] uppercase tracking-wide block">
                  Hiệu quả mang lại:
                </span>
                {selectedMode.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-[#1c1b1b]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#6050af] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Serum recommendation note */}
              <div className="bg-white p-2.5 rounded-xl border border-[#e2d9f3] text-xs text-[#6050af] flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-[#9d8df1]" />
                <span>
                  <strong>Gợi ý tinh chất:</strong> {selectedMode.recommendedSerum}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
