'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface AddWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddWalletModal = ({ isOpen, onClose, onSuccess }: AddWalletModalProps) => {
  const [formData, setFormData] = useState({
    address: '',
    memo: '',
    network: 'XRP',
    symbol: 'XRP',
    title: ''
  });
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const addWalletMutation = useMutation({
    mutationFn: async (walletData: typeof formData) => {
      const response = await fetch('https://api.irxe.com/api/modules/crypto/v1/client/addWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(walletData)
      });

      if (!response.ok) {
        throw new Error('افزودن کیف پول ناموفق بود');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('کیف پول با موفقیت اضافه شد');
      onSuccess();
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWalletMutation.mutate(formData);
  };

  const handleClose = () => {
    if (Object.values(formData).some(value => value !== '')) {
      setShowExitConfirm(true);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">افزودن کیف پول جدید</h3>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">عنوان کیف پول</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="مثبت: کیف پول اصلی"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">شبکه</label>
              <select
                name="network"
                value={formData.network}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="XRP">XRP</option>
                <option value="BTC">Bitcoin</option>
                <option value="ETH">Ethereum</option>
                <option value="TRX">Tron</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">نماد</label>
              <select
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="XRP">XRP</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="TRX">TRX</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">آدرس کیف پول</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="مثال: DFGSDFG..."
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">یادداشت (اختیاری)</label>
            <input
              type="text"
              name="memo"
              value={formData.memo}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="مثال: SDFSDF..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={addWalletMutation.isPending}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors disabled:opacity-70"
            >
              {addWalletMutation.isPending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال ذخیره...
                </span>
              ) : 'ذخیره کیف پول'}
            </button>
          </div>
        </form>

        {/* تاییدیه خروج */}
        {showExitConfirm && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center p-6">
            <div className="text-center">
              <h4 className="font-bold text-lg mb-3 text-gray-800">آیا مطمئن هستید؟</h4>
              <p className="mb-4 text-gray-600">تغییرات ذخیره نشده از بین خواهند رفت.</p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  بازگشت
                </button>
                <button
                  onClick={() => {
                    setShowExitConfirm(false);
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  بله، خارج شو
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddWalletModal;