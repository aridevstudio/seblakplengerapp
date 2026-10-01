import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { OrderRecord, InquiryRecord, InventoryRecord } from '../types/database';

export const INITIAL_ORDERS: Omit<OrderRecord, 'id'>[] = [
  {
    customerName: 'Siti Sarah',
    customerPhone: '0812-3344-5566',
    menuId: 'seblak-beureum-komplit',
    menuName: 'Seblak Beureum Komplit',
    spiceLevel: 3,
    spiceLevelName: 'Nampol Pisan',
    quantity: 2,
    toppings: 'Cuanki Lidah Crispy (2 pcs), Extra Telur Orak-Arik',
    notes: 'Kuah agak banyakin dikit min, daun jeruk banyakin',
    totalPrice: 49000,
    platform: 'WhatsApp',
    status: 'cooking',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    customerName: 'Budi Santoso',
    customerPhone: '0857-1122-3344',
    menuId: 'baso-aci-karesep',
    menuName: 'Baso Aci Karesep',
    spiceLevel: 2,
    spiceLevelName: 'Sedang Nagih',
    quantity: 1,
    toppings: 'Sukro Cikur Renyah',
    notes: 'Jeruk limau jangan lupa',
    totalPrice: 24250,
    platform: 'GoFood',
    status: 'ready',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    customerName: 'Aulia Rahma',
    customerPhone: '0813-8899-7700',
    menuId: 'seblak-instan-pouch',
    menuName: 'Seblak Instan Pouch (Ready to Cook)',
    spiceLevel: 4,
    spiceLevelName: 'Geledek Pasundan',
    quantity: 5,
    toppings: 'Kemasan Vacuum Pack Ekstra',
    notes: 'Kirim ke Tebet Jakarta Selatan via J&T Express',
    totalPrice: 110000,
    platform: 'ShopeeFood',
    status: 'delivered',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    customerName: 'Reza Pratama',
    customerPhone: '0819-0011-2233',
    menuId: 'mie-gondang-monah',
    menuName: 'Mie Gondang Monah',
    spiceLevel: 5,
    spiceLevelName: 'Mercon Preanger',
    quantity: 2,
    toppings: 'Sosis Sapi Premium, Dumpling Keju',
    notes: 'Level 5 sepedas mungkin!',
    totalPrice: 51000,
    platform: 'GrabFood',
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

export const INITIAL_INQUIRIES: Omit<InquiryRecord, 'id'>[] = [
  {
    name: 'Hendra Gunawan',
    phone: '0812-9988-7766',
    city: 'Yogyakarta',
    packageChoice: 'Paket Gerobak / Booth Express (Rp 29 Juta)',
    budgetRange: 'Rp 30 - 40 Juta',
    notes: 'Punya ruko dekat kampus UGM, ingin segera buka bulan depan.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    name: 'Dewi Kartika',
    phone: '0878-5544-3322',
    city: 'Semarang',
    packageChoice: 'Paket Outlet Ruko / Mini Cafe (Rp 65 Juta)',
    budgetRange: 'Rp 65 - 80 Juta',
    notes: 'Tertarik buka cabang di area Simpang Lima.',
    status: 'meeting_scheduled',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    name: 'Fajar Nugraha',
    phone: '0813-4455-6677',
    city: 'Malang',
    packageChoice: 'Paket Cloud Kitchen (Rp 38 Juta)',
    budgetRange: 'Rp 40 Juta',
    notes: 'Fokus penjualan online GoFood / GrabFood.',
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

export const INITIAL_INVENTORY: Omit<InventoryRecord, 'id'>[] = [
  {
    itemName: 'Pasta Bumbu Rempah Merah Asli',
    category: 'Bumbu Rempah',
    stock: 145,
    unit: 'Kg',
    minThreshold: 30,
    costPerUnit: 45000,
    lastRestocked: '2026-09-28',
  },
  {
    itemName: 'Daun Jeruk Purut Segar Pasundan',
    category: 'Bumbu Rempah',
    stock: 28,
    unit: 'Kg',
    minThreshold: 10,
    costPerUnit: 35000,
    lastRestocked: '2026-09-29',
  },
  {
    itemName: 'Cuanki Lidah Crispy Jumbo',
    category: 'Topping',
    stock: 850,
    unit: 'Pcs',
    minThreshold: 200,
    costPerUnit: 1200,
    lastRestocked: '2026-09-27',
  },
  {
    itemName: 'Batagor Kering Mini Krispi',
    category: 'Topping',
    stock: 1200,
    unit: 'Pcs',
    minThreshold: 300,
    costPerUnit: 800,
    lastRestocked: '2026-09-27',
  },
  {
    itemName: 'Baso Aci Frozen Vacuum Isi Ayam',
    category: 'Bahan Baku',
    stock: 420,
    unit: 'Porsi',
    minThreshold: 100,
    costPerUnit: 7500,
    lastRestocked: '2026-09-29',
  },
  {
    itemName: 'Standing Pouch Seblak Preanger Official',
    category: 'Kemasan',
    stock: 65,
    unit: 'Pcs',
    minThreshold: 100,
    costPerUnit: 2500,
    lastRestocked: '2026-09-25',
  },
];

// Seed initial database collections if empty
export async function seedDatabaseIfEmpty() {
  try {
    const ordersSnap = await getDocs(collection(db, 'orders'));
    if (ordersSnap.empty) {
      for (const ord of INITIAL_ORDERS) {
        await addDoc(collection(db, 'orders'), ord);
      }
    }

    const inquiriesSnap = await getDocs(collection(db, 'franchise_inquiries'));
    if (inquiriesSnap.empty) {
      for (const inq of INITIAL_INQUIRIES) {
        await addDoc(collection(db, 'franchise_inquiries'), inq);
      }
    }

    const inventorySnap = await getDocs(collection(db, 'inventory'));
    if (inventorySnap.empty) {
      for (const inv of INITIAL_INVENTORY) {
        await addDoc(collection(db, 'inventory'), inv);
      }
    }
  } catch (err) {
    console.warn('Seeding initial data error:', err);
  }
}

// Fetch all orders
export async function fetchOrders(): Promise<OrderRecord[]> {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as OrderRecord[];
  } catch (e) {
    console.error('fetchOrders error:', e);
    return INITIAL_ORDERS.map((ord, idx) => ({ id: `local-ord-${idx}`, ...ord }));
  }
}

// Add new customer order
export async function createOrder(order: Omit<OrderRecord, 'id'>): Promise<string> {
  try {
    const ref = await addDoc(collection(db, 'orders'), order);
    return ref.id;
  } catch (e) {
    console.error('createOrder error:', e);
    return 'local-' + Date.now();
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: OrderRecord['status']): Promise<void> {
  try {
    const orderDoc = doc(db, 'orders', orderId);
    await updateDoc(orderDoc, { status });
  } catch (e) {
    console.error('updateOrderStatus error:', e);
  }
}

// Delete order
export async function deleteOrder(orderId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'orders', orderId));
  } catch (e) {
    console.error('deleteOrder error:', e);
  }
}

// Fetch inquiries
export async function fetchInquiries(): Promise<InquiryRecord[]> {
  try {
    const q = query(collection(db, 'franchise_inquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as InquiryRecord[];
  } catch (e) {
    console.error('fetchInquiries error:', e);
    return INITIAL_INQUIRIES.map((inq, idx) => ({ id: `local-inq-${idx}`, ...inq }));
  }
}

// Submit franchise inquiry
export async function createInquiry(inquiry: Omit<InquiryRecord, 'id'>): Promise<string> {
  try {
    const ref = await addDoc(collection(db, 'franchise_inquiries'), inquiry);
    return ref.id;
  } catch (e) {
    console.error('createInquiry error:', e);
    return 'local-' + Date.now();
  }
}

// Update inquiry status
export async function updateInquiryStatus(inquiryId: string, status: InquiryRecord['status']): Promise<void> {
  try {
    await updateDoc(doc(db, 'franchise_inquiries', inquiryId), { status });
  } catch (e) {
    console.error('updateInquiryStatus error:', e);
  }
}

// Fetch inventory
export async function fetchInventory(): Promise<InventoryRecord[]> {
  try {
    const snapshot = await getDocs(collection(db, 'inventory'));
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as InventoryRecord[];
  } catch (e) {
    console.error('fetchInventory error:', e);
    return INITIAL_INVENTORY.map((inv, idx) => ({ id: `local-inv-${idx}`, ...inv }));
  }
}

// Update stock
export async function updateInventoryStock(itemId: string, newStock: number): Promise<void> {
  try {
    await updateDoc(doc(db, 'inventory', itemId), {
      stock: newStock,
      lastRestocked: new Date().toISOString().split('T')[0],
    });
  } catch (e) {
    console.error('updateInventoryStock error:', e);
  }
}
