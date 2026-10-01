import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  Boxes,
  Database,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  ArrowUpRight,
  TrendingUp,
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import {
  fetchOrders,
  fetchInquiries,
  fetchInventory,
  updateOrderStatus,
  deleteOrder,
  updateInquiryStatus,
  updateInventoryStock,
  seedDatabaseIfEmpty,
} from '../services/databaseService';
import { OrderRecord, InquiryRecord, InventoryRecord } from '../types/database';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries' | 'inventory' | 'sql-console'>('orders');
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [inventory, setInventory] = useState<InventoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM orders WHERE status = "cooking" ORDER BY createdAt DESC;');
  const [sqlResult, setSqlResult] = useState<any[] | null>(null);
  const [sqlError, setSqlError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    await seedDatabaseIfEmpty();
    const [ord, inq, inv] = await Promise.all([
      fetchOrders(),
      fetchInquiries(),
      fetchInventory(),
    ]);
    setOrders(ord);
    setInquiries(inq);
    setInventory(inv);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Stats calculation
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.status !== 'cancelled' ? ord.totalPrice : 0), 0);
  const activeOrdersCount = orders.filter((ord) => ord.status === 'pending' || ord.status === 'cooking').length;
  const lowStockCount = inventory.filter((inv) => inv.stock <= inv.minThreshold).length;

  const handleStatusChange = async (orderId: string, newStatus: OrderRecord['status']) => {
    await updateOrderStatus(orderId, newStatus);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm('Hapus pesanan ini dari database?')) {
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    }
  };

  const handleInquiryStatus = async (id: string, newStatus: InquiryRecord['status']) => {
    await updateInquiryStatus(id, newStatus);
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleStockUpdate = async (id: string, currentStock: number, delta: number) => {
    const nextStock = Math.max(0, currentStock + delta);
    await updateInventoryStock(id, nextStock);
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: nextStock } : item))
    );
  };

  // SQL Query Simulator on live database data
  const handleExecuteSql = () => {
    setSqlError(null);
    setSqlResult(null);

    const q = sqlQuery.trim().toLowerCase();
    try {
      if (q.includes('from orders')) {
        let result = [...orders];
        if (q.includes('status = "cooking"') || q.includes("status = 'cooking'")) {
          result = result.filter((r) => r.status === 'cooking');
        } else if (q.includes('status = "pending"') || q.includes("status = 'pending'")) {
          result = result.filter((r) => r.status === 'pending');
        } else if (q.includes('status = "delivered"') || q.includes("status = 'delivered'")) {
          result = result.filter((r) => r.status === 'delivered');
        }
        setSqlResult(result);
      } else if (q.includes('from franchise_inquiries') || q.includes('from inquiries')) {
        setSqlResult(inquiries);
      } else if (q.includes('from inventory') || q.includes('from stock')) {
        let result = [...inventory];
        if (q.includes('stock <= minthreshold') || q.includes('stock < 100')) {
          result = result.filter((r) => r.stock <= r.minThreshold);
        }
        setSqlResult(result);
      } else {
        setSqlResult(orders.slice(0, 5));
      }
    } catch (err: any) {
      setSqlError(err.message || 'Syntax error in SQL query statement.');
    }
  };

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const filteredOrders = orders.filter((ord) => {
    const matchSearch =
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.menuName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.platform.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || ord.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-7xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl text-stone-200 overflow-hidden flex flex-col h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8102E] to-[#8B0000] flex items-center justify-center text-white shadow-lg">
              <Database className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">Admin Hub & Database Console</h2>
                <span className="bg-[#2E7D32] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                  Live Cloud Database
                </span>
              </div>
              <p className="text-xs text-stone-400">Seblak Preanger Official · Management Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sinkron Data</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-stone-800 hover:bg-[#C8102E] text-stone-300 hover:text-white rounded-xl transition-colors cursor-pointer"
              aria-label="Tutup Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick KPI Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-stone-920 border-b border-stone-800 shrink-0">
          <div className="bg-stone-850 p-4 rounded-2xl border border-stone-750">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <span>Total Omset Order</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-400">{formatRupiah(totalRevenue)}</div>
            <span className="text-[11px] text-stone-500">{orders.length} pesanan tercatat</span>
          </div>

          <div className="bg-stone-850 p-4 rounded-2xl border border-stone-750">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <span>Pesanan Diproses</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{activeOrdersCount}</div>
            <span className="text-[11px] text-amber-400/90 font-medium">Pending / Sedang Masak</span>
          </div>

          <div className="bg-stone-850 p-4 rounded-2xl border border-stone-750">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <span>Peminat Kemitraan</span>
              <Store className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{inquiries.length}</div>
            <span className="text-[11px] text-emerald-400/90 font-medium">Investor Franchise</span>
          </div>

          <div className="bg-stone-850 p-4 rounded-2xl border border-stone-750">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <span>Alert Stok Menipis</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-red-400">{lowStockCount} item</div>
            <span className="text-[11px] text-stone-500">Perlu restock dapur pusat</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 bg-stone-900 border-b border-stone-800 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#C8102E] text-white bg-stone-800/50 rounded-t-xl'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Manajemen Pesanan ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'border-[#C8102E] text-white bg-stone-800/50 rounded-t-xl'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Store className="w-4 h-4 text-emerald-400" />
            <span>Kemitraan & Franchise ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'border-[#C8102E] text-white bg-stone-800/50 rounded-t-xl'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Boxes className="w-4 h-4 text-amber-500" />
            <span>Stok Bahan & Dapur Pusat ({inventory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sql-console')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'sql-console'
                ? 'border-[#C8102E] text-white bg-stone-800/50 rounded-t-xl'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Database className="w-4 h-4 text-red-500" />
            <span>SQL Query Studio</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari pelanggan, menu, platform..."
                    className="w-full pl-10 pr-4 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-stone-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-stone-800 border border-stone-700 text-stone-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#C8102E]"
                  >
                    <option value="all">Semua Status</option>
                    <option value="pending">Pending</option>
                    <option value="cooking">Sedang Dimasak</option>
                    <option value="ready">Siap Diantar</option>
                    <option value="delivered">Selesai / Terkirim</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>
              </div>

              {/* Table of Orders */}
              <div className="bg-stone-850 rounded-2xl border border-stone-800 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead className="bg-stone-900 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
                      <tr>
                        <th className="py-3 px-4">Pelanggan</th>
                        <th className="py-3 px-4">Menu & Level Pedas</th>
                        <th className="py-3 px-4">Extra Topping</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Platform</th>
                        <th className="py-3 px-4">Status Pesanan</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-stone-800/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{ord.customerName}</div>
                            <div className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
                              <Phone className="w-3 h-3 text-stone-500" />
                              {ord.customerPhone || '0812-xxxx-xxxx'}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-stone-200">{ord.quantity}x {ord.menuName}</div>
                            <div className="text-[11px] text-amber-400 flex items-center gap-1">
                              <Flame className="w-3 h-3 text-red-500" />
                              Lvl {ord.spiceLevel} ({ord.spiceLevelName})
                            </div>
                            {ord.notes && (
                              <div className="text-[10px] text-stone-400 italic mt-0.5 max-w-xs">
                                "{ord.notes}"
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-stone-400 max-w-xs">
                            {ord.toppings ? ord.toppings : <span className="text-stone-600">-</span>}
                          </td>

                          <td className="py-3.5 px-4 font-black text-amber-400 text-sm">
                            {formatRupiah(ord.totalPrice)}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="bg-stone-800 px-2 py-0.5 rounded text-[11px] font-semibold text-stone-300">
                              {ord.platform}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={ord.status}
                              onChange={(e) => handleStatusChange(ord.id, e.target.value as any)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                ord.status === 'pending'
                                  ? 'bg-amber-900/30 text-amber-400 border-amber-800'
                                  : ord.status === 'cooking'
                                  ? 'bg-orange-900/30 text-orange-400 border-orange-800'
                                  : ord.status === 'ready'
                                  ? 'bg-blue-900/30 text-blue-400 border-blue-800'
                                  : ord.status === 'delivered'
                                  ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800'
                                  : 'bg-red-900/30 text-red-400 border-red-800'
                              }`}
                            >
                              <option value="pending">⏳ Pending</option>
                              <option value="cooking">🔥 Sedang Masak</option>
                              <option value="ready">📦 Siap Kirim</option>
                              <option value="delivered">✅ Terkirim</option>
                              <option value="cancelled">❌ Batal</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleDeleteOrder(ord.id)}
                              className="p-1.5 text-stone-500 hover:text-red-400 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Pesanan"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-stone-850 border border-stone-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white">{inq.name}</h4>
                        <div className="text-xs text-stone-400">{inq.city} · {inq.phone}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-400 border border-emerald-800">
                        {inq.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="p-3 bg-stone-900 rounded-xl space-y-1 text-xs">
                      <div className="text-amber-400 font-bold">{inq.packageChoice}</div>
                      <div className="text-stone-400">Budget: {inq.budgetRange}</div>
                      {inq.notes && <p className="text-[11px] text-stone-300 italic pt-1">"{inq.notes}"</p>}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Halo%20Bapak/Ibu%20${encodeURIComponent(inq.name)},%20kami%20dari%20Tim%20Kemitraan%20Seblak%20Preanger%20Official.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Hubungi via WA</span>
                      </a>

                      <select
                        value={inq.status}
                        onChange={(e) => handleInquiryStatus(inq.id, e.target.value as any)}
                        className="text-[11px] bg-stone-900 border border-stone-700 text-stone-300 rounded px-2 py-1"
                      >
                        <option value="new">Baru</option>
                        <option value="contacted">Sudah Dihubungi</option>
                        <option value="meeting_scheduled">Jadwal Meeting</option>
                        <option value="deal_closed">Deal Mitra</option>
                        <option value="rejected">Batal</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="bg-stone-850 rounded-2xl border border-stone-800 overflow-hidden shadow-lg">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-stone-900 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Nama Bahan / Topping</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Sisa Stok</th>
                      <th className="py-3 px-4">Batas Minimum</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Kelola Stok</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {inventory.map((inv) => {
                      const isLow = inv.stock <= inv.minThreshold;
                      return (
                        <tr key={inv.id} className="hover:bg-stone-800/40">
                          <td className="py-3 px-4 font-bold text-white">{inv.itemName}</td>
                          <td className="py-3 px-4 text-stone-400">{inv.category}</td>
                          <td className="py-3 px-4 font-black text-sm text-white">
                            {inv.stock} <span className="text-xs text-stone-400 font-normal">{inv.unit}</span>
                          </td>
                          <td className="py-3 px-4 text-stone-400">{inv.minThreshold} {inv.unit}</td>
                          <td className="py-3 px-4">
                            {isLow ? (
                              <span className="text-[10px] font-bold text-red-400 bg-red-950/60 border border-red-800 px-2 py-0.5 rounded-full flex items-center gap-1 w-max">
                                <AlertTriangle className="w-3 h-3" />
                                Stok Tipis!
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 w-max">
                                <CheckCircle2 className="w-3 h-3" />
                                Aman
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={() => handleStockUpdate(inv.id, inv.stock, -10)}
                                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded font-bold"
                              >
                                -10
                              </button>
                              <button
                                onClick={() => handleStockUpdate(inv.id, inv.stock, 50)}
                                className="px-2 py-1 bg-[#C8102E] hover:bg-red-700 text-white rounded font-bold"
                              >
                                +50 Restock
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SQL CONSOLE */}
          {activeTab === 'sql-console' && (
            <div className="space-y-4">
              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="font-mono text-amber-400 font-bold">SQL Console & Query Editor</span>
                  <span>Tabel tersedia: <code className="text-white">orders</code>, <code className="text-white">inventory</code>, <code className="text-white">franchise_inquiries</code></span>
                </div>

                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  rows={3}
                  className="w-full bg-stone-900 font-mono text-xs sm:text-sm text-emerald-300 p-3 rounded-xl border border-stone-750 focus:outline-none focus:border-red-500"
                />

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSqlQuery('SELECT * FROM orders WHERE status = "cooking";')}
                      className="text-[11px] bg-stone-800 hover:bg-stone-700 text-stone-300 px-2 py-1 rounded"
                    >
                      Filter Cooking Orders
                    </button>
                    <button
                      type="button"
                      onClick={() => setSqlQuery('SELECT * FROM inventory WHERE stock <= minThreshold;')}
                      className="text-[11px] bg-stone-800 hover:bg-stone-700 text-stone-300 px-2 py-1 rounded"
                    >
                      Cek Stok Menipis
                    </button>
                  </div>

                  <button
                    onClick={handleExecuteSql}
                    className="inline-flex items-center gap-1.5 bg-[#C8102E] hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    <span>Jalankan Query (Execute SQL)</span>
                  </button>
                </div>
              </div>

              {sqlError && (
                <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 rounded-xl text-xs font-mono">
                  {sqlError}
                </div>
              )}

              {sqlResult && (
                <div className="bg-stone-850 p-4 rounded-2xl border border-stone-800 space-y-2">
                  <div className="text-xs text-stone-400 font-mono">
                    Query Berhasil. Menampilkan {sqlResult.length} baris data:
                  </div>
                  <pre className="bg-stone-950 p-4 rounded-xl text-emerald-400 font-mono text-xs max-h-72 overflow-y-auto">
                    {JSON.stringify(sqlResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
