
import React, { useState, useEffect, useMemo } from 'react';
import { Wallet, Hotel, Utensils, ShoppingBag, Train, Ticket, Plus, X, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';

// Types for serialization
type CategoryType = '住宿' | '餐飲' | '購物' | '交通' | '票券' | '其他';

interface ExpenseItem {
  id: string;
  category: CategoryType;
  title: string;
  amount: number;
  currency: 'JPY' | 'TWD';
  exchangeRate: number; // Record the rate at the time of entry
  paid: boolean;
  date: string;
}

const DEFAULT_RATE = 0.215;

const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 'flight-kristine',
    category: '交通',
    title: 'Kristine 機票',
    amount: 6322,
    currency: 'TWD',
    exchangeRate: 1,
    paid: true,
    date: '已付'
  },
  {
    id: 'flight-lin',
    category: '交通',
    title: 'Lin 機票',
    amount: 6222,
    currency: 'TWD',
    exchangeRate: 1,
    paid: true,
    date: '已付'
  },
  {
    id: 'initial-hotel',
    category: '住宿',
    title: '品川王子大飯店 (5泊)',
    amount: 98970,
    currency: 'JPY',
    exchangeRate: DEFAULT_RATE,
    paid: false,
    date: '4/5-4/9'
  }
];

const CATEGORY_CONFIG: Record<CategoryType, { color: string, icon: any }> = {
  '住宿': { color: 'bg-slate-800', icon: Hotel },
  '餐飲': { color: 'bg-rose-400', icon: Utensils },
  '購物': { color: 'bg-orange-300', icon: ShoppingBag },
  '交通': { color: 'bg-blue-400', icon: Train },
  '票券': { color: 'bg-purple-400', icon: Ticket },
  '其他': { color: 'bg-gray-400', icon: Wallet },
};

