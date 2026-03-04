import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Gamepad2, Wallet, ListOrdered, Home, Search, Bell, User,
  ChevronRight, AlertCircle, MessageSquare, CheckCircle2, Clock, Ticket,
  Smartphone, Sparkles, Bot, Loader2, ArrowUpRight, ArrowDownLeft,
  PlusCircle, ArrowDownToLine, History, Building
} from 'lucide-react';

// --- MOCK DATA ---
const GAMES = [
  { id: 1, name: 'Mobile Legends', type: 'Mobile', currency: 'Diamond', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 2, name: 'Genshin Impact', type: 'PC/Mobile', currency: 'Genesis Crystal', image: 'https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 3, name: 'World of Warcraft', type: 'PC', currency: 'Gold', image: 'https://images.unsplash.com/photo-1580234811497-9df715cb10f7?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 4, name: 'FFXIV', type: 'PC/Console', currency: 'Gil', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 5, name: 'Valorant', type: 'PC', currency: 'Valorant Points', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 6, name: 'PUBG Mobile', type: 'Mobile', currency: 'UC', image: 'https://images.unsplash.com/photo-1598555353597-9878206d8717?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 7, name: 'Free Fire', type: 'Mobile', currency: 'Diamond', image: 'https://images.unsplash.com/photo-1627988319523-2895b64dc467?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 8, name: 'Ragnarok Origin', type: 'Mobile/PC', currency: 'Nyan Berry', image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&q=80&w=200&h=200' },
];

const VOUCHERS = [
  { id: 1, name: 'Steam Wallet', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 2, name: 'Roblox (Robux)', image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 3, name: 'Google Play', image: 'https://images.unsplash.com/photo-1607252654015-f85df1a4f6eb?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 4, name: 'PlayStation Network', image: 'https://images.unsplash.com/photo-1606144042873-77d13b2e533c?auto=format&fit=crop&q=80&w=200&h=200' },
];

const OFFERS = [
  { id: 101, gameId: 1, seller: 'ProPlayer99', rating: 4.9, amount: 1000, price: 250000, server: 'Global', delivery: '10 Menit' },
  { id: 102, gameId: 1, seller: 'DiamondStore', rating: 4.7, amount: 500, price: 130000, server: 'Indonesia', delivery: '5 Menit' },
  { id: 103, gameId: 3, seller: 'AzerothBank', rating: 5.0, amount: 100000, price: 750000, server: 'Illidan (US)', delivery: '1 Jam' },
  { id: 104, gameId: 4, seller: 'EorzeaMerchant', rating: 4.8, amount: 5000000, price: 400000, server: 'Tonberry (JP)', delivery: '30 Menit' },
  { id: 105, gameId: 1, seller: 'FastTopup', rating: 4.6, amount: 2000, price: 490000, server: 'Indonesia', delivery: '15 Menit' },
  { id: 106, gameId: 2, seller: 'TeyvatTrader', rating: 4.9, amount: 3280, price: 450000, server: 'Asia', delivery: '5 Menit' },
  { id: 107, gameId: 2, seller: 'ArchonStore', rating: 4.8, amount: 8080, price: 1100000, server: 'America', delivery: '10 Menit' },
  { id: 108, gameId: 5, seller: 'RadiantShop', rating: 5.0, amount: 2400, price: 250000, server: 'APAC', delivery: '5 Menit' },
  { id: 109, gameId: 5, seller: 'JettDash', rating: 4.7, amount: 4000, price: 400000, server: 'APAC', delivery: '10 Menit' },
  { id: 110, gameId: 6, seller: 'ChickenDinner', rating: 4.5, amount: 600, price: 100000, server: 'Global', delivery: '30 Menit' },
  { id: 111, gameId: 6, seller: 'ErangelMerch', rating: 4.8, amount: 1500, price: 240000, server: 'Global', delivery: '15 Menit' },
  { id: 112, gameId: 7, seller: 'BooyahStore', rating: 4.9, amount: 720, price: 100000, server: 'Indonesia', delivery: '5 Menit' },
  { id: 113, gameId: 8, seller: 'PronteraMarket', rating: 4.6, amount: 1000, price: 150000, server: 'SEA', delivery: '1 Jam' },
];

const VOUCHER_OFFERS = [
  { id: 201, voucherId: 1, name: 'IDR 45.000 Steam Wallet Code', price: 47000, seller: 'AutoKode', type: 'Voucher' },
  { id: 202, voucherId: 1, name: 'IDR 90.000 Steam Wallet Code', price: 92000, seller: 'AutoKode', type: 'Voucher' },
  { id: 203, voucherId: 2, name: '800 Robux Global Kode', price: 155000, seller: 'VoucherSuper', type: 'Voucher' },
  { id: 204, voucherId: 3, name: 'IDR 50.000 Google Play ID', price: 52000, seller: 'AutoKode', type: 'Voucher' },
];

const PAYMENT_METHODS = [
  { id: 'wallet', name: 'Saldo RMT Hub', icon: 'Wallet', fee: 0 },
  { id: 'gopay', name: 'GoPay', icon: 'Smartphone', fee: 1000 },
  { id: 'ovo', name: 'OVO', icon: 'Smartphone', fee: 1000 },
  { id: 'dana', name: 'DANA', icon: 'Smartphone', fee: 1000 },
  { id: 'shopeepay', name: 'ShopeePay', icon: 'Smartphone', fee: 0 },
];

const TOPUP_METHODS = [
  { id: 'bca', name: 'BCA Virtual Account', type: 'Bank' },
  { id: 'mandiri', name: 'Mandiri Virtual Account', type: 'Bank' },
  { id: 'bri', name: 'BRI Virtual Account', type: 'Bank' },
  { id: 'bni', name: 'BNI Virtual Account', type: 'Bank' },
  { id: 'other_bank', name: 'Transfer Bank Lainnya', type: 'Bank' },
  { id: 'gopay', name: 'GoPay', type: 'E-Money' },
  { id: 'ovo', name: 'OVO', type: 'E-Money' },
  { id: 'dana', name: 'DANA', type: 'E-Money' },
  { id: 'shopeepay', name: 'ShopeePay', type: 'E-Money' },
];

const WITHDRAW_METHODS = [
  { id: 'gopay', name: 'GoPay', type: 'E-Money' },
  { id: 'ovo', name: 'OVO', type: 'E-Money' },
  { id: 'dana', name: 'DANA', type: 'E-Money' },
  { id: 'shopeepay', name: 'ShopeePay', type: 'E-Money' },
];

// --- GEMINI API HELPER ---
const fetchGemini = async (prompt, systemInstruction, isJson = false) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  if (isJson) {
    payload.generationConfig = { responseMimeType: "application/json" };
  }

  let retries = 5;
  let delay = 1000;
  
  while (retries > 0) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Gagal menganalisis.';
    } catch (err) {
      retries--;
      if (retries === 0) return 'Terjadi kesalahan saat menghubungi AI. Silakan coba lagi nanti.';
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [walletBalance, setWalletBalance] = useState(1500000);
  const [orders, setOrders] = useState([
    { id: 'ORD-9921', item: '1000 Diamond - Mobile Legends', price: 250000, status: 'completed', date: '2 Mar 2026' }
  ]);
  const [mutations, setMutations] = useState([
    { id: 'TRX-1004', type: 'credit', title: 'Top Up Saldo via BCA', amount: 500000, date: '1 Mar 2026, 14:30', status: 'success' },
    { id: 'TRX-1003', type: 'credit', title: 'Pencairan Escrow (ORD-8812)', amount: 200000, date: '28 Feb 2026, 09:15', status: 'success' },
    { id: 'TRX-1002', type: 'debit', title: 'Pembelian Item (ORD-9921)', amount: 250000, date: '28 Feb 2026, 08:00', status: 'success' },
    { id: 'TRX-1001', type: 'credit', title: 'Top Up Saldo via GoPay', amount: 1050000, date: '25 Feb 2026, 19:20', status: 'success' },
  ]);
  
  // Modals State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('wallet');

  // New Modals State
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpMethod, setTopUpMethod] = useState('bca');

  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('gopay');

  // AI States
  const [aiAnalyses, setAiAnalyses] = useState({});
  const [analyzingId, setAnalyzingId] = useState(null);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  const handleBuyClick = (offer) => {
    setSelectedOffer(offer);
    setPaymentMethod('wallet'); // Reset ke default
    setIsCheckoutOpen(true);
  };

  const handleAnalyzeOffer = async (offer, gameOrVoucher, isVoucher = false) => {
    setAnalyzingId(offer.id);
    
    let prompt = '';
    if (isVoucher) {
      prompt = `Analisis voucher: ${offer.name}. Harga: Rp${offer.price}. Penjual: ${offer.seller}.`;
    } else {
      prompt = `Analisis penawaran: Item ${offer.amount} ${gameOrVoucher.currency} (${gameOrVoucher.name}). Harga Rp${offer.price}. Penjual: ${offer.seller} (Rating ${offer.rating}). Waktu proses: ${offer.delivery}. Server: ${offer.server}.`;
    }

    const sysInfo = "Kamu adalah AI Risk Analyst untuk marketplace Real Money Trading (RMT). Berikan 2-3 kalimat analisis singkat tentang penawaran ini. Apakah harganya tergolong wajar? Apakah penjual terpercaya? Apa risiko escrownya? JANGAN gunakan markdown tebal/miring (** atau *). Gunakan bahasa Indonesia yang asisten-like dan santai. Akhiri dengan rekomendasi singkat.";
    
    const result = await fetchGemini(prompt, sysInfo);
    setAiAnalyses(prev => ({ ...prev, [offer.id]: result }));
    setAnalyzingId(null);
  };

  const processCheckout = () => {
    const method = PAYMENT_METHODS.find(m => m.id === paymentMethod);
    const totalPay = selectedOffer.price + method.fee;
    const newOrderId = `ORD-${Math.floor(Math.random() * 10000)}`;

    if (paymentMethod === 'wallet') {
      if (walletBalance < totalPay) {
        alert('Saldo tidak mencukupi!');
        return;
      }
      setWalletBalance(prev => prev - totalPay);
      
      const newMutation = {
        id: `TRX-${Math.floor(Math.random() * 100000)}`,
        type: 'debit',
        title: `Pembayaran Pesanan (${newOrderId})`,
        amount: totalPay,
        date: 'Baru saja',
        status: 'success'
      };
      setMutations([newMutation, ...mutations]);
    } else {
      alert(`Simulasi: Mengarahkan ke aplikasi ${method.name} untuk membayar ${formatRupiah(totalPay)}...\n\nPembayaran Berhasil!`);
    }
    
    let itemName = '';
    let status = 'escrow';

    if (selectedOffer.type === 'Voucher') {
      itemName = selectedOffer.name;
      status = 'completed';
    } else {
      const game = GAMES.find(g => g.id === selectedOffer.gameId);
      itemName = `${selectedOffer.amount} ${game.currency} - ${game.name}`;
    }

    const newOrder = {
      id: newOrderId,
      item: itemName,
      price: totalPay,
      status: status,
      seller: selectedOffer.seller,
      date: 'Hari ini'
    };
    
    setOrders([newOrder, ...orders]);
    setIsCheckoutOpen(false);
    setActiveTab('orders');
  };

  const processTopUp = () => {
    const amount = parseInt(topUpAmount);
    if (!amount || amount < 10000) {
      alert('Minimal Top Up adalah Rp10.000');
      return;
    }

    const method = TOPUP_METHODS.find(m => m.id === topUpMethod);
    setWalletBalance(prev => prev + amount);

    const newMutation = {
      id: `TRX-${Math.floor(Math.random() * 100000)}`,
      type: 'credit',
      title: `Top Up Saldo via ${method.name}`,
      amount: amount,
      date: 'Baru saja',
      status: 'success'
    };
    
    setMutations([newMutation, ...mutations]);
    setIsTopUpOpen(false);
    setTopUpAmount('');
    alert(`Berhasil Top Up sebesar ${formatRupiah(amount)} menggunakan ${method.name}`);
  };

  const processWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (!amount || amount < 10000) {
      alert('Minimal Penarikan adalah Rp10.000');
      return;
    }
    if (amount > walletBalance) {
      alert('Saldo escrow Anda tidak mencukupi untuk penarikan ini.');
      return;
    }

    const fee = Math.floor(amount * 0.01); // Potongan 1%
    const method = WITHDRAW_METHODS.find(m => m.id === withdrawMethod);
    
    setWalletBalance(prev => prev - amount);

    const newMutation = {
      id: `TRX-${Math.floor(Math.random() * 100000)}`,
      type: 'debit',
      title: `Penarikan ke ${method.name}`,
      amount: amount,
      date: 'Baru saja',
      status: 'success'
    };
    
    setMutations([newMutation, ...mutations]);
    setIsWithdrawOpen(false);
    setWithdrawAmount('');
    alert(`Berhasil menarik ke ${method.name}. Dana yang ditransfer: ${formatRupiah(amount - fee)} (setelah potongan fee 1% sebesar ${formatRupiah(fee)})`);
  };

  // --- COMPONENTS ---

  const Sidebar = () => (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 text-indigo-500 font-bold text-2xl tracking-tighter">
        <ShieldCheck className="w-8 h-8" />
        RMT Hub
      </div>
      
      <div className="px-4 py-2">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6">
          <p className="text-slate-400 text-xs mb-1">Saldo Escrow (IDR)</p>
          <p className="text-white font-bold text-lg">{formatRupiah(walletBalance)}</p>
          <button onClick={() => setIsTopUpOpen(true)} className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-lg transition">
            Top Up
          </button>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavItem icon={<Home />} label="Beranda" id="home" />
        <NavItem icon={<Gamepad2 />} label="Pasar Game" id="market" />
        <NavItem icon={<Ticket />} label="Voucher Game" id="vouchers" />
        <NavItem icon={<ListOrdered />} label="Pesanan Saya" id="orders" />
        <NavItem icon={<Wallet />} label="Dompet & Mutasi" id="wallet" />
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
            <User className="w-5 h-5 text-slate-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">PlayerOne</p>
            <p className="text-xs text-slate-400">Member Premium</p>
          </div>
        </div>
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around p-3 pb-safe z-50">
      <NavBtn icon={<Home />} label="Home" id="home" />
      <NavBtn icon={<Gamepad2 />} label="Market" id="market" />
      <NavBtn icon={<Ticket />} label="Voucher" id="vouchers" />
      <NavBtn icon={<ListOrdered />} label="Orders" id="orders" />
      <NavBtn icon={<Wallet />} label="Wallet" id="wallet" />
    </div>
  );

  const NavItem = ({ icon, label, id }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        activeTab === id 
          ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  const NavBtn = ({ icon, label, id }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center gap-1 p-2 ${
        activeTab === id ? 'text-indigo-400' : 'text-slate-500'
      }`}
    >
      {React.cloneElement(icon, { className: 'w-6 h-6' })}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  // --- VIEWS ---

  const HomeView = () => {
    const [aiQuery, setAiQuery] = useState('');
    const [finderData, setFinderData] = useState(null);
    const [isFinding, setIsFinding] = useState(false);

    const handleFindDeal = async (e) => {
      e.preventDefault();
      if(!aiQuery.trim()) return;
      
      setIsFinding(true);
      const catalogInfo = JSON.stringify({ 
        games: GAMES.map(g => ({ id: g.id, name: g.name })), 
        vouchers: VOUCHERS.map(v => ({ id: v.id, name: v.name })),
        topOffers: OFFERS, 
        topVoucherOffers: VOUCHER_OFFERS 
      });
      
      const prompt = `Pertanyaan user: "${aiQuery}". Katalog kami saat ini: ${catalogInfo}`;
      const sysInfo = `Kamu adalah asisten belanja cerdas di RMT Hub. Kembalikan respons DALAM FORMAT JSON SAJA.
Struktur JSON yang wajib digunakan:
{
  "pesan": "Jawaban ramah, suportif, dan singkat (maks 3-4 kalimat). Jangan gunakan markdown.",
  "action": {
    "type": "game" | "voucher" | "offer" | "voucher_offer" | null,
    "id": angka_id_yang_sesuai_dari_katalog | null,
    "label": "Teks tombol yang menarik (misal: 'Beli Sekarang', 'Lihat Item')" | null
  }
}
Berikan action jika ada item di katalog yang sangat relevan dengan pertanyaan user.`;
      
      try {
        const res = await fetchGemini(prompt, sysInfo, true);
        const parsed = JSON.parse(res);
        setFinderData(parsed);
      } catch (err) {
        setFinderData({ pesan: "Maaf, AI sedang mengalami gangguan saat menganalisis. Coba lagi nanti.", action: null });
      }
      setIsFinding(false);
    };

    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="md:hidden flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xl">
            <ShieldCheck className="w-6 h-6" />
            RMT Hub
          </div>
          <div className="flex gap-3">
            <button className="text-slate-400"><Search className="w-6 h-6" /></button>
            <button className="text-slate-400"><Bell className="w-6 h-6" /></button>
          </div>
        </div>

        <div className="md:hidden bg-gradient-to-br from-indigo-900 to-slate-800 p-5 rounded-2xl border border-indigo-500/30">
          <p className="text-indigo-200 text-sm mb-1">Total Saldo (IDR)</p>
          <p className="text-white font-bold text-3xl mb-4">{formatRupiah(walletBalance)}</p>
          <button onClick={() => setIsTopUpOpen(true)} className="w-full bg-indigo-500 text-white font-medium py-2.5 rounded-xl">
            Isi Saldo
          </button>
        </div>

        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-5 md:p-6 rounded-2xl border border-indigo-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
            <Bot className="w-32 h-32 text-indigo-300" />
          </div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> 
              Tanya RMT AI
            </h2>
            <p className="text-indigo-200 text-sm mb-4">Punya budget tertentu? Beritahu AI kami apa yang sedang Anda cari, dan biarkan AI mencarikan deal terbaik untuk Anda!</p>
            
            <form onSubmit={handleFindDeal} className="flex gap-2">
              <input 
                type="text" 
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Cth: Saya ada uang 100rb, mau beli voucher apa ya?" 
                className="flex-1 bg-slate-900/80 border border-slate-700 text-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 transition"
              />
              <button 
                type="submit" 
                disabled={isFinding || !aiQuery.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white px-5 rounded-xl transition flex items-center justify-center"
              >
                {isFinding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </button>
            </form>

            {finderData && (
              <div className="mt-4 bg-slate-900/60 p-4 rounded-xl border border-indigo-500/20 animate-in fade-in slide-in-from-top-2">
                <p className="text-sm text-indigo-100 leading-relaxed whitespace-pre-wrap">{finderData.pesan}</p>
                
                {finderData.action && finderData.action.id && (
                  <button
                    onClick={() => {
                      const { type, id } = finderData.action;
                      if (type === 'game') {
                        setSelectedGame(GAMES.find(g => g.id === id));
                        setActiveTab('market');
                      } else if (type === 'voucher') {
                        setSelectedVoucher(VOUCHERS.find(v => v.id === id));
                        setActiveTab('vouchers');
                      } else if (type === 'offer') {
                        const offer = OFFERS.find(o => o.id === id);
                        if (offer) handleBuyClick(offer);
                      } else if (type === 'voucher_offer') {
                        const offer = VOUCHER_OFFERS.find(o => o.id === id);
                        if (offer) handleBuyClick(offer);
                      }
                    }}
                    className="mt-3 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold px-4 py-2 rounded-lg transition inline-flex items-center gap-1 shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                  >
                    {finderData.action.label || 'Lihat Detail'} <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">Pilih Game</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GAMES.map(game => (
              <div 
                key={game.id}
                onClick={() => { setSelectedGame(game); setActiveTab('market'); }}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-3 cursor-pointer hover:border-indigo-500 transition group"
              >
                <img src={game.image} alt={game.name} className="w-full h-24 md:h-32 object-cover rounded-xl mb-3 opacity-80 group-hover:opacity-100 transition" />
                <h3 className="text-white font-semibold text-sm truncate">{game.name}</h3>
                <p className="text-slate-400 text-xs">{game.type}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-white">Platform Voucher</h2>
            <button onClick={() => setActiveTab('vouchers')} className="text-sm text-indigo-400 hover:text-indigo-300">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {VOUCHERS.map(voucher => (
              <div 
                key={voucher.id}
                onClick={() => { setSelectedVoucher(voucher); setActiveTab('vouchers'); }}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-3 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mb-2 border border-slate-600 group-hover:border-indigo-400 transition">
                   <img src={voucher.image} alt={voucher.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-medium text-[10px] md:text-xs text-center leading-tight">{voucher.name}</h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  };

  const MarketView = () => {
    const displayOffers = selectedGame ? OFFERS.filter(o => o.gameId === selectedGame.id) : OFFERS;

    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {selectedGame ? `Pasar: ${selectedGame.name}` : 'Semua Penawaran'}
          </h2>
          {selectedGame && (
            <button 
              onClick={() => setSelectedGame(null)}
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              Tampilkan Semua
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayOffers.map(offer => {
            const game = GAMES.find(g => g.id === offer.gameId);
            const isAnalyzing = analyzingId === offer.id;
            const aiResult = aiAnalyses[offer.id];

            return (
              <div key={offer.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex flex-col justify-between transition-all hover:border-slate-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-2 py-1 bg-slate-700 text-slate-300 text-[10px] rounded-md mb-2 uppercase font-bold tracking-wider">
                      {game.name} - {offer.server}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {offer.amount.toLocaleString('id-ID')} {game.currency}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <User className="w-4 h-4" /> {offer.seller} 
                      <span className="text-amber-400">★ {offer.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-bold text-xl">{formatRupiah(offer.price)}</p>
                    <p className="text-slate-500 text-xs flex items-center justify-end gap-1 mt-1">
                      <Clock className="w-3 h-3" /> {offer.delivery}
                    </p>
                  </div>
                </div>
                
                {aiResult && (
                  <div className="mb-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 text-sm text-indigo-200 animate-in fade-in">
                    <div className="flex items-center gap-2 mb-1 font-semibold text-indigo-300">
                      <Sparkles className="w-4 h-4" /> Hasil Analisis AI:
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed">{aiResult}</div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                  <button 
                    onClick={() => handleAnalyzeOffer(offer, game)}
                    disabled={isAnalyzing}
                    className="flex-1 sm:flex-none bg-slate-900 border border-indigo-500/30 hover:bg-slate-800 text-indigo-300 py-2.5 px-3 rounded-xl font-medium text-xs md:text-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-400" />} 
                    <span className="hidden sm:inline">Cek</span> Keamanan
                  </button>
                  <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2.5 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Chat
                  </button>
                  <button 
                    onClick={() => handleBuyClick(offer)}
                    className="flex-[2] bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-medium text-sm transition shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]"
                  >
                    Beli Instan
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        
        {displayOffers.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Gamepad2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Belum ada penawaran untuk game ini.</p>
          </div>
        )}
      </div>
    );
  };

  const VouchersView = () => {
    const displayOffers = selectedVoucher ? VOUCHER_OFFERS.filter(o => o.voucherId === selectedVoucher.id) : VOUCHER_OFFERS;

    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {selectedVoucher ? `Voucher: ${selectedVoucher.name}` : 'Katalog Voucher & Studio'}
          </h2>
          {selectedVoucher && (
            <button 
              onClick={() => setSelectedVoucher(null)}
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              Tampilkan Semua
            </button>
          )}
        </div>

        {!selectedVoucher && (
          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VOUCHERS.map(v => (
                <div 
                  key={v.id}
                  onClick={() => setSelectedVoucher(v)}
                  className="bg-slate-800 border border-slate-700 rounded-2xl p-4 cursor-pointer hover:border-indigo-500 transition group flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 border-2 border-slate-700 group-hover:border-indigo-400 transition shadow-lg">
                     <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{v.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">Pengiriman Instan</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <h3 className="text-lg font-medium text-white mb-4">
           {selectedVoucher ? 'Pilihan Nominal' : 'Rekomendasi Voucher'}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayOffers.map(offer => {
            const voucher = VOUCHERS.find(v => v.id === offer.voucherId);
            return (
              <div key={offer.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-2 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] rounded-md mb-2 uppercase font-bold tracking-wider border border-indigo-500/20">
                      {voucher.name}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-1 leading-tight">
                      {offer.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mt-2">
                      <User className="w-4 h-4" /> {offer.seller}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-bold text-xl">{formatRupiah(offer.price)}</p>
                    <p className="text-indigo-400 text-xs flex items-center justify-end gap-1 mt-1 font-medium">
                      <Ticket className="w-3 h-3" /> Kode Otomatis
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => handleBuyClick(offer)}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-medium text-sm transition shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]"
                  >
                    Beli Instan
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  };

  const OrdersView = () => (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-white mb-6">Pesanan Saya</h2>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-700">
              <span className="text-sm font-medium text-slate-400">{order.id} • {order.date}</span>
              {order.status === 'escrow' ? (
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full border border-amber-500/20 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Menunggu Pengiriman
                </span>
              ) : (
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Selesai
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{order.item}</h3>
                <p className="text-slate-400 text-sm">Total: <span className="text-emerald-400 font-medium">{formatRupiah(order.price)}</span></p>
              </div>
            </div>

            {order.status === 'escrow' && (
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-indigo-200 mb-2">
                    Dana Anda sedang ditahan oleh sistem Escrow. Jika item sudah masuk ke akun game Anda, silakan konfirmasi selesai agar dana diteruskan ke penjual.
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setOrders(orders.map(o => o.id === order.id ? {...o, status: 'completed'} : o));
                        alert('Pesanan diselesaikan! Dana diteruskan ke penjual.');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 rounded-lg font-medium transition"
                    >
                      Konfirmasi Terima
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-4 py-2 rounded-lg font-medium transition">
                      Komplain (Dispute)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const WalletView = () => (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-white mb-6">Dompet & Mutasi</h2>

      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-800 rounded-3xl p-6 md:p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
          <Wallet className="w-64 h-64 text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-indigo-200 font-medium mb-1">Saldo Tersedia</p>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {formatRupiah(walletBalance)}
            </h3>
            <p className="text-indigo-300 text-sm mt-2 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Dilindungi oleh Escrow System
            </p>
          </div>
          
          <div className="flex gap-3 mt-2 md:mt-0">
            <button onClick={() => setIsTopUpOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-xl font-bold transition shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <PlusCircle className="w-5 h-5" /> Top Up
            </button>
            <button onClick={() => setIsWithdrawOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600 px-6 py-3 rounded-xl font-bold transition">
              <ArrowDownToLine className="w-5 h-5" /> Tarik
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" /> Riwayat Transaksi
          </h3>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 transition">Lihat Semua</button>
        </div>
        
        <div className="space-y-3">
          {mutations.map(trx => (
            <div key={trx.id} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex items-center justify-between hover:bg-slate-800 transition">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  trx.type === 'credit' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {trx.type === 'credit' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm md:text-base leading-snug">{trx.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>{trx.date}</span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                    <span>{trx.id}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right shrink-0">
                <p className={`font-bold text-sm md:text-lg ${
                  trx.type === 'credit' ? 'text-emerald-400' : 'text-white'
                }`}>
                  {trx.type === 'credit' ? '+' : '-'}{formatRupiah(trx.amount)}
                </p>
                <p className="text-xs text-indigo-300 capitalize font-medium mt-0.5">
                  Berhasil
                </p>
              </div>
            </div>
          ))}
          
          {mutations.length === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-500">Belum ada riwayat transaksi.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      <div className="max-w-[1600px] mx-auto flex h-screen overflow-hidden relative">
        
        <Sidebar />

        <main className="flex-1 h-full overflow-y-auto pb-24 md:pb-0 relative">
          
          <header className="hidden md:flex sticky top-0 bg-slate-950/80 backdrop-blur-md z-40 p-6 border-b border-slate-800 items-center justify-between">
            <h1 className="text-2xl font-bold text-white capitalize">
              {activeTab === 'home' ? 'Beranda' : activeTab === 'market' ? 'Pasar Game' : activeTab === 'vouchers' ? 'Voucher & Studio' : activeTab}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Cari item, game, penjual..." 
                  className="bg-slate-900 border border-slate-700 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-500 w-64 transition"
                />
              </div>
              <button className="relative p-2 text-slate-400 hover:text-white transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </header>

          <div className="p-4 md:p-8 max-w-5xl mx-auto">
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'market' && <MarketView />}
            {activeTab === 'vouchers' && <VouchersView />}
            {activeTab === 'orders' && <OrdersView />}
            {activeTab === 'wallet' && <WalletView />}
          </div>
        </main>

        <BottomNav />

        {/* --- CHECKOUT ESCROW MODAL --- */}
        {isCheckoutOpen && selectedOffer && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsCheckoutOpen(false)}></div>
            <div className="bg-slate-900 border border-slate-700 rounded-t-2xl md:rounded-2xl w-full max-w-md relative z-10 animate-in slide-in-from-bottom-4 md:slide-in-from-bottom-8 duration-300">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Checkout Pesanan</h3>
                <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Item yang dibeli:</p>
                  <p className="font-bold text-white text-lg">
                    {selectedOffer.type === 'Voucher' 
                      ? selectedOffer.name 
                      : `${selectedOffer.amount?.toLocaleString('id-ID')} ${GAMES.find(g => g.id === selectedOffer.gameId)?.currency}`}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">Penjual: {selectedOffer.seller}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Harga Item</span>
                    <span className="text-white">{formatRupiah(selectedOffer.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Biaya Admin ({PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name})</span>
                    <span className="text-white">{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.fee === 0 ? 'Gratis' : formatRupiah(PAYMENT_METHODS.find(m => m.id === paymentMethod)?.fee)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-800 mt-2">
                    <span className="text-white">Total Bayar</span>
                    <span className="text-emerald-400">{formatRupiah(selectedOffer.price + (PAYMENT_METHODS.find(m => m.id === paymentMethod)?.fee || 0))}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-white mb-3">Metode Pembayaran</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENT_METHODS.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-sm transition-all ${
                          paymentMethod === method.id 
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                        }`}
                      >
                        {method.icon === 'Wallet' ? <Wallet className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                        <span className="font-medium">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/30 flex gap-3">
                  <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
                  <p className="text-xs text-indigo-200 leading-relaxed">
                    {selectedOffer.type === 'Voucher' ? (
                      <><strong>Pengiriman Otomatis:</strong> Kode voucher akan langsung dikirimkan ke riwayat pesanan Anda segera setelah pembayaran berhasil.</>
                    ) : (
                      <><strong>Perlindungan Escrow:</strong> Dana Anda akan ditahan oleh RMT Hub dan tidak akan diserahkan ke penjual sampai Anda mengonfirmasi item telah diterima di dalam game.</>
                    )}
                  </p>
                </div>

                <button 
                  onClick={processCheckout}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                >
                  <Wallet className="w-5 h-5" /> Bayar Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- TOP UP MODAL --- */}
        {isTopUpOpen && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsTopUpOpen(false)}></div>
            <div className="bg-slate-900 border border-slate-700 rounded-t-2xl md:rounded-2xl w-full max-w-md relative z-10 animate-in slide-in-from-bottom-4 md:slide-in-from-bottom-8 duration-300">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Top Up Saldo</h3>
                <button onClick={() => setIsTopUpOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              
              <div className="p-6 space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Pilih Nominal</label>
                  <input 
                    type="number" 
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    placeholder="Contoh: 100000" 
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition"
                  />
                  {topUpAmount && (
                    <p className="text-xs text-indigo-400 mt-2">Diterima: {formatRupiah(parseInt(topUpAmount) || 0)}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Metode Pembayaran</label>
                  <select 
                    value={topUpMethod}
                    onChange={(e) => setTopUpMethod(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition appearance-none cursor-pointer"
                  >
                    <optgroup label="Bank Transfer" className="bg-slate-800 text-white">
                      {TOPUP_METHODS.filter(m => m.type === 'Bank').map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="E-Money" className="bg-slate-800 text-white">
                      {TOPUP_METHODS.filter(m => m.type === 'E-Money').map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-xs text-slate-400 leading-relaxed">
                  Semua transaksi diproses secara instan (real-time). Pastikan nama metode sesuai dengan aplikasi yang akan Anda gunakan.
                </div>

                <button 
                  onClick={processTopUp}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                >
                  Lanjut Bayar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- WITHDRAW MODAL --- */}
        {isWithdrawOpen && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsWithdrawOpen(false)}></div>
            <div className="bg-slate-900 border border-slate-700 rounded-t-2xl md:rounded-2xl w-full max-w-md relative z-10 animate-in slide-in-from-bottom-4 md:slide-in-from-bottom-8 duration-300">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Tarik Saldo (E-Money)</h3>
                <button onClick={() => setIsWithdrawOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              
              <div className="p-6 space-y-5">
                <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl flex justify-between items-center">
                  <span className="text-sm text-indigo-200">Saldo Maksimal</span>
                  <span className="font-bold text-white">{formatRupiah(walletBalance)}</span>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Nominal Penarikan</label>
                  <input 
                    type="number" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Contoh: 100000" 
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition"
                  />
                  {withdrawAmount && parseInt(withdrawAmount) > 0 && (
                    <div className="text-xs space-y-1 mt-2 p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                      <div className="flex justify-between text-slate-400">
                        <span>Potongan Fee (1%)</span>
                        <span className="text-rose-400">-{formatRupiah(Math.floor(parseInt(withdrawAmount) * 0.01))}</span>
                      </div>
                      <div className="flex justify-between text-white font-bold pt-1 border-t border-slate-700">
                        <span>Total Diterima</span>
                        <span className="text-emerald-400">{formatRupiah(parseInt(withdrawAmount) - Math.floor(parseInt(withdrawAmount) * 0.01))}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Tujuan Penarikan</label>
                  <div className="grid grid-cols-2 gap-2">
                    {WITHDRAW_METHODS.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setWithdrawMethod(method.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-sm transition-all ${
                          withdrawMethod === method.id 
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        <span className="font-medium">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={processWithdraw}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <ArrowDownToLine className="w-5 h-5" /> Tarik Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}