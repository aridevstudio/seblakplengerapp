export interface MenuItem {
  id: string;
  name: string;
  category: 'seblak-mie' | 'baso-aci' | 'pack-instan';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  spiceLevels: number[];
  recommendedLevel: number;
  tags: string[];
  image: string;
  isPopular?: boolean;
  isBestSeller?: boolean;
  toppingsIncluded: string[];
}

export interface BranchLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  gmapsUrl: string;
  phone: string;
  isNew?: boolean;
}

export interface FranchisePackage {
  id: string;
  name: string;
  price: string;
  roi: string;
  features: string[];
  bestFor: string;
  badge?: string;
}

export const SPICE_LEVELS = [
  { level: 1, name: 'Santuy Priangan', desc: 'Pedas manis ramah pemula, aroma kencur lembut', color: '#16A34A', flames: 1 },
  { level: 2, name: 'Sedang Nagih', desc: 'Rasa pedas seimbang, gurih rempah terasa mantap', color: '#CA8A04', flames: 2 },
  { level: 3, name: 'Nampol Pisan', desc: 'Favorit Seblak Lovers! Pedas membakar lidah tapi bikin ketagihan', color: '#EA580C', flames: 3 },
  { level: 4, name: 'Geledek Pasundan', desc: 'Cabai rawit domba berlimpah, keringat mulai bercucuran', color: '#DC2626', flames: 4 },
  { level: 5, name: 'Mercon Preanger', desc: 'Level dewa pedas ekstrem! Hanya untuk pendekar cabai sejati', color: '#991B1B', flames: 5 },
];

export const EXTRA_TOPPINGS = [
  { id: 'cuanki-lidah', name: 'Cuanki Lidah Crispy (2 pcs)', price: 3500 },
  { id: 'batagor-kering', name: 'Batagor Kering Gurih (3 pcs)', price: 3500 },
  { id: 'sukro-cikur', name: 'Sukro Cikur Renyah', price: 2500 },
  { id: 'telur-orak-arik', name: 'Extra Telur Orak-Arik', price: 4000 },
  { id: 'sosis-sapi', name: 'Sosis Sapi Premium', price: 4000 },
  { id: 'dumpling-keju', name: 'Dumpling Keju Leleh', price: 5000 },
  { id: 'daun-jeruk-extra', name: 'Double Daun Jeruk Fresh', price: 1500 },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'seblak-beureum-komplit',
    name: 'Seblak Beureum Komplit',
    category: 'seblak-mie',
    categoryLabel: 'Seblak & Mie',
    price: 21000,
    originalPrice: 25000,
    description: 'Seblak kuah merah kental khas Priangan dengan bumbu rempah otentik, kerupuk kenyal, telur, cuanki lidah, dan wangi daun jeruk segar.',
    spiceLevels: [1, 2, 3, 4, 5],
    recommendedLevel: 3,
    tags: ['Best Seller', 'Otentik', 'Kuah Kental'],
    image: '/src/assets/images/seblak_beureum_1790701965524.jpg',
    isBestSeller: true,
    toppingsIncluded: ['Kerupuk Bawang', 'Cuanki Lidah', 'Batagor Kering', 'Telur Orak-arik', 'Makaroni', 'Daun Jeruk Purut'],
  },
  {
    id: 'baso-aci-karesep',
    name: 'Baso Aci Karesep',
    category: 'baso-aci',
    categoryLabel: 'Baso Aci',
    price: 21750,
    originalPrice: 26000,
    description: 'Baso aci kenyal isi ayam cincang gurih dipadu kuah kaldu rempah merah, cuanki lidah panjang, sukro cikur, dan perasan jeruk limau segar.',
    spiceLevels: [1, 2, 3, 4, 5],
    recommendedLevel: 3,
    tags: ['Favorit Wargi', 'Kenyal Gurih'],
    image: '/src/assets/images/baso_aci_karesep_1790701982333.jpg',
    isPopular: true,
    toppingsIncluded: ['6 Baso Aci Ayam', '2 Cuanki Lidah', 'Batagor Mini', 'Sukro Cikur', 'Bumbu Minyak Bawang', 'Jeruk Limau'],
  },
  {
    id: 'mie-gondang-monah',
    name: 'Mie Gondang Monah',
    category: 'seblak-mie',
    categoryLabel: 'Seblak & Mie',
    price: 21000,
    description: 'Mie pipih kenyal yang disiram chili oil rempah merah khas Preanger, taburan ayam cincang, pangsit renyah, dan aroma daun jeruk yang pekat.',
    spiceLevels: [1, 2, 3, 4, 5],
    recommendedLevel: 2,
    tags: ['Signature Mie', 'Chili Oil'],
    image: '/src/assets/images/mie_gondang_1790701995810.jpg',
    isPopular: true,
    toppingsIncluded: ['Mie Pipih Kenyal', 'Ayam Tabur Gurih', 'Keripik Pangsit Emas', 'Kuah Rempah Merah', 'Daun Jeruk Fresh'],
  },
  {
    id: 'seblak-instan-pouch',
    name: 'Seblak Instan Pouch (Ready to Cook)',
    category: 'pack-instan',
    categoryLabel: 'Pack Instan',
    price: 22000,
    originalPrice: 27000,
    description: 'Kemasan pouch higienis siap seduh! Dilengkapi bumbu pasta rempah merah asli, cabai bubuk Priangan, daun jeruk kering, kerupuk, dan topping lengkap.',
    spiceLevels: [1, 2, 3, 4, 5],
    recommendedLevel: 3,
    tags: ['Bisa Kirim Se-Indonesia', 'Praktis 5 Menit'],
    image: '/src/assets/images/pouch_instan_1790702012519.jpg',
    isBestSeller: true,
    toppingsIncluded: ['Pasta Bumbu Rempah', 'Cabai Bubuk Racikan', 'Minyak Daun Jeruk', 'Kerupuk Pelangi & Bawang', 'Cuanki & Batagor Kering'],
  },
  {
    id: 'baso-aci-instan-pouch',
    name: 'Baso Aci Instan Pouch Signature',
    category: 'pack-instan',
    categoryLabel: 'Pack Instan',
    price: 23500,
    description: 'Paket baso aci instan kemasan vacuum pack dengan daya tahan lama. Bumbu kaldu gurih beraroma cikur dan jeruk limau, tinggal rebus 5 menit.',
    spiceLevels: [1, 2, 3, 4, 5],
    recommendedLevel: 3,
    tags: ['Vacuum Sealed', 'Kirim Luar Kota'],
    image: '/src/assets/images/baso_aci_karesep_1790701982333.jpg',
    toppingsIncluded: ['8 Baso Aci Vacuum', 'Cuanki Lidah 2 pcs', 'Batagor Kering', 'Sukro Cikur', 'Bumbu Kaldu Khas', 'Minyak Jeruk'],
  },
  {
    id: 'seblak-ceker-mercon',
    name: 'Seblak Ceker Mercon Juara',
    category: 'seblak-mie',
    categoryLabel: 'Seblak & Mie',
    price: 24500,
    description: 'Ceker ayam super empuk dipresto hingga lunak sempurna, dimasak dalam rendaman bumbu merah rempah pedas daun jeruk kental yang meresap.',
    spiceLevels: [2, 3, 4, 5],
    recommendedLevel: 4,
    tags: ['Empuk Gurih', 'Ekstra Pedas'],
    image: '/src/assets/images/seblak_beureum_1790701965524.jpg',
    toppingsIncluded: ['3 Ceker Presto Empuk', 'Kerupuk Bawang', 'Makaroni', 'Cuanki Tahu', 'Irisan Daun Bawang & Jeruk'],
  },
];

