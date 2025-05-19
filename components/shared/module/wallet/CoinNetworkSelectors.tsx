'use client';

import { ChangeEvent } from 'react';

interface CoinNetworkSelectorsProps {
  coinOptions: {
    value: string;
    label: string;
    logo: string;
  }[];
  networkOptions: {
    value: string;
    label: string;
  }[];
  formData: {
    coin: string;
    network: string;
  };
  isLoading: boolean;
  error: Error | null;
  onCoinChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onNetworkChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onRetry: () => void;
}

const CoinNetworkSelectors = ({
  coinOptions,
  networkOptions,
  formData,
  isLoading,
  error,
  onCoinChange,
  onNetworkChange,
  onRetry
}: CoinNetworkSelectorsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 mb-1">ارز</label>
        <select
          name="coin"
          value={formData.coin}
          onChange={onCoinChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          disabled={isLoading || !!error}
        >
          {isLoading ? (
            <option value="">در حال دریافت لیست ارزها...</option>
          ) : error ? (
            <option value="">خطا در دریافت ارزها</option>
          ) : (
            <>
              <option value="">انتخاب ارز</option>
              {coinOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
        {error && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-1 text-xs text-blue-500 hover:text-blue-700"
          >
            تلاش مجدد
          </button>
        )}
      </div>

      <div>
        <label className="block text-gray-700 mb-1">شبکه</label>
        <select
          name="network"
          value={formData.network}
          onChange={onNetworkChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          disabled={isLoading || !!error || !formData.coin}
        >
          {isLoading ? (
            <option value="">در حال دریافت لیست شبکه‌ها...</option>
          ) : error ? (
            <option value="">خطا در دریافت شبکه‌ها</option>
          ) : !formData.coin ? (
            <option value="">ابتدا ارز را انتخاب کنید</option>
          ) : networkOptions.length === 0 ? (
            <option value="">شبکه‌ای برای این ارز یافت نشد</option>
          ) : (
            <>
              <option value="">انتخاب شبکه</option>
              {networkOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
    </div>
  );
};

export default CoinNetworkSelectors;