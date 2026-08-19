export interface DeviceMode {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  lightColor: 'lavender' | 'red' | 'blue' | 'amber' | 'cyan';
  lightHex: string;
  temperature: string;
  frequency: string;
  benefits: string[];
  recommendedSerum: string;
  durationMinutes: number;
}

export interface ProductPackage {
  id: string;
  name: string;
  badge?: string;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  gifts: string[];
  isPopular?: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  skinType: string;
  avatarBg: string;
  avatarUrl?: string;
  productPhotoUrl?: string;
}

export interface OrderData {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  note?: string;
  packageId: string;
  packageName: string;
  color: 'Lavender Purple' | 'Pearl White' | 'Rose Gold';
  totalPrice: number;
  paymentMethod: 'cod' | 'bank_transfer';
  status?: 'new' | 'called' | 'shipping' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
