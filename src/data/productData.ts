import { DeviceMode, ProductPackage, CustomerReview, FaqItem } from '../types';

export const DEVICE_MODES: DeviceMode[] = [
  {
    id: 'cleanse',
    name: 'Làm Sạch Sâu',
    tagline: 'Ion dương (+) & Sóng âm Ultrasonic',
    description: 'Hút sạch bã nhờn, cặn trang điểm và bụi mịn PM2.5 nằm sâu trong lỗ chân lông mà rửa mặt bằng tay không thể chạm tới.',
    iconName: 'water_drop',
    lightColor: 'amber',
    lightHex: '#f59e0b',
    temperature: '38°C (Ấm nhẹ mở chân lông)',
    frequency: '10.000 rung/phút',
    benefits: [
      'Hút sạch dầu thừa và bã nhờn tích tụ',
      'Đánh bay cặn mỹ phẩm còn sót lại',
      'Ngăn ngừa mụn ẩn và viêm chân lông',
      'Chuẩn bị bề mặt da thông thoáng nhất'
    ],
    recommendedSerum: 'Dùng cùng nước tẩy trang hoặc sữa rửa mặt dịu nhẹ',
    durationMinutes: 3
  },
  {
    id: 'infuse',
    name: 'Đẩy Tinh Chất',
    tagline: 'Ion âm (-) & Tăng cường hấp thu 300%',
    description: 'Sử dụng điện trường ion cùng tần số đẩy các phân tử dưỡng chất (HA, Vitamin C, Niacinamide) thẩm thấu trực tiếp vào lớp trung bì.',
    iconName: 'switch_access_shortcut_add',
    lightColor: 'lavender',
    lightHex: '#9d8df1',
    temperature: '40°C (Kích hoạt thẩm thấu)',
    frequency: '12.000 rung/phút',
    benefits: [
      'Tăng khả năng hấp thu gấp 3 - 5 lần bôi tay',
      'Nuôi dưỡng tế bào da từ sâu bên trong',
      'Không gây lãng phí các loại serum đắt tiền',
      'Giúp da căng bóng, ngậm nước suốt 24h'
    ],
    recommendedSerum: 'Serum HA, Niacinamide, Vitamin C, Tinh chất chống lão hóa',
    durationMinutes: 5
  },
  {
    id: 'ems',
    name: 'Nâng Cơ EMS',
    tagline: 'Vi dòng điện sinh học & Định hình V-Line',
    description: 'Kích thích xung điện vi mô đến các bó cơ biểu cảm khuôn mặt, kích hoạt co giãn cơ tự nhiên, nâng đỡ vùng da chảy xệ.',
    iconName: 'bolt',
    lightColor: 'lavender',
    lightHex: '#7c3aed',
    temperature: 'Nhiệt độ phòng (Thư thái)',
    frequency: 'Xung EMS 3 cấp độ',
    benefits: [
      'Săn chắc cơ mặt, giảm nọng cằm rõ rệt',
      'Nâng cung mày và định hình đường viền hàm V-Line',
      'Ngăn ngừa da chùng nhão do lão hóa',
      'Tái lập độ đàn hồi tự nhiên cho cơ mặt'
    ],
    recommendedSerum: 'Gel massage nâng cơ hoặc kem dưỡng ẩm đậm đặc',
    durationMinutes: 4
  },
  {
    id: 'anti-aging',
    name: 'Chống Nhăn & Trẻ Hóa',
    tagline: 'Ánh sáng đỏ 630nm + Nhiệt hồng ngoại 42°C',
    description: 'Bước sóng ánh sáng đỏ sinh học kích thích tăng sinh nguyên bào sợi và sợi collagen mới, làm đầy các nếp nhăn tĩnh và động.',
    iconName: 'spa',
    lightColor: 'red',
    lightHex: '#ef4444',
    temperature: '42°C (Nhiệt hồng ngoại trị liệu)',
    frequency: '8.000 rung nhịp nhàng',
    benefits: [
      'Kích thích tăng sinh Collagen và Elastin mới',
      'Làm mờ rãnh cười, vết chân chim và nếp nhăn trán',
      'Cải thiện tuần hoàn máu dưới da, da hồng hào',
      'Phục hồi độ săn chắc và mịn màng như vừa đi spa'
    ],
    recommendedSerum: 'Serum Collagen, Retinol nồng độ nhẹ, Peptide',
    durationMinutes: 4
  },
  {
    id: 'eyecare',
    name: 'Chăm Sóc Mắt',
    tagline: 'Đầu vát cong chuyên biệt & Rung vi mô dịu nhẹ',
    description: 'Thiết kế bề mặt tiếp xúc tinh gọn ôm trọn hốc mắt, giảm áp lực mỏi mắt do máy tính và đánh tan hắc sắc tố gây thâm quầng.',
    iconName: 'visibility',
    lightColor: 'amber',
    lightHex: '#fbbf24',
    temperature: '40°C (Ấm dịu tan mệt mỏi)',
    frequency: '6.000 rung êm ái',
    benefits: [
      'Giảm sưng bọng mắt sau đêm thức khuya',
      'Làm mờ quầng thâm mắt hiệu quả',
      'Giảm mỏi mắt cho người dùng máy tính nhiều',
      'Tăng độ thẩm thấu của kem mắt đắt tiền'
    ],
    recommendedSerum: 'Kem mắt / Serum dưỡng mắt chuyên dụng',
    durationMinutes: 3
  },
  {
    id: 'cool',
    name: 'Làm Lạnh + Blue Light',
    tagline: 'Cryo-cooling 10°C & Ánh sáng xanh 415nm',
    description: 'Hạ nhiệt tức thì khóa trọn dưỡng chất vào trong da, se khít lỗ chân lông và diệt khuẩn P.acnes gây mụn trứng cá.',
    iconName: 'ac_unit',
    lightColor: 'cyan',
    lightHex: '#06b6d4',
    temperature: '10°C - 12°C (Mát lạnh sảng khoái)',
    frequency: 'Rung dịu êm',
    benefits: [
      'Se khít lỗ chân lông ngay lập tức',
      'Khóa trọn độ ẩm và serum vừa đẩy vào da',
      'Làm dịu da kích ứng, ửng đỏ sau khi đi nắng',
      'Ánh sáng xanh kháng khuẩn, ức chế mụn phát triển'
    ],
    recommendedSerum: 'Khóa ẩm trực tiếp sau các bước dưỡng',
    durationMinutes: 2
  }
];

