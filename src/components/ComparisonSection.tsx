import React from 'react';
import { COMPARISON_TABLE } from '../data/productData';
import { Check, X, Sparkles } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section id="comparison" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#fcf9f8]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-[#e6deff] text-[#6050af] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            Phân Tích So Sánh
          </span>
          <h2 className="font-['Manrope'] font-bold text-2xl sm:text-3xl text-[#1c1b1b]">
            SO VỚI LIỆU TRÌNH SPA & THOA TAY TRUYỀN THỐNG
          </h2>
          <p className="text-sm text-[#484552] mt-1">
            Hiệu quả vượt trội, tiết kiệm tối đa thời gian và chi phí
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl shadow-md border border-[#e2d9f3] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#6050af]/10 text-[#6050af] font-['Manrope'] font-bold">
                  <th className="p-4 sm:p-5">Tiêu chí so sánh</th>
                  <th className="p-4 sm:p-5 border-l border-white bg-[#6050af] text-white">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Máy S1 Precision</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 border-l border-[#e2d9f3] text-[#484552]">Đi Spa / Thẩm Mỹ Viện</th>
                  <th className="p-4 sm:p-5 border-l border-[#e2d9f3] text-[#484552]">Thoa Tay Thông Thường</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eded]">
                {COMPARISON_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f7ff] transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-[#1c1b1b]">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 border-l border-[#e2d9f3] bg-[#f8f7ff]/70 text-[#6050af] font-bold">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.s1}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 border-l border-[#f0eded] text-[#5d5e65]">
                      {row.spa}
                    </td>
                    <td className="p-4 sm:p-5 border-l border-[#f0eded] text-[#797583]">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.hands}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
