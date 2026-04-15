import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, X, Printer, Share2, CheckCircle2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../Logo';

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [transactions, setTransactions] = useState([
    { id: 'tx1', title: "Apple Store", category: "Electronics", date: "Oct 24, 2023", time: "14:20", amount: "-฿45,900.00", status: "Completed", ref: "MB-99281-X", method: "Platinum Debit •••• 4290" },
    { id: 'tx2', title: "Salary Deposit", category: "Income", date: "Oct 20, 2023", time: "09:00", amount: "+฿85,000.00", isPositive: true, status: "Completed", ref: "MB-88122-Y", method: "Savings Account •••• 1290" },
    { id: 'tx3', title: "Starbucks Coffee", category: "Food & Drink", date: "Oct 19, 2023", time: "08:45", amount: "-฿185.00", status: "Completed", ref: "MB-77101-Z", method: "Platinum Debit •••• 4290" },
    { id: 'tx4', title: "Netflix Subscription", category: "Entertainment", date: "Oct 18, 2023", time: "00:01", amount: "-฿419.00", status: "Completed", ref: "MB-66291-A", method: "Platinum Debit •••• 4290" },
    { id: 'tx5', title: "Amazon.com", category: "Shopping", date: "Oct 15, 2023", time: "11:30", amount: "-฿2,450.00", status: "Completed", ref: "MB-55182-B", method: "Platinum Debit •••• 4290" },
    { id: 'tx6', title: "7-Eleven", category: "Food & Drink", date: "Oct 14, 2023", time: "19:15", amount: "-฿85.00", status: "Completed", ref: "MB-44271-C", method: "Platinum Debit •••• 4290" },
    { id: 'tx7', title: "Grab Food", category: "Food & Drink", date: "Oct 12, 2023", time: "12:40", amount: "-฿340.00", status: "Completed", ref: "MB-33162-D", method: "Platinum Debit •••• 4290" },
    { id: 'tx8', title: "Electricity Bill", category: "Utilities", date: "Oct 10, 2023", time: "10:00", amount: "-฿1,850.00", status: "Completed", ref: "MB-22151-E", method: "Current Account •••• 8210" },
  ]);

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('maybank_transactions') || '[]');
    if (saved.length > 0) {
      setTransactions(prev => {
        // Filter out any that might already be in prev to avoid duplicates on re-render
        const filteredSaved = saved.filter((s: any) => !prev.find(p => p.id === s.id));
        return [...filteredSaved, ...prev];
      });
    }
  }, []);

  const filteredTransactions = transactions.filter(tx => 
    tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setShowDownloadModal(false);
      // Simulate PDF download
      alert("Statement downloaded as PDF successfully!");
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 lg:gap-6">
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900">Transactions</h2>
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="flex-1 lg:flex-none no-round border border-slate-200 bg-white px-3 lg:px-4 py-2 flex items-center justify-center gap-2 text-[10px] lg:text-sm font-bold text-slate-600 hover:border-primary transition-all">
              <Filter className="h-3 w-3 lg:h-4 lg:w-4" />
              Filter
            </button>
            <button 
              onClick={() => setShowDownloadModal(true)}
              className="flex-1 lg:flex-none no-round border border-slate-200 bg-white px-3 lg:px-4 py-2 flex items-center justify-center gap-2 text-[10px] lg:text-sm font-bold text-slate-600 hover:border-primary transition-all"
            >
              <Download className="h-3 w-3 lg:h-4 lg:w-4" />
              Statement
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 lg:left-4 top-1/2 h-4 w-4 lg:h-5 lg:w-5 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="no-round w-full border border-slate-200 bg-white py-3 lg:py-4 pl-10 lg:pl-12 pr-4 text-xs lg:text-sm font-bold text-slate-900 outline-none focus:border-primary transition-all shadow-sm"
          />
        </div>

        <div className="no-round border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="bg-slate-50 border-b border-slate-200 px-4 lg:px-6 py-3 lg:py-4 grid grid-cols-3 lg:grid-cols-4 text-[8px] lg:text-xs font-bold uppercase tracking-widest text-slate-500">
            <div className="col-span-2 lg:col-span-2">Transaction</div>
            <div className="hidden lg:block">Date</div>
            <div className="text-right">Amount</div>
          </div>
          
          {filteredTransactions.map(tx => (
            <TransactionRow 
              key={tx.id} 
              {...tx} 
              onClick={() => setSelectedTx(tx)}
            />
          ))}
          
          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-400 font-bold">No transactions found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Receipt Modal */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white p-8 no-round shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button 
                onClick={() => setSelectedTx(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center border-b border-slate-100 pb-8">
                <Logo className="mx-auto mb-6" />
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-green-100 text-green-600 no-round">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Transaction Successful</h3>
                <p className="text-sm text-slate-400 mt-1">{selectedTx.date} at {selectedTx.time}</p>
                <p className="text-4xl font-black text-slate-900 mt-6">{selectedTx.amount}</p>
              </div>

              <div className="py-8 space-y-4">
                <ReceiptItem label="Merchant" value={selectedTx.title} />
                <ReceiptItem label="Category" value={selectedTx.category} />
                <ReceiptItem label="Payment Method" value={selectedTx.method} />
                <ReceiptItem label="Reference ID" value={selectedTx.ref} />
                <ReceiptItem label="Status" value={selectedTx.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button className="no-round border border-slate-200 py-3 flex items-center justify-center gap-2 font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  <Printer className="h-4 w-4" /> Print
                </button>
                <button className="no-round bg-slate-900 py-3 flex items-center justify-center gap-2 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Download Statement Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDownloadModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white p-8 no-round shadow-2xl"
            >
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>

              <h3 className="text-2xl font-bold text-slate-900 mb-6">Download Statement</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Select Date Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input type="date" className="w-full border border-slate-200 py-3 pl-10 pr-4 no-round text-sm font-bold outline-none focus:border-primary" />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input type="date" className="w-full border border-slate-200 py-3 pl-10 pr-4 no-round text-sm font-bold outline-none focus:border-primary" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Format</label>
                  <select className="w-full border border-slate-200 py-3 px-4 no-round text-sm font-bold outline-none focus:border-primary appearance-none bg-white">
                    <option>PDF Document (.pdf)</option>
                    <option>Excel Spreadsheet (.xlsx)</option>
                    <option>CSV File (.csv)</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="no-round mt-8 w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Download Statement
                  </>
                )}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

function TransactionRow({ title, category, date, amount, isPositive = false, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="px-4 lg:px-6 py-4 lg:py-6 border-b border-slate-100 grid grid-cols-3 lg:grid-cols-4 items-center hover:bg-slate-50 transition-all last:border-0 cursor-pointer group"
    >
      <div className="col-span-2 flex items-center gap-3 lg:gap-4">
        <div className={`h-8 w-8 lg:h-10 lg:w-10 flex items-center justify-center no-round ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {isPositive ? <ArrowDownLeft className="h-4 w-4 lg:h-5 lg:w-5" /> : <ArrowUpRight className="h-4 w-4 lg:h-5 lg:w-5" />}
        </div>
        <div className="truncate">
          <p className="text-xs lg:text-sm font-bold text-slate-900 group-hover:text-primary transition-all truncate">{title}</p>
          <p className="text-[10px] lg:text-xs font-medium text-slate-400 truncate">{category}</p>
        </div>
      </div>
      <div className="hidden lg:block text-sm font-bold text-slate-500">{date}</div>
      <div className={`text-right text-xs lg:text-base font-black ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {amount}
      </div>
    </div>
  );
}

function ReceiptItem({ label, value }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-400 font-medium">{label}</span>
      <span className="text-slate-900 font-bold">{value}</span>
    </div>
  );
}
