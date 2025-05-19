'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ConfirmationModal from './shared/module/wallet/ConfirmationModal';
import FormFooter from './shared/module/wallet/FormFooter';
import CoinNetworkSelectors from './shared/module/wallet/CoinNetworkSelectors';

interface AddWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isMobile?: boolean;
}

interface Network {
  network: string;
  name: string;
  addressRegex: string;
  coin: string;
}

interface Product {
  _id: string;
  name: string;
  symbol: string;
  logo: string;
  buy_from_iranicard_network_list: Network[];
}

interface CoinOption {
  value: string;
  label: string;
  logo: string;
}

interface NetworkOption {
  value: string;
  label: string;
  regex: RegExp;
}

const debounce = <T extends (...args: string[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const AddWalletModal = ({ isOpen, onClose, onSuccess, isMobile = false }: AddWalletModalProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    address: '',
    memo: '',
    coin: '',
    network: '',
    title: ''
  });
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationState, setValidationState] = useState<'empty' | 'validating' | 'invalid' | 'valid'>('empty');

  const debouncedRef = useRef<((address: string) => void) | undefined>(undefined);


  const { data: products, isLoading, error, refetch } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('https://api.irxe.com/api/public/modules/crypto/v1/client/listProduct');
      if (!response.ok) throw new Error('خطا در دریافت لیست محصولات');
      const data = await response.json();
      if (!data?.data || !Array.isArray(data.data)) throw new Error('فرمت داده دریافتی نامعتبر است');
      return data.data;
    },
    retry: 3,
    retryDelay: 1000
  });

  const coinOptions: CoinOption[] = products
    ? products.map(product => ({
        value: product.symbol,
        label: `${product.name} (${product.symbol})`,
        logo: product.logo
      }))
    : [];

  const networkOptions = useMemo<NetworkOption[]>(() => {
    if (!formData.coin || !products) return [];
    const product = products.find(p => p.symbol === formData.coin);
    if (!product) return [];
    return product.buy_from_iranicard_network_list.map(network => ({
      value: network.network,
      label: network.name,
      regex: new RegExp(network.addressRegex)
    }));
  }, [formData.coin, products]);


  useEffect(() => {
    debouncedRef.current = debounce(async (address: string) => {
      if (!formData.network || !address) {
        setAddressError('');
        setIsValidating(false);
        setValidationState('empty');
        return;
      }

      setIsValidating(true);
      setValidationState('validating');

      try {
        const selectedNetwork = networkOptions.find(n => n.value === formData.network);
        if (!selectedNetwork) {
          setAddressError('شبکه انتخاب شده نامعتبر است');
          setValidationState('invalid');
          return;
        }

        const isValid = selectedNetwork.regex.test(address);
        setAddressError(isValid ? '' : 'آدرس ولت نامعتبر است');
        setValidationState(isValid ? 'valid' : 'invalid');
      } finally {
        setIsValidating(false);
      }
    }, 1500);
  }, [formData.network, networkOptions]);

  useEffect(() => {
    if (formData.address && debouncedRef.current) {
      debouncedRef.current(formData.address);
    }
  }, [formData.address, formData.network]);

  const addWalletMutation = useMutation({
    mutationFn: async (walletData: typeof formData) => {
      if (isValidating) throw new Error('لطفا صبر کنید تا آدرس بررسی شود');
      if (validationState === 'invalid') throw new Error('آدرس ولت نامعتبر است');

      const response = await fetch('https://api.irxe.com/api/modules/crypto/v1/client/saveWallet/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          address: walletData.address,
          memo: walletData.memo,
          network: walletData.network,
          symbol: walletData.coin,
          title: walletData.title
        })
      });

      if (!response.ok) throw new Error('افزودن کیف پول ناموفق بود');
      return response.json();
    },
    onSuccess: () => {
      toast.success('کیف پول با موفقیت اضافه شد');
      onSuccess();
      if (isMobile) {
        router.back();
      } else {
        onClose();
      }
    },

    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, coin: e.target.value, network: '' }));
  };

  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, network: e.target.value }));
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

  const handleRetry = () => {
    refetch();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 ${isMobile ? 'bg-white' : 'bg-black/30 backdrop-blur-sm'} flex items-center justify-center z-50 p-4`}>
      <div className={`${isMobile ? 'w-full h-full' : 'w-full max-w-md'} bg-white rounded-2xl p-6 shadow-xl relative`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">افزودن کیف پول جدید</h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
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
              placeholder="مثال: کیف پول شرکت"
              required
            />
          </div>

          <CoinNetworkSelectors
            coinOptions={coinOptions}
            networkOptions={networkOptions}
            formData={formData}
            isLoading={isLoading}
            error={error}
            onCoinChange={handleCoinChange}
            onNetworkChange={handleNetworkChange}
            onRetry={handleRetry}
          />

          <div>
            <label className="block text-gray-700 mb-1">آدرس کیف پول</label>
            <div className="relative">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  validationState === 'invalid' ? 'border-red-500' :
                  validationState === 'validating' ? 'border-yellow-500' :
                  validationState === 'valid' ? 'border-green-500' :
                  'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="مثال: C7b098defB751B7401B5f6d8"
                required
              />
              {validationState === 'validating' && (
                <div className="absolute left-3 top-2.5">
                  <svg className="animate-spin h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
              {validationState === 'valid' && (
                <div className="absolute left-3 top-2.5 text-green-500">✓</div>
              )}
            </div>
            {validationState === 'validating' && <p className="mt-1 text-sm text-yellow-500">در حال بررسی آدرس...</p>}
            {validationState === 'invalid' && <p className="mt-1 text-sm text-red-500">{addressError}</p>}
            {validationState === 'valid' && <p className="mt-1 text-sm text-green-500">آدرس معتبر است</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">یادداشت (اختیاری)</label>
            <input
              type="text"
              name="memo"
              value={formData.memo}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="مثال: برای پرداخت های شرکت"
            />
          </div>

          <FormFooter
            isMobile={isMobile}
            onCancel={!isMobile ? handleClose : undefined}
            onSubmit={handleSubmit}
            submitText="ذخیره کیف پول"
            isSubmitting={addWalletMutation.isPending}
            isDisabled={isLoading || !!error || validationState === 'invalid' || validationState === 'validating'}
          />
        </form>

        <ConfirmationModal
          isOpen={showExitConfirm}
          title="آیا مطمئن هستید؟"
          message="تغییرات ذخیره نشده از بین خواهند رفت."
          onConfirm={() => {
            setShowExitConfirm(false);
            onClose();
          }}
          onCancel={() => setShowExitConfirm(false)}
        />
      </div>
    </div>
  );
};

export default AddWalletModal;