export const PRODUCT_PACKAGES: ProductPackage[] = [
  {
    id: 'standard',
    name: 'Gói Tiêu Chuẩn - 1 Máy S1',
    badge: 'ƯU ĐÃI 45%',
    originalPrice: 1350000,
    salePrice: 749000,
    discountPercent: 45,
    gifts: [
      '1x Thân máy S1 Precision chính hãng',
      '1x Cáp sạc Type-C siêu nhanh',
      '1x Vòng cố định bông tẩy trang chuyên dụng',
      '1x Sách hướng dẫn sử dụng tiếng Việt',
      '1x Thẻ bảo hành 12 tháng 1 đổi 1'
    ],
    isPopular: false
  },
  {
    id: 'combo_vip',
    name: 'Combo Trẻ Hóa Chuyên Sâu (+ Gel Nâng Cơ)',
    badge: 'BÁN CHẠY NHẤT ★',
    originalPrice: 1750000,
    salePrice: 899000,
    discountPercent: 48,
    gifts: [
      'Toàn bộ phụ kiện bản tiêu chuẩn',
      'TẶNG 1 Tuýp Gel Dẫn Điện Nâng Cơ Cao Cấp 150ml (Trị giá 250k)',
      'TẶNG 1 Hộp 100 Miếng Bông Tẩy Trang Chuyên Dụng (Trị giá 50k)',
      'Miễn phí vận chuyển hỏa tốc toàn quốc',
      'Đặc quyền ưu tiên đổi mới trong 30 ngày'
    ],
    isPopular: true
  },
  {
    id: 'duo_family',
    name: 'Combo Mẹ & Con Gái (2 Máy S1)',
    badge: 'TIẾT KIỆM 1.4TR',
    originalPrice: 2700000,
    salePrice: 1390000,
    discountPercent: 49,
    gifts: [
      '2x Máy S1 Precision (Tùy chọn màu sắc)',
      'TẶNG 2 Tuýp Gel Dẫn Điện Cao Cấp 150ml',
      'TẶNG 2 Hộp Bông Chuyên Dụng',
      'Túi quà tặng Premium Gift Box sang trọng',
      'Miễn phí giao hàng & Kiểm tra trước khi thanh toán'
    ],
    isPopular: false
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Nguyễn Bích Ngọc',
    location: 'Quận 1, TP. Hồ Chí Minh',
    rating: 5,
    date: '3 ngày trước',
    title: 'Da căng bóng sau 2 tuần dùng chế độ Đẩy Tinh Chất & EMS',
    comment: 'Mình dùng serum Estee Lauder trước đây toàn bôi tay thấy thẩm thấu chậm. Từ khi sắm em S1 này, mỗi tối bật chế độ Infuse rồi chuyển sang EMS nâng cơ, da sáng mịn thấy rõ! Nọng cằm cảm giác gọn hơn hẳn, máy cầm rất vừa tay và sang.',
    verified: true,
    skinType: 'Da hỗn hợp thiên dầu, có nọng cằm',
    avatarBg: 'bg-purple-600'
  },
  {
    id: 'rev-2',
    author: 'Trần Thị Thu Hương',
    location: 'Cầu Giấy, Hà Nội',
    rating: 5,
    date: '1 tuần trước',
    title: 'Chế độ làm lạnh và chăm sóc mắt cực kỳ đỉnh!',
    comment: 'Làm việc văn phòng nhìn màn hình nhiều mắt thâm và mỏi. Buổi tối mình dùng chế độ Chăm sóc mắt 40°C siêu dễ chịu, rồi chuyển sang Làm lạnh se khít chân lông. Sáng hôm sau dậy mắt không còn sưng nữa. Rất đáng đồng tiền.',
    verified: true,
    skinType: 'Da nhạy cảm, quầng thâm mắt',
    avatarBg: 'bg-rose-600'
  },
  {
    id: 'rev-3',
    author: 'Lê Thanh Mai',
    location: 'Hải Châu, Đà Nẵng',
    rating: 5,
    date: '2 tuần trước',
    title: 'Đóng gói cực đẹp, mua làm quà sinh nhật cho mẹ rất ưng',
    comment: 'Máy có hộp quà Premium Gift Box nhìn sang như đồ tiền triệu. Mẹ mình năm nay 52 tuổi dùng chế độ Chống nhăn nhiệt đỏ 42°C rất thích, bảo da mềm hơn và rãnh cười đỡ sâu. Giao hàng hỏa tốc 2 ngày là nhận được.',
    verified: true,
    skinType: 'Da lão hóa, nhiều nếp nhăn',
    avatarBg: 'bg-indigo-600'
  },
  {
    id: 'rev-4',
    author: 'Phạm Phương Thảo',
    location: 'Ninh Kiều, Cần Thơ',
    rating: 5,
    date: 'Hôm qua',
    title: 'Hút được rất nhiều bụi bẩn mà bông rửa mặt thường bỏ sót',
    comment: 'Kẹp bông vào chế độ Cleanse máy rung ấm và hút ion, miếng bông đen ngòm bất ngờ dù vừa rửa mặt xong. Cực kỳ ấn tượng với chất lượng!',
    verified: true,
    skinType: 'Da dầu mụn, lỗ chân lông to',
    avatarBg: 'bg-teal-600'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Sử dụng',
    question: 'Máy có dễ sử dụng cho người mới bắt đầu không?',
    answer: 'Cực kỳ đơn giản! Máy trang bị màn hình hiển thị LED rõ nét và nút chuyển chế độ 1 chạm thông minh. Có sách hướng dẫn tiếng Việt đi kèm, người lớn tuổi cũng có thể tự dùng dễ dàng.'
  },
  {
    category: 'An toàn & Da',
    question: 'Sản phẩm có an toàn cho làn da nhạy cảm hoặc đang có mụn không?',
    answer: 'Hoàn toàn an toàn. Mặt tiếp xúc của máy làm bằng hợp kim y tế chống gỉ, không gây kích ứng. Với da mụn hoặc nhạy cảm, bạn nên dùng chế độ Sạch sâu nhẹ nhàng và chế độ Làm lạnh ánh sáng xanh để làm dịu, tiêu viêm.'
  },
  {
    category: 'Kỹ thuật & Pin',
    question: 'Pin 1200mAh dùng được bao lâu mỗi lần sạc?',
    answer: 'Với dung lượng pin Lithium 1200mAh cao cấp, mỗi lần sạc đầy (khoảng 2 tiếng qua cổng Type-C) bạn có thể sử dụng liên tục từ 15 đến 20 ngày (mỗi ngày 15 phút).'
  },
  {
    category: 'Bảo hành & Giao hàng',
    question: 'Chính sách bảo hành và đổi trả như thế nào?',
    answer: 'Lumina S1 cam kết bảo hành chính hãng 12 tháng, lỗi 1 đổi 1 trong 30 ngày đầu tiên nếu có bất kỳ lỗi nào từ nhà sản xuất. Khách hàng được kiểm tra hàng trước khi thanh toán.'
  },
  {
    category: 'Hiệu quả',
    question: 'Sau bao lâu thì thấy hiệu quả nâng cơ và cải thiện da?',
    answer: 'Bạn sẽ cảm nhận da mềm mịn, căng mọng ngay sau lần đầu tiên sử dụng. Để thấy rõ hiệu quả nâng cơ V-line, mờ thâm quầng mắt và giảm rãnh nhăn, hãy kiên trì sử dụng từ 2 - 4 tuần kết hợp với tinh chất dưỡng phù hợp.'
  }
];

