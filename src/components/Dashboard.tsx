import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  TrendingUp,
  Plus,
  Send,
  Search,
  X,
  CheckCircle2,
  ChevronRight,
  Building2,
  Hash,
  ShieldCheck,
  Smartphone,
  Droplets,
  Zap,
  Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import DashboardLayout from './DashboardLayout';
import { handleNumberInput, handleLetterInput } from '../lib/utils';
import OTPInput from './ui/OTPInput';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<'USD' | 'THB'>('USD');
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [showPayBill, setShowPayBill] = useState(false);
  const [sendStep, setSendStep] = useState(1);
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedSourceAccount, setSelectedSourceAccount] = useState('savings');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [fee, setFee] = useState(0);
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [billStep, setBillStep] = useState(1);
  const [transactions, setTransactions] = useState([
    { id: 'tx1', title: "Apple Store", category: "Electronics", date: "Oct 24, 2023", amount: "-$45,900.00", isPositive: false },
    { id: 'tx2', title: "Salary Deposit", category: "Income", date: "Oct 20, 2023", amount: "+$85,000.00", isPositive: true },
    { id: 'tx3', title: "Amazon Web Services", category: "Business", date: "Oct 19, 2023", amount: "-$12,400.00", isPositive: false },
    { id: 'tx4', title: "Stripe Payout", category: "Business", date: "Oct 18, 2023", amount: "+$25,000.00", isPositive: true },
    { id: 'tx5', title: "Netflix Subscription", category: "Entertainment", date: "Oct 15, 2023", amount: "-$15.99", isPositive: false },
    { id: 'tx6', title: "Starbucks Coffee", category: "Food & Drink", date: "Oct 14, 2023", amount: "-$5.50", isPositive: false },
    { id: 'tx7', title: "Freelance Payment", category: "Income", date: "Oct 12, 2023", amount: "+$1,200.00", isPositive: true },
    { id: 'tx8', title: "Electric Bill", category: "Utilities", date: "Oct 10, 2023", amount: "-$120.00", isPositive: false },
  ]);
  const [totalBalance, setTotalBalance] = useState(2450500.00);

  const exchangeRate = 35.5; // 1 USD = 35.5 THB

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('maybank_transactions') || '[]');
    if (saved.length > 0) {
      setTransactions(prev => {
        const filteredSaved = saved.filter((s: any) => !prev.find(p => p.id === s.id));
        return [...filteredSaved, ...prev];
      });
    }

    const savedAccounts = JSON.parse(localStorage.getItem('maybank_accounts') || '[]');
    if (savedAccounts.length > 0) {
      const total = savedAccounts.reduce((acc: number, curr: any) => {
        if (curr.currency === 'USD') return acc + curr.balance;
        return acc + (curr.balance / exchangeRate);
      }, 0);
      setTotalBalance(total);
    }
  }, []);

  useEffect(() => {
    if (bankName && bankName.toLowerCase() !== 'may bank') {
      setFee(currency === 'USD' ? 1.00 : 35.00);
    } else {
      setFee(0);
    }
  }, [bankName, currency]);

  const formatValue = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `฿${(val * exchangeRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const saveTransaction = (tx: any) => {
    const existing = JSON.parse(localStorage.getItem('maybank_transactions') || '[]');
    const updated = [tx, ...existing];
    localStorage.setItem('maybank_transactions', JSON.stringify(updated));
    setTransactions(prev => [tx, ...prev]);
  };

  const handleSendMoney = () => {
    setSendStep(4); // Processing
    setTimeout(() => {
      const amount = parseFloat(sendAmount.replace(/,/g, ''));
      const savedAccounts = JSON.parse(localStorage.getItem('maybank_accounts') || '[]');
      const sourceAcc = savedAccounts.find((a: any) => a.id === selectedSourceAccount) || savedAccounts[0];
      
      const newTx = {
        id: `tx-${Date.now()}`,
        accId: selectedSourceAccount,
        title: recipient,
        category: "Transfer",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        amount: `-${sourceAcc.currency === 'USD' ? '$' : '฿'}${amount.toLocaleString()}`,
        status: "Completed",
        ref: `MB-TX-${Math.floor(Math.random() * 1000000)}`,
        method: `Transfer via ${bankName}`,
        isPositive: false
      };
      
      // Update Balance in shared state
      const updatedAccounts = savedAccounts.map((acc: any) => {
        if (acc.id === selectedSourceAccount) {
          const deductAmount = sourceAcc.currency === currency ? amount : (currency === 'USD' ? amount * exchangeRate : amount / exchangeRate);
          return { ...acc, balance: acc.balance - deductAmount - (fee / (sourceAcc.currency === 'USD' ? 1 : exchangeRate)) };
        }
        return acc;
      });
      localStorage.setItem('maybank_accounts', JSON.stringify(updatedAccounts));
      
      // Update local total balance
      const total = updatedAccounts.reduce((acc: number, curr: any) => {
        if (curr.currency === 'USD') return acc + curr.balance;
        return acc + (curr.balance / exchangeRate);
      }, 0);
      setTotalBalance(total);

      saveTransaction(newTx);
      setSendStep(5); // Success
    }, 2500);
  };

  const handlePayBill = () => {
    setBillStep(3); // Processing
    setTimeout(() => {
      const amount = parseFloat(sendAmount.replace(/,/g, ''));
      const savedAccounts = JSON.parse(localStorage.getItem('maybank_accounts') || '[]');
      const sourceAcc = savedAccounts.find((a: any) => a.id === selectedSourceAccount) || savedAccounts[0];

      const newTx = {
        id: `tx-bill-${Date.now()}`,
        accId: selectedSourceAccount,
        title: selectedBill.name,
        category: "Bills",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        amount: `-${sourceAcc.currency === 'USD' ? '$' : '฿'}${amount.toLocaleString()}`,
        status: "Completed",
        ref: `MB-BILL-${Math.floor(Math.random() * 1000000)}`,
        method: "Bill Payment",
        isPositive: false
      };

      // Update Balance in shared state
      const updatedAccounts = savedAccounts.map((acc: any) => {
        if (acc.id === selectedSourceAccount) {
          const deductAmount = sourceAcc.currency === currency ? amount : (currency === 'USD' ? amount * exchangeRate : amount / exchangeRate);
          return { ...acc, balance: acc.balance - deductAmount };
        }
        return acc;
      });
      localStorage.setItem('maybank_accounts', JSON.stringify(updatedAccounts));
      
      // Update local total balance
      const total = updatedAccounts.reduce((acc: number, curr: any) => {
        if (curr.currency === 'USD') return acc + curr.balance;
        return acc + (curr.balance / exchangeRate);
      }, 0);
      setTotalBalance(total);

      saveTransaction(newTx);
      setBillStep(4); // Success
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

  const resetBill = () => {
    setShowPayBill(false);
    setBillStep(1);
    setSelectedBill(null);
    setSendAmount('');
    setOtp('');
    setPin('');
  };

  const bills = [
    { id: 'elec', name: 'Electricity (MEA)', icon: <Zap className="text-yellow-500" />, fee: 0 },
    { id: 'water', name: 'Water (MWA)', icon: <Droplets className="text-blue-500" />, fee: 0 },
    { id: 'internet', name: 'True Internet', icon: <Globe className="text-red-500" />, fee: 15 },
    { id: 'mobile', name: 'AIS Mobile', icon: <Smartphone className="text-green-500" />, fee: 0 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">
        {/* Header with Currency Switcher */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl font-black text-slate-900">Overview</h2>
          <div className="flex bg-slate-100 p-1 no-round border border-slate-200">
            <button 
              onClick={() => setCurrency('USD')}
              className={`px-2 lg:px-4 py-1 text-[10px] lg:text-xs font-bold transition-all ${currency === 'USD' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              USD
            </button>
            <button 
              onClick={() => setCurrency('THB')}
              className={`px-2 lg:px-4 py-1 text-[10px] lg:text-xs font-bold transition-all ${currency === 'THB' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              THB
            </button>
          </div>
        </div>

        {/* Stats Grid - Only show total balance on mobile with beautiful design */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="col-span-1 lg:col-span-1">
            <StatCard 
              title="Total Balance" 
              amount={formatValue(totalBalance)} 
              change="+2.5%" 
              trend="up"
              icon={<Wallet className="h-5 w-5 lg:h-5 lg:w-5 text-blue-500" />}
              isMain
            />
          </div>
          <div className="hidden lg:block">
            <StatCard 
              title="Income" 
              amount={formatValue(85000.00)} 
              change="+12.3%" 
              trend="up"
              icon={<ArrowDownLeft className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />}
            />
          </div>
          <div className="hidden lg:block">
            <StatCard 
              title="Expenses" 
              amount={formatValue(32400.00)} 
              change="-4.1%" 
              trend="down"
              icon={<ArrowUpRight className="h-4 w-4 lg:h-5 lg:w-5 text-red-500" />}
            />
          </div>
        </div>

        {/* Horizontal Quick Actions Directly Under Stats - 2 rows on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
          <QuickAction icon={<Send className="h-4 w-4 lg:h-5 lg:w-5" />} label="Send" onClick={() => setShowSendMoney(true)} primary />
          <QuickAction icon={<ArrowDownLeft className="h-4 w-4 lg:h-5 lg:w-5" />} label="Request" />
          <QuickAction icon={<CreditCard className="h-4 w-4 lg:h-5 lg:w-5" />} label="Pay Bill" onClick={() => setShowPayBill(true)} />
          <QuickAction icon={<TrendingUp className="h-4 w-4 lg:h-5 lg:w-5" />} label="Invest" onClick={() => navigate('/dashboard/investments')} />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
              <Link to="/dashboard/transactions" className="text-sm font-bold text-primary hover:underline">View All</Link>
            </div>
            
            <div className="no-round border border-slate-200 bg-white overflow-hidden shadow-sm">
              {transactions.slice(0, 5).map(tx => (
                <TransactionItem 
                  key={tx.id}
                  title={tx.title} 
                  category={tx.category} 
                  date={tx.date} 
                  amount={tx.amount} 
                  isPositive={tx.isPositive}
                />
              ))}
              {transactions.length === 0 && (
                <div className="p-8 text-center text-slate-400 font-bold">
                  No recent transactions
                </div>
              )}
            </div>
          </div>

          {/* My Cards */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">My Cards</h2>
              <Link to="/dashboard/cards" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                <Plus className="h-3 w-3" /> Add New
              </Link>
            </div>
            
            <div className="relative h-48 w-full overflow-hidden no-round bg-slate-900 p-6 text-white shadow-xl group cursor-pointer">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">Platinum Debit</span>
                  <Logo light className="scale-75 origin-right" />
                </div>
                <div className="text-xl font-bold tracking-[0.2em]">•••• •••• •••• 4290</div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase opacity-60">Card Holder</p>
                    <p className="text-sm font-bold">JOHN DOE</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase opacity-60">Expires</p>
                    <p className="text-sm font-bold">12/28</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="no-round border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Upcoming Payments</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-slate-100 flex items-center justify-center no-round text-slate-900">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Mortgage</p>
                      <p className="text-[10px] text-slate-400">Due in 3 days</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-900">$2,400.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">From Account</label>
                      <select 
                        value={selectedSourceAccount}
                        onChange={(e) => setSelectedSourceAccount(e.target.value)}
                        className="w-full border border-slate-200 py-3 px-4 no-round text-sm font-bold outline-none focus:border-primary bg-white appearance-none"
                      >
                        <option value="savings">Savings Account (USD)</option>
                        <option value="current">Current Account (THB)</option>
                      </select>
                    </div>
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
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Amount ({currency})</label>
                      <input 
                        type="text" 
                        value={sendAmount}
                        onChange={(e) => handleNumberInput(e, setSendAmount, true)}
                        placeholder="0.00"
                        className="w-full border border-slate-200 py-4 px-4 no-round text-2xl font-black outline-none focus:border-primary"
                      />
                    </div>
                    <div className="p-4 bg-slate-50 no-round border border-slate-100">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-400">Transaction Fee</span>
                        <span className={fee > 0 ? 'text-red-500' : 'text-green-500'}>
                          {fee > 0 ? formatValue(fee / (currency === 'USD' ? 1 : exchangeRate)) : 'FREE'}
                        </span>
                      </div>
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
                    <p className="text-center text-xs font-bold text-slate-400">
                      Didn't receive code? <button className="text-primary hover:underline">Resend OTP</button>
                    </p>
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
                  <p className="mt-4 text-slate-600">You have successfully sent <span className="font-bold text-slate-900">{currency === 'USD' ? '$' : '฿'}{parseFloat(sendAmount).toLocaleString()}</span> to <span className="font-bold text-slate-900">{recipient}</span>.</p>
                  <div className="mt-8 p-4 border border-slate-100 bg-slate-50 no-round text-left">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-400">Reference ID</span>
                      <span className="font-bold text-slate-900">MB-TX-{Math.floor(Math.random() * 1000000)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Date</span>
                      <span className="font-bold text-slate-900">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
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

      {/* Pay Bill Modal */}
      <AnimatePresence>
        {showPayBill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetBill}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white p-8 no-round shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button 
                onClick={resetBill}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>

              {billStep === 1 && !selectedBill && (
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6">Pay Bill</h3>
                  <div className="grid gap-4">
                    {bills.map(bill => (
                      <button 
                        key={bill.id}
                        onClick={() => setSelectedBill(bill)}
                        className="flex items-center justify-between p-4 border border-slate-100 hover:border-primary hover:bg-slate-50 transition-all no-round group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-white flex items-center justify-center no-round shadow-sm group-hover:bg-primary transition-all">
                            {bill.icon}
                          </div>
                          <span className="font-bold text-slate-900">{bill.name}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-slate-900" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {billStep === 1 && selectedBill && (
                <div>
                  <button onClick={() => setSelectedBill(null)} className="mb-4 flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900">
                    <ArrowDownLeft className="h-3 w-3 rotate-45" /> Back to List
                  </button>
                  <h3 className="text-2xl font-black text-slate-900 mb-6">Pay {selectedBill.name}</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">From Account</label>
                      <select 
                        value={selectedSourceAccount}
                        onChange={(e) => setSelectedSourceAccount(e.target.value)}
                        className="w-full border border-slate-200 py-3 px-4 no-round text-sm font-bold outline-none focus:border-primary bg-white appearance-none"
                      >
                        <option value="savings">Savings Account (USD)</option>
                        <option value="current">Current Account (THB)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Reference Number</label>
                      <input 
                        type="text" 
                        placeholder="Enter bill reference"
                        onChange={(e) => handleNumberInput(e, (val) => {})} // Just validate, don't need state for ref here based on current code
                        className="w-full border border-slate-200 py-3 px-4 no-round text-sm font-bold outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Amount ({currency})</label>
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
                    onClick={() => setBillStep(2)}
                    disabled={!sendAmount}
                    className="no-round mt-8 w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              )}

              {billStep === 2 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-slate-100 text-slate-900 no-round">
                      <Lock className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Transaction PIN</h3>
                    <p className="text-sm text-slate-500 mt-2">Enter your 4-digit transaction PIN to authorize this payment.</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Enter PIN</label>
                      <OTPInput length={4} value={pin} onChange={setPin} />
                    </div>
                    <button 
                      onClick={() => setBillStep(3)}
                      disabled={pin.length < 4}
                      className="no-round w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all disabled:opacity-50"
                    >
                      Verify & Pay
                    </button>
                  </div>
                </div>
              )}

              {billStep === 3 && (
                <div className="text-center py-8">
                  <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-slate-900">Processing Payment</h3>
                  <p className="text-sm text-slate-500 mt-2">Paying your {selectedBill?.name} bill...</p>
                </div>
              )}

              {billStep === 4 && (
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-green-100 text-green-600 no-round">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Payment Successful</h3>
                  <p className="mt-4 text-slate-600">Your payment to <span className="font-bold text-slate-900">{selectedBill?.name}</span> was successful.</p>
                  <button 
                    onClick={resetBill}
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
    </DashboardLayout>
  );
}

function StatCard({ title, amount, change, trend, icon, isMain = false }: any) {
  return (
    <div className={`no-round border border-slate-200 bg-white p-4 lg:p-6 shadow-sm hover:border-primary transition-all group relative overflow-hidden ${isMain ? 'lg:bg-white' : ''}`}>
      {isMain && (
        <>
          {/* Platinum Card Style for Mobile Main Card */}
          <div className="absolute inset-0 bg-slate-900 lg:hidden" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 lg:hidden blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12 lg:hidden blur-xl" />
        </>
      )}
      <div className="flex items-center justify-between relative z-10">
        <div className={`h-10 w-10 lg:h-10 lg:w-10 bg-slate-50 flex items-center justify-center no-round group-hover:bg-primary transition-all ${isMain ? 'bg-primary/20 lg:bg-primary/10' : ''}`}>
          <div className={isMain ? 'text-primary lg:text-blue-500' : ''}>
            {icon}
          </div>
        </div>
        <span className={`text-[10px] lg:text-xs font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
      <div className="mt-4 lg:mt-4 flex flex-col-reverse lg:flex-col relative z-10">
        <p className={`text-[10px] lg:text-[10px] font-bold uppercase tracking-widest truncate ${isMain ? 'text-slate-400 lg:text-slate-400' : 'text-slate-400'}`}>{title}</p>
        <h3 className={`font-black truncate ${isMain ? 'text-2xl lg:text-2xl text-white lg:text-slate-900' : 'text-xs lg:text-2xl text-slate-900'} mb-1 lg:mb-0 lg:mt-1`}>
          {amount}
        </h3>
      </div>
      {isMain && (
        <div className="mt-4 pt-4 border-t border-white/10 lg:hidden relative z-10 flex justify-between items-center">
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Maybank Platinum</p>
          <div className="h-4 w-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm opacity-50" />
        </div>
      )}
    </div>
  );
}

function TransactionItem({ title, category, date, amount, isPositive = false }: any) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 p-4 last:border-0 hover:bg-slate-50 transition-all">
      <div className="flex items-center gap-4">
        <div className={`h-10 w-10 flex items-center justify-center no-round ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {isPositive ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
        </div>
        <div>
          <p className="font-bold text-slate-900">{title}</p>
          <p className="text-xs font-medium text-slate-400">{category} • {date}</p>
        </div>
      </div>
      <span className={`font-black ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {amount}
      </span>
    </div>
  );
}

function QuickAction({ icon, label, onClick, primary = false }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-2 lg:gap-3 no-round border p-3 lg:p-4 transition-all group ${primary ? 'bg-slate-900 border-slate-900 text-white hover:bg-primary hover:border-primary hover:text-slate-900' : 'bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-slate-900'}`}
    >
      <div className="transition-all">{icon}</div>
      <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
