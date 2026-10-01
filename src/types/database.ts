export interface OrderRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  menuId: string;
  menuName: string;
  spiceLevel: number;
  spiceLevelName: string;
  quantity: number;
  toppings: string;
  notes: string;
  totalPrice: number;
  platform: 'WhatsApp' | 'GoFood' | 'GrabFood' | 'ShopeeFood' | 'DineIn';
  status: 'pending' | 'cooking' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  city: string;
  packageChoice: string;
  budgetRange: string;
  notes: string;
  status: 'new' | 'contacted' | 'meeting_scheduled' | 'deal_closed' | 'rejected';
  createdAt: string;
}

export interface InventoryRecord {
  id: string;
  itemName: string;
  category: 'Bahan Baku' | 'Topping' | 'Bumbu Rempah' | 'Kemasan';
  stock: number;
  unit: string;
  minThreshold: number;
  costPerUnit: number;
  lastRestocked: string;
}