export const COMPARISON_TABLE = [
  {
    feature: 'Chi phí đầu tư',
    s1: '749.000đ (Dùng trọn đời ~2.000đ/ngày)',
    spa: '300k - 800k / Mỗi lần đi Spa',
    hands: 'Miễn phí nhưng hiệu quả rất thấp'
  },
  {
    feature: 'Độ thẩm thấu tinh chất',
    s1: 'Thẩm thấu 90% (Sóng Ion & Nhiệt ấm 42°C)',
    spa: 'Thẩm thấu 85% (Phụ thuộc liệu trình)',
    hands: 'Chỉ hấp thu 15-20% ở lớp biểu bì ngoài'
  },
  {
    feature: 'Chức năng nâng cơ & Định hình',
    s1: 'Vi dòng EMS 3 cấp độ chuẩn V-line',
    spa: 'Có (nhưng phải đi đều hàng tuần)',
    hands: 'Không nâng được các bó cơ sâu'
  },
  {
    feature: 'Làm lạnh se khít chân lông',
    s1: 'Đầu Cryo 10°C + Ánh sáng xanh 415nm',
    spa: 'Có phụ phí gói nâng cao',
    hands: 'Không có (hoặc dùng đá lạnh dễ bỏng lạnh)'
  },
  {
    feature: 'Tiện lợi & Di động',
    s1: 'Nhỏ gọn 150g, bỏ túi đi du lịch/văn phòng',
    spa: 'Phải đặt lịch và di chuyển mất thời gian',
    hands: 'Tiện nhưng không có tác dụng trị liệu'
  }
];