export const CostView: React.FC = () => {
  // Current "Market" Rate (used for new items)
  const [currentExchangeRate, setCurrentExchangeRate] = useState<number>(() => {
    const saved = localStorage.getItem('tokyo_trip_current_rate');
    return saved ? parseFloat(saved) : DEFAULT_RATE;
  });

  // Expense State - Using v2 key to ensure new defaults load
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem('tokyo_trip_expenses_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration: If old items don't have exchangeRate, assign the default
      return parsed.map((item: any) => ({
        ...item,
        exchangeRate: item.exchangeRate || DEFAULT_RATE
      }));
    }
    return INITIAL_EXPENSES;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<{
    title: string;
    amount: string;
    category: CategoryType;
  }>({
    title: '',
    amount: '',
    category: '餐飲'
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('tokyo_trip_expenses_v2', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('tokyo_trip_current_rate', currentExchangeRate.toString());
  }, [currentExchangeRate]);

  const handleAddExpense = () => {
    if (!newExpense.title || !newExpense.amount) return;

    const item: ExpenseItem = {
      id: Date.now().toString(),
      title: newExpense.title,
      amount: parseInt(newExpense.amount),
      category: newExpense.category,
      currency: 'JPY', 
      exchangeRate: currentExchangeRate, // SNAPSHOT the current rate here
      paid: true, // Default to paid for new tracked expenses
      date: new Date().toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })
    };

    setExpenses(prev => [item, ...prev]);
    setIsModalOpen(false);
    setNewExpense({ title: '', amount: '', category: '餐飲' });
  };

  const handleDelete = (id: string) => {
    if (confirm('確定要刪除這筆花費嗎？')) {
      setExpenses(prev => prev.filter(e => e.id !== id));
    }
  };

  const togglePaid = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpenses(prev => prev.map(item => 
      item.id === id ? { ...item, paid: !item.paid } : item
    ));
  };

  // Calculations (Using item-specific exchange rates)
  const totalTWD = expenses.reduce((acc, item) => {
    const itemTWD = item.currency === 'TWD' ? item.amount : item.amount * item.exchangeRate;
    return acc + itemTWD;
  }, 0);

  const paidTWD = expenses.filter(e => e.paid).reduce((acc, item) => {
    const itemTWD = item.currency === 'TWD' ? item.amount : item.amount * item.exchangeRate;
    return acc + itemTWD;
  }, 0);

  const pendingTWD = totalTWD - paidTWD;

  // Category breakdown
  const categoryTotals = expenses.reduce((acc, item) => {
    const amountTWD = item.currency === 'TWD' ? item.amount : item.amount * item.exchangeRate;
    acc[item.category] = (acc[item.category] || 0) + amountTWD;
    return acc;
  }, {} as Record<string, number>);

  const maxCatAmount = Math.max(...Object.values(categoryTotals), 1);

  // Sorting Logic
  const sortedExpenses = useMemo(() => {
    const paid = expenses.filter(e => e.paid);
    const unpaid = expenses.filter(e => !e.paid);

    // 1. Sort Paid: Predefined/Oldest First (Chronological)
    // "已先付款的在前"
    paid.sort((a, b) => {
      // Check if ID is numeric (timestamp) or string (static)
      const isANumeric = !isNaN(Number(a.id));
      const isBNumeric = !isNaN(Number(b.id));

      // Static IDs (like 'flight-kristine') come before Numeric Timestamp IDs
      if (!isANumeric && isBNumeric) return -1;
      if (isANumeric && !isBNumeric) return 1;
      
      // If both are timestamps, Sort Ascending (Oldest -> Newest)
      if (isANumeric && isBNumeric) {
        return Number(a.id) - Number(b.id);
      }
      
      // If both are static, keep original order (based on list definition)
      return 0;
    });

    // 2. Sort Unpaid: By Date
    // "尚未付款的預計項目按日期排序"
    unpaid.sort((a, b) => {
       const getVal = (str: string) => {
           // Extract "M/D" from string like "4/5-4/9" or "4/6"
           const match = str.match(/(\d+)\/(\d+)/);
           if (match) {
             // Convert to a number MMDD for easy sorting
             return parseInt(match[1]) * 100 + parseInt(match[2]);
           }
           return 9999; // Items without date go to bottom
       };
       return getVal(a.date) - getVal(b.date);
    });

    return [...paid, ...unpaid];
  }, [expenses]);

  return (
    <div className="px-6 py-8 pb-32 h-full overflow-y-auto no-scrollbar relative">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block font-serif-tc">
            BUDGET TRACKER
          </span>
          <h2 className="font-serif-tc font-black text-4xl text-slate-900 leading-tight">
            支出紀錄
          </h2>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/10 transition-colors duration-700"></div>
        
        {/* Exchange Rate Input - Absolute Positioned */}
        <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
                <RefreshCw className="w-3 h-3 text-slate-300" />
                <span className="text-[10px] text-slate-300 font-serif-tc">今日匯率</span>
                <input 
                    type="number" 
                    step="0.001"
                    value={currentExchangeRate}
                    onChange={(e) => setCurrentExchangeRate(parseFloat(e.target.value))}
                    className="w-12 bg-transparent text-right font-mono text-xs font-bold text-white focus:outline-none border-b border-transparent focus:border-white/50"
                />
            </div>
            <span className="text-[9px] text-slate-500 pr-2">僅影響新增項目</span>
        </div>

        <div className="relative z-10 mt-4">
          <p className="text-slate-400 text-xs font-medium tracking-widest mb-1 font-serif-tc">目前總花費 (TWD)</p>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-lg font-serif-tc text-slate-400">$</span>
            <span className="text-4xl font-playfair font-bold tracking-tight">
              {Math.round(totalTWD).toLocaleString()}
            </span>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-[10px] text-slate-400 tracking-wider mb-1 font-serif-tc">已付款</div>
              <div className="font-mono text-lg font-medium">
                ${Math.round(paidTWD).toLocaleString()}
              </div>
            </div>
            <div className="flex-1 bg-rose-500/20 border border-rose-500/30 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-[10px] text-rose-300 tracking-wider mb-1 font-serif-tc">未付款</div>
              <div className="font-mono text-lg font-medium text-rose-200">
                ${Math.round(pendingTWD).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {Object.keys(categoryTotals).length > 0 && (
        <div className="mb-10 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900 tracking-widest mb-4 flex items-center gap-2 font-serif-tc">
                <span className="w-1 h-4 bg-slate-900"></span>
                費用分佈
            </h3>
            <div className="space-y-3">
            {Object.entries(categoryTotals)
                .sort(([,a], [,b]) => b - a)
                .map(([cat, amount], idx) => (
                <div key={idx} className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-slate-400 w-12 text-right tracking-wider font-serif-tc">{cat}</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${CATEGORY_CONFIG[cat as CategoryType].color} rounded-full transition-all duration-1000 ease-out`} 
                            style={{ width: `${(amount / maxCatAmount) * 100}%` }}
                        ></div>
                    </div>
                    <span className="text-xs font-mono text-slate-600 w-16 text-right">
                        ${Math.round(amount).toLocaleString()}
                    </span>
                </div>
            ))}
            </div>
        </div>
      )}

      {/* Expense List */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 tracking-widest mb-4 flex items-center gap-2 font-serif-tc">
            <span className="w-1 h-4 bg-slate-900"></span>
            詳細列表 ({expenses.length})
        </h3>
        <div className="space-y-3">
          {sortedExpenses.map((item) => {
            const Icon = CATEGORY_CONFIG[item.category].icon;
            // Calculate TWD for this specific item using ITS stored rate
            const itemTWD = item.currency === 'JPY' ? Math.round(item.amount * item.exchangeRate) : item.amount;

            return (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-slate-50 shadow-sm relative group overflow-hidden">
                    <div 
                        onClick={(e) => togglePaid(item.id, e)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                        item.paid ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}>
                        {item.paid ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                            <h4 className={`font-serif-tc font-bold truncate pr-2 ${item.paid ? 'text-slate-600' : 'text-slate-900'}`}>
                                {item.title}
                            </h4>
                            <span className={`font-mono text-sm font-medium whitespace-nowrap ${item.paid ? 'text-slate-400' : 'text-slate-900'}`}>
                                {item.currency === 'JPY' ? '¥' : 'NT$'}
                                {item.amount.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium tracking-wider">
                            <span className="font-serif-tc flex items-center gap-1">
                              {item.date} • {item.category}
                              {item.currency === 'JPY' && (
                                <span className="bg-slate-100 px-1.5 rounded text-[9px] text-slate-400">@{item.exchangeRate}</span>
                              )}
                            </span>
                            {item.currency === 'JPY' && (
                                <span>≈ ${itemTWD.toLocaleString()}</span>
                            )}
                        </div>
                    </div>

                    {/* Delete Action */}
                    <button 
                        onClick={() => handleDelete(item.id)}
                        className="absolute right-0 top-0 bottom-0 w-12 bg-rose-500 text-white flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-200"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            );
          })}
          {expenses.length === 0 && (
              <div className="text-center py-10 text-slate-300 text-sm font-serif-tc">
                  尚未新增任何花費
              </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 bg-slate-900 rounded-full shadow-2xl shadow-slate-900/30 flex items-center justify-center text-white hover:scale-110 transition-transform border-2 border-white/20"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsModalOpen(false)}>
          <div 
            className="bg-white w-full sm:w-[400px] sm:rounded-2xl p-6 rounded-t-2xl animate-slide-up shadow-2xl" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 font-serif-tc">新增支出</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                    <X className="w-5 h-5 text-slate-500" />
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">項目名稱</label>
                    <input 
                        type="text" 
                        value={newExpense.title}
                        onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
                        placeholder="例如：章魚燒"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-400 font-serif-tc"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">金額 (JPY)</label>
                        <input 
                            type="number" 
                            inputMode="numeric"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                            placeholder="0"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-mono focus:outline-none focus:border-slate-400"
                        />
                    </div>
                     <div className="flex-1">
                         <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">匯率</label>
                         <div className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 font-mono cursor-not-allowed">
                             {currentExchangeRate}
                         </div>
                     </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">類別</label>
                    <div className="grid grid-cols-3 gap-2">
                        {Object.keys(CATEGORY_CONFIG).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setNewExpense({...newExpense, category: cat as CategoryType})}
                                className={`py-2 rounded-lg text-sm font-medium transition-all font-serif-tc ${
                                    newExpense.category === cat 
                                    ? 'bg-slate-900 text-white shadow-md' 
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleAddExpense}
                    disabled={!newExpense.title || !newExpense.amount}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-4 shadow-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    確認新增
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
