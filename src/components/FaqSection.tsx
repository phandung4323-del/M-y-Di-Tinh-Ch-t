import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/productData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#f6f3f2]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-white text-[#6050af] rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-[#e2d9f3]">
            Giải Đáp Thắc Mắc
          </span>
          <h2 className="font-['Manrope'] font-bold text-2xl sm:text-3xl text-[#1c1b1b]">
            CÂU HỎI THƯỜNG GẶP
          </h2>
          <p className="text-sm text-[#484552] mt-1">
            Mọi thông tin bạn cần biết trước khi sở hữu máy S1 Precision
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#e5e2e1] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#f8f7ff] transition-colors"
                >
                  <span className="font-['Manrope'] font-bold text-xs sm:text-sm text-[#1c1b1b]">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#f6f3f2] flex items-center justify-center text-[#6050af] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#e6deff]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5d5e65] leading-relaxed border-t border-[#f0eded] bg-[#fcf9f8]/60 animate-fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
