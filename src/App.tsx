import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setStatus('loading');
    setIsSubmitted(true);
  };

  const handleIframeLoad = () => {
    if (isSubmitted) {
      setStatus('success');
      setName('');
      setPhone('');
      setEmail('');
      setYear('');
      setIsSubmitted(false);
      
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl w-full max-w-md border border-slate-100"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Đăng ký thông tin</h1>
          <p className="text-slate-500 text-sm">Vui lòng điền đầy đủ thông tin dưới đây.</p>
        </div>

        <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }} onLoad={handleIframeLoad}></iframe>
        <form 
          action="https://script.google.com/macros/s/AKfycbyhh8QRYBPsReRHK1U8r0AcquYvcYcC6Oj6DyoGbZgp1LytIue3fu8eFrez77J6EtCMOQ/exec" 
          method="POST" 
          target="hidden_iframe"
          onSubmit={handleFormSubmit} 
          className="space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all bg-slate-50 focus:bg-white"
              placeholder="Nhập họ và tên"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">Số điện thoại <span className="text-red-500">*</span></label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all bg-slate-50 focus:bg-white"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all bg-slate-50 focus:bg-white"
              placeholder="Địa chỉ email"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-slate-700 mb-1.5">Năm sinh <span className="text-red-500">*</span></label>
            <input
              type="number"
              id="year"
              name="year"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all bg-slate-50 focus:bg-white"
              placeholder="VD: 1990"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
              status === 'loading' 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-0.5'
            }`}
          >
            {status === 'loading' ? 'Đang gửi...' : 'Gửi thông tin'}
          </button>

          {/* Status Messages */}
          {status === 'success' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">Gửi thông tin thành công!</p>
            </motion.div>
          )}
          
          {status === 'error' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-3">
              <X className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">Có lỗi xảy ra khi gửi. Vui lòng thử lại sau.</p>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
