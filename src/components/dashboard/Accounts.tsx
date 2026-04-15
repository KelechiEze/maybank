import React, { useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Wallet, Plus, ArrowRight, ArrowLeft, ArrowUpRight, ArrowDownLeft, Download, Filter, Calendar, X, Printer, Share2, CheckCircle2, Building2, Hash, Search, ShieldCheck, Send, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../Logo';
import { handleNumberInput, handleLetterInput } from '../../lib/utils';
import OTPInput from '../ui/OTPInput';

export default function Accounts() {
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [sendStep, setSendStep] = useState(1);
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [fee, setFee] = useState(0);
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');

  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    const initialAccounts = [
      { 
        id: 'savings',
        type: "Savings Account", 
        number: "098-2-45129-0", 
        balance: 2450500.00, 
        currency: "USD",
        status: "Active",
      },
      { 
        id: 'current',
        type: "Current Account", 
        number: "124-5-88210-3", 
        balance: 120000.00, 
        currency: "THB",
        status: "Active",
      }
    ];

    const savedAccounts = JSON.parse(localStorage.getItem('maybank_accounts') || 'null');
    if (!savedAccounts) {
      localStorage.setItem('maybank_accounts', JSON.stringify(initialAccounts));
      setAccounts(initialAccounts);
    } else {
      setAccounts(savedAccounts);
    }
  }, []);

  const getAccountTransactions = (accId: string) => {
    const allTx = JSON.parse(localStorage.getItem('maybank_transactions') || '[]');
    // For demo purposes, we'll also include some initial transactions if none exist
    const initialTx = [
      { id: 'tx-init-1', accId: 'savings', title: "International Wire Transfer", category: "Business", date: "Oct 24, 2023", time: "10:30", amount: "-$12,500.00", isPositive: false, ref: "MB-TX-99281", method: "Savings Account •••• 1290", status: "Completed" },
      { id: 'tx-init-2', accId: 'savings', title: "Stock Dividend", category: "Investment", date: "Oct 20, 2023", time: "09:00", amount: "+$4,200.00", isPositive: true, ref: "MB-TX-88122", method: "Savings Account •••• 1290", status: "Completed" },
      { id: 'tx-init-3', accId: 'current', title: "Bangkok Real Estate Tax", category: "Government", date: "Oct 22, 2023", time: "13:45", amount: "-฿45,000.00", isPositive: false, ref: "MB-TX-55182", method: "Current Account •••• 8210", status: "Completed" },
      { id: 'tx-init-4', accId: 'savings', title: "Apple Store", category: "Electronics", date: "Oct 24, 2023", time: "15:20", amount: "-$1,200.00", isPositive: false, ref: "MB-TX-11223", method: "Savings Account •••• 1290", status: "Completed" },
      { id: 'tx-init-5', accId: 'current', title: "Salary Deposit", category: "Income", date: "Oct 20, 2023", time: "08:00", amount: "+฿85,000.00", isPositive: true, ref: "MB-TX-44556", method: "Current Account •••• 8210", status: "Completed" },
      { id: 'tx-init-6', accId: 'savings', title: "Netflix Subscription", category: "Entertainment", date: "Oct 15, 2023", time: "00:01", amount: "-$15.99", isPositive: false, ref: "MB-TX-77889", method: "Savings Account •••• 1290", status: "Completed" },
      { id: 'tx-init-7', accId: 'savings', title: "Amazon Web Services", category: "Business", date: "Oct 12, 2023", time: "11:30", amount: "-$450.00", isPositive: false, ref: "MB-TX-33445", method: "Savings Account •••• 1290", status: "Completed" },
      { id: 'tx-init-8', accId: 'current', title: "7-Eleven Store", category: "Food", date: "Oct 11, 2023", time: "18:45", amount: "-฿120.00", isPositive: false, ref: "MB-TX-55667", method: "Current Account •••• 8210", status: "Completed" },
      { id: 'tx-init-9', accId: 'savings', title: "Freelance Project", category: "Income", date: "Oct 05, 2023", time: "14:00", amount: "+$2,500.00", isPositive: true, ref: "MB-TX-99001", method: "Savings Account •••• 1290", status: "Completed" },
    ];
    
    const combined = [...allTx, ...initialTx];
    return combined.filter((tx: any) => tx.accId === accId || (!tx.accId && accId === 'savings')); // Fallback for old tx
  };

  const formatCurrency = (val: number, curr: string) => {
    const symbol = curr === 'USD' ? '$' : '฿';
    return `${symbol}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSendMoney = () => {
    setSendStep(4); // Processing
    setTimeout(() => {
      const amount = parseFloat(sendAmount.replace(/,/g, ''));
      const newTx = {
        id: `tx-${Date.now()}`,
        accId: selectedAccount.id,
        title: recipient,
        category: "Transfer",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        amount: `-${selectedAccount.currency === 'USD' ? '$' : '฿'}${amount.toLocaleString()}`,
        status: "Completed",
        ref: `MB-TX-${Math.floor(Math.random() * 1000000)}`,
        method: `Transfer via ${bankName}`,
        isPositive: false
      };

      // Update Balance
      const updatedAccounts = accounts.map(acc => {
        if (acc.id === selectedAccount.id) {
          return { ...acc, balance: acc.balance - amount - fee };
        }
        return acc;
      });
      
      localStorage.setItem('maybank_accounts', JSON.stringify(updatedAccounts));
      setAccounts(updatedAccounts);
      setSelectedAccount(updatedAccounts.find(a => a.id === selectedAccount.id));

      // Save Transaction
      const existingTx = JSON.parse(localStorage.getItem('maybank_transactions') || '[]');
      localStorage.setItem('maybank_transactions', JSON.stringify([newTx, ...existingTx]));

      setSendStep(5); // Success
    }, 2500);
  };

  const resetSend = () => {
    setShowSendMoney(false);
    setSendStep(1);
    setSendAmount('');
    setRecipient('');
    setBankName('');
    setAccountNumber('');
    setOtp('');
    setPin('');
  };

  return (
    <DashboardLayout>
      <AnimatePresence mode="wait">
        {!selectedAccount ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl lg:text-2xl font-bold text-slate-900">My Accounts</h2>
            </div>

            <div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-2">
              {accounts.map(acc => (
                <AccountCard 
                  key={acc.id}
                  {...acc}
                  onClick={() => setSelectedAccount(acc)}
                />
              ))}
            </div>

            <div className="no-round border border-slate-200 bg-white p-4 lg:p-8">
              <h3 className="text-base lg:text-lg font-bold text-slate-900 mb-4 lg:mb-6">Account Services</h3>
              <div className="grid gap-2 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <ServiceItem label="Order Checkbook" />
                <ServiceItem label="Account Statement" />
                <ServiceItem label="Direct Debit" />
                <ServiceItem label="Tax Certificates" />
                <ServiceItem label="Close Account" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <button 
              onClick={() => setSelectedAccount(null)}
              className="flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-all"
            >
              <ArrowLeft className="h-5 w-5" /> Back to Accounts
            </button>

            <div className="no-round bg-slate-900 p-6 lg:p-10 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-1/3 bg-primary/10 skew-x-12 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 lg:px-3 lg:py-1 bg-primary text-slate-900 text-[8px] lg:text-[10px] font-bold uppercase tracking-widest">{selectedAccount.status}</span>
                  <button 
                    onClick={() => setShowSendMoney(true)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-primary hover:text-slate-900 px-4 py-2 no-round text-xs font-bold transition-all"
                  >
                    <Send className="h-3 w-3" /> Send Money
                  </button>
                </div>
                <h2 className="text-xl lg:text-3xl font-black mt-2 lg:mt-4">{selectedAccount.type}</h2>
                <div className="mt-6 lg:mt-10">
                  <p className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-widest">Available Balance</p>
                  <p className="text-3xl lg:text-6xl font-black text-white mt-1 lg:mt-2">{formatCurrency(selectedAccount.balance, selectedAccount.currency)}</p>
                </div>
                <p className="text-slate-400 font-mono mt-3 lg:mt-4 text-sm lg:text-lg">{selectedAccount.number}</p>
              </div>
            </div>

            <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg lg:text-xl font-bold text-slate-900">Transactions</h3>
                  <div className="flex gap-2">
                    <button className="p-1.5 lg:p-2 border border-slate-200 no-round hover:bg-slate-50 transition-all"><Filter className="h-3.5 w-3.5 lg:h-4 lg:w-4" /></button>
                    <button className="p-1.5 lg:p-2 border border-slate-200 no-round hover:bg-slate-50 transition-all"><Download className="h-3.5 w-3.5 lg:h-4 lg:w-4" /></button>
                  </div>
                </div>

                <div className="no-round border border-slate-200 bg-white overflow-hidden shadow-sm">
                  {getAccountTransactions(selectedAccount.id).map((tx: any) => (
                    <div 
                      key={tx.id} 
                      onClick={() => setSelectedTx(tx)}
                      className="flex items-center justify-between border-b border-slate-100 p-4 lg:p-6 last:border-0 hover:bg-slate-50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className={`h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center no-round ${tx.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {tx.isPositive ? <ArrowDownLeft className="h-5 w-5 lg:h-6 lg:w-6" /> : <ArrowUpRight className="h-5 w-5 lg:h-6 lg:w-6" />}
                        </div>
                        <div className="truncate max-w-[120px] sm:max-w-none">
                          <p className="text-sm lg:text-base font-bold text-slate-900 group-hover:text-primary transition-all truncate">{tx.title}</p>
                          <p className="text-[10px] lg:text-xs font-medium text-slate-400">{tx.category} • {tx.date}</p>
                        </div>
                      </div>
                      <span className={`text-sm lg:text-lg font-black ${tx.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-lg lg:text-xl font-bold text-slate-900">Analysis</h3>
                <div className="no-round border border-slate-200 bg-white p-4 lg:p-6 space-y-4 lg:space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs lg:text-sm font-bold text-slate-500">Monthly Limit</span>
                    <span className="text-xs lg:text-sm font-bold text-slate-900">75% Used</span>
                  </div>
                  <div className="h-1.5 lg:h-2 bg-slate-100 no-round overflow-hidden">
                    <div className="h-full bg-primary w-3/4" />
                  </div>
                  <div className="space-y-3 lg:space-y-4 pt-2 lg:pt-4">
                    <AnalysisItem label="Business" value={selectedAccount.currency === 'USD' ? '$12,000.00' : '฿120,000.00'} />
                    <AnalysisItem label="Lifestyle" value={selectedAccount.currency === 'USD' ? '$4,500.00' : '฿45,000.00'} />
                    <AnalysisItem label="Others" value={selectedAccount.currency === 'USD' ? '$1,250.00' : '฿12,500.00'} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Send Money Modal */}
      <AnimatePresence>
        {showSendMoney && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetSend}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white p-8 no-round shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button 
                onClick={resetSend}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>

              {sendStep === 1 && (
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6">Send Money</h3>
                  <p className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">From: {selectedAccount.type}</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Bank Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          value={bankName}
                          onChange={(e) => handleLetterInput(e, setBankName)}
                          placeholder="e.g. May Bank, SCB, KBank"
                          className="w-full border border-slate-200 py-3 pl-10 pr-4 no-round text-sm font-bold outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Account Number</label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          value={accountNumber}
                          onChange={(e) => handleNumberInput(e, setAccountNumber)}
                          placeholder="000-0-00000-0"
                          className="w-full border border-slate-200 py-3 pl-10 pr-4 no-round text-sm font-bold outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Recipient Name</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          value={recipient}
                          onChange={(e) => handleLetterInput(e, setRecipient)}
                          placeholder="Enter recipient name"
                          className="w-full border border-slate-200 py-3 pl-10 pr-4 no-round text-sm font-bold outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Amount ({selectedAccount.currency})</label>
                      <input 
                        type="text" 
                        value={sendAmount}
                        onChange={(e) => handleNumberInput(e, setSendAmount, true)}
                        placeholder="0.00"
                        className="w-full border border-slate-200 py-4 px-4 no-round text-2xl font-black outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => setSendStep(2)}
                    disabled={!recipient || !sendAmount || !bankName || !accountNumber}
                    className="no-round mt-8 w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              )}

              {sendStep === 2 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-slate-100 text-slate-900 no-round">
                      <Lock className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Transaction PIN</h3>
                    <p className="text-sm text-slate-500 mt-2">Enter your 4-digit transaction PIN to authorize this transfer.</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Enter PIN</label>
                      <OTPInput length={4} value={pin} onChange={setPin} />
                    </div>
                    <button 
                      onClick={() => setSendStep(3)}
                      disabled={pin.length < 4}
                      className="no-round w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all disabled:opacity-50"
                    >
                      Verify PIN
                    </button>
                  </div>
                </div>
              )}

              {sendStep === 3 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-slate-100 text-slate-900 no-round">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Security Verification</h3>
                    <p className="text-sm text-slate-500 mt-2">We've sent a 6-digit OTP to your email to confirm this transaction.</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Enter OTP</label>
                      <OTPInput value={otp} onChange={setOtp} />
                    </div>
                    <button 
                      onClick={handleSendMoney}
                      disabled={otp.length < 6}
                      className="no-round w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all disabled:opacity-50"
                    >
                      Verify & Send
                    </button>
                  </div>
                </div>
              )}

              {sendStep === 4 && (
                <div className="text-center py-8">
                  <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-slate-900">Processing Transaction</h3>
                  <p className="text-sm text-slate-500 mt-2">Securing your transfer to {recipient}...</p>
                </div>
              )}

              {sendStep === 5 && (
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-green-100 text-green-600 no-round">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Transfer Successful</h3>
                  <p className="mt-4 text-slate-600">You have successfully sent <span className="font-bold text-slate-900">{selectedAccount.currency === 'USD' ? '$' : '฿'}{parseFloat(sendAmount).toLocaleString()}</span> to <span className="font-bold text-slate-900">{recipient}</span>.</p>
                  <button 
                    onClick={resetSend}
                    className="no-round mt-8 w-full bg-primary py-4 font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
    </DashboardLayout>
  );
}

function AnalysisItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between text-[10px] lg:text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function AccountCard({ type, number, balance, currency, status, onClick }: any) {
  const formatCurrency = (val: number, curr: string) => {
    const symbol = curr === 'USD' ? '$' : '฿';
    return `${symbol}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div 
      onClick={onClick}
      className="no-round border border-slate-200 bg-slate-900 p-6 lg:p-8 hover:border-primary transition-all group cursor-pointer relative overflow-hidden text-white shadow-xl"
    >
      <div className="absolute -right-10 -top-10 h-32 lg:h-48 w-32 lg:w-48 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all" />
      
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 lg:h-12 lg:w-12 bg-primary/20 flex items-center justify-center text-primary">
              <Wallet className="h-5 w-5 lg:h-6 lg:w-6" />
            </div>
            <div>
              <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-60">{type}</p>
              <Logo light className="scale-75 origin-left mt-1" />
            </div>
          </div>
          <span className="px-2 py-0.5 lg:px-3 lg:py-1 bg-primary text-slate-900 text-[10px] lg:text-xs font-bold uppercase tracking-widest">{status}</span>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">Available Balance</p>
          <p className="text-2xl lg:text-4xl font-black text-white">{formatCurrency(balance, currency)}</p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[8px] lg:text-[10px] uppercase opacity-60">Account Number</p>
            <p className="text-sm lg:text-lg font-bold font-mono">{number}</p>
          </div>
          <div className="h-8 w-8 lg:h-10 lg:w-10 bg-primary text-slate-900 flex items-center justify-center group-hover:bg-white transition-all">
            <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceItem({ label }: { label: string }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleClick = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      setTimeout(() => setIsDone(false), 3000);
    }, 2000);
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isProcessing}
      className="flex items-center justify-between p-4 border border-slate-100 hover:border-primary hover:bg-slate-50 transition-all text-left group"
    >
      <span className="font-bold text-slate-700">{label}</span>
      {isProcessing ? (
        <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      ) : isDone ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-all" />
      )}
    </button>
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
