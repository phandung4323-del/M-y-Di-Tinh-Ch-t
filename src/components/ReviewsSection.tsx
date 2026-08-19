import React, { useState } from 'react';
import { CUSTOMER_REVIEWS } from '../data/productData';
import { Star, ShieldCheck, ThumbsUp, MessageSquare } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [helpfulCounts, setHelpfulCounts] = useState<{ [id: string]: number }>({
    'rev-1': 42,
    'rev-2': 38,
    'rev-3': 51,
    'rev-4': 29
  });

  const handleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="reviews" className="py-8 sm:py-10 px-4 sm:px-6 bg-[#fcf9f8]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-[#e6deff] text-[#6050af] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            Đánh Giá Thực Tế
          </span>
          <h2 className="font-['Manrope'] font-bold text-2xl sm:text-3xl text-[#1c1b1b]">
            TRẢI NGHIỆM TỪ KHÁCH HÀNG
          </h2>
          
          {/* Aggregate Rating Badge */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-base text-[#1c1b1b]">4.95 / 5.0</span>
            <span className="text-xs text-[#797583]">(Dựa trên 1.420+ lượt đánh giá có hình ảnh)</span>
          </div>
        </div>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-[#e2d9f3] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Header author & stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#6050af]/20 shadow-xs shrink-0 bg-[#e6deff] flex items-center justify-center">
                      {rev.avatarUrl ? (
                        <img
                          src={rev.avatarUrl}
                          alt={rev.author}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {rev.author.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1c1b1b]">
                          {rev.author}
                        </h4>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" title="Đã mua hàng" />
                      </div>
                      <span className="text-[11px] text-[#797583] block">{rev.location} • {rev.date}</span>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Skin type tag */}
                <div className="inline-block bg-[#f8f7ff] border border-[#e2d9f3] text-[#6050af] text-[11px] font-semibold px-2.5 py-0.5 rounded-md mb-2.5">
                  Loại da: {rev.skinType}
                </div>

                {/* Title & Comment */}
                <h5 className="font-['Manrope'] font-bold text-xs sm:text-sm text-[#1c1b1b] mb-1">
                  "{rev.title}"
                </h5>
                <p className="text-xs sm:text-sm text-[#5d5e65] leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Footer helpful button */}
              <div className="pt-4 mt-4 border-t border-[#f0eded] flex items-center justify-between text-xs text-[#797583]">
                <span className="text-[11px] text-emerald-700 font-medium">✓ Đã xác thực đơn hàng thành công</span>
                <button
                  onClick={() => handleHelpful(rev.id)}
                  className="flex items-center gap-1.5 hover:text-[#6050af] transition-colors py-1 px-2 rounded-md hover:bg-[#f8f7ff]"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Hữu ích ({helpfulCounts[rev.id] || 0})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