export const BRANCH_LOCATIONS: BranchLocation[] = [
  {
    id: 'bdo-dipatiukur',
    name: 'Seblak Preanger - Dipatiukur Pusat',
    city: 'Bandung',
    address: 'Jl. Dipatiukur No. 84, Coblong, Kota Bandung, Jawa Barat 40132',
    hours: 'Setiap Hari: 10.00 - 22.00 WIB',
    gmapsUrl: 'https://maps.google.com/?q=Seblak+Preanger+Dipatiukur+Bandung',
    phone: '+62 812-2244-5588',
  },
  {
    id: 'bdo-buahbatu',
    name: 'Seblak Preanger - Buah Batu',
    city: 'Bandung',
    address: 'Jl. Buah Batu No. 162, Turangga, Lengkong, Kota Bandung',
    hours: 'Setiap Hari: 10.30 - 22.00 WIB',
    gmapsUrl: 'https://maps.google.com/?q=Seblak+Preanger+Buah+Batu',
    phone: '+62 812-3355-7799',
  },
  {
    id: 'jkt-tebet',
    name: 'Seblak Preanger - Tebet Raya',
    city: 'Jakarta Selatan',
    address: 'Jl. Tebet Raya No. 45B, Tebet Timur, Jakarta Selatan 12820',
    hours: 'Setiap Hari: 11.00 - 23.00 WIB',
    gmapsUrl: 'https://maps.google.com/?q=Seblak+Preanger+Tebet+Jakarta',
    phone: '+62 813-8877-6655',
    isNew: true,
  },
  {
    id: 'bks-galaxy',
    name: 'Seblak Preanger - Grand Galaxy City',
    city: 'Bekasi',
    address: 'Ruko Grand Galaxy City Blok RGM No. 12, Jaka Setia, Bekasi Selatan',
    hours: 'Setiap Hari: 10.00 - 22.00 WIB',
    gmapsUrl: 'https://maps.google.com/?q=Seblak+Preanger+Grand+Galaxy+Bekasi',
    phone: '+62 813-9988-1122',
  },
  {
    id: 'tgr-bsd',
    name: 'Seblak Preanger - Pasar Modern BSD',
    city: 'Tangerang Selatan',
    address: 'Ruko Pasar Modern BSD Blok R No. 28, Serpong, Tangsel',
    hours: 'Setiap Hari: 10.00 - 21.30 WIB',
    gmapsUrl: 'https://maps.google.com/?q=Seblak+Preanger+BSD+Tangerang',
    phone: '+62 812-4466-9900',
    isNew: true,
  },
  {
    id: 'sby-gwalk',
    name: 'Seblak Preanger - G-Walk CitraLand',
    city: 'Surabaya',
    address: 'G-Walk CitraLand Ruko Taman Gapura Blok K No. 7, Surabaya Barat',
    hours: 'Setiap Hari: 11.00 - 22.30 WIB',
    gmapsUrl: 'https://maps.google.com/?q=Seblak+Preanger+G-Walk+Surabaya',
    phone: '+62 813-2211-4433',
  },
];

export const FRANCHISE_PACKAGES: FranchisePackage[] = [
  {
    id: 'booth-hemat',
    name: 'Paket Gerobak / Booth Express',
    price: 'Rp 29.000.000',
    roi: '3 - 4 Bulan',
    bestFor: 'Lokasi strategis dekat kampus, sekolah, food court & teras minimarket',
    badge: 'Paling Diminati',
    features: [
      'Booth Stainless Steel Modern Portable',
      'Peralatan Masak Kompor High-Pressure & Wajan Seblak',
      'Starter Pack Bahan Baku & Bumbu Rempah 200 Porsi',
      'Seragam & Kemasan Branding Lengkap',
      'Akses SOP & Pelatihan Karyawan',
      'Free Listing GoFood, GrabFood & ShopeeFood',
    ],
  },
  {
    id: 'ruko-cafe',
    name: 'Paket Outlet Ruko / Mini Cafe',
    price: 'Rp 65.000.000',
    roi: '4 - 6 Bulan',
    bestFor: 'Konsep Dine-in nyaman untuk nongkrong anak muda & keluarga',
    features: [
      'Desain Interior & Signage Neon Sign Seblak Preanger',
      'Peralatan Dapur Komplit (Chiller, Deep Fryer, POS Kasir)',
      'Paket Awal 500 Porsi Bahan Baku Fresh',
      'Integrasi Tablet Kasir Cloud POS + Printer Struk',
      'Training Manajemen Outlet & Barista Es Teh Manis',
      'Support Promosi Grand Opening & Influencer Lokal',
    ],
  },
  {
    id: 'cloud-kitchen',
    name: 'Paket Cloud Kitchen Online Only',
    price: 'Rp 38.000.000',
    roi: '3 - 5 Bulan',
    bestFor: 'Fokus 100% orderan online (GoFood, GrabFood, ShopeeFood) low overhead',
    features: [
      'Setup Dapur Standar Higienis Pengiriman Cepat',
      'Kitchen Equipment Khusus Fast Dispatch',
      'Starter Pack 350 Porsi + Kemasan Anti Tumpah',
      'Setup & Optimasi Akun Merchant Grab/Go/Shopee',
      'Pelatihan Packing Rapi & Tahan Panas',
      'Supply Chain Bumbu Rutin dari Dapur Pusat',
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: 'Rania Putri',
    role: 'Food Vlogger Bandung',
    handle: '@raniamakan',
    comment: 'Beneran kuah rempah merahnya beda banget sama seblak biasa! Daun jeruknya semerbak fresh, kuahnya kental gurih ga cuma pedas doang. Level 3 bener-bener nagih parah!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    favoriteDish: 'Seblak Beureum Komplit (Lvl 3)',
  },
  {
    name: 'Dimas Satria',
    role: 'Mahasiswa & Spicy Hunter',
    handle: '@dimaspedas',
    comment: 'Mie Gondang Monah dan Baso Aci Karesep juara! Cuanki lidahnya renyah gede, acinya kenyal pas ga alot. Udah langganan tiap minggu bareng temen kosan.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    favoriteDish: 'Baso Aci Karesep & Mie Gondang',
  },
  {
    name: 'Anindya Kirana',
    role: 'Pecinta Pedas Jakarta',
    handle: '@anindyak',
    comment: 'Pesen pouch instannya buat kirim ke Jakarta, packing aman dan bumbu merahnya otentik kaya makan langsung di Bandung. Kuahnya berasa kencur sama jeruk purutnya!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    favoriteDish: 'Seblak Instan Pouch',
  },
];
