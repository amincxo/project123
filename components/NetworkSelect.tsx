import React from 'react';

interface NetworkSelectProps {
  products: {
    _id: string;
    symbol: string;
    buy_from_iranicard_network_list: {
      network: string;
      name: string;
    }[];
  }[];
  selectedNetwork: string;
  onChange: (network: string) => void;
  isLoading: boolean;
  error: Error | null;
}

const NetworkSelect: React.FC<NetworkSelectProps> = ({ 
  products, 
  selectedNetwork, 
  onChange, 
  isLoading, 
  error 
}) => {
  // استخراج تمام شبکه‌های منحصر به فرد از محصولات
  const allNetworks = Array.from(
    new Set(
      products.flatMap(product => 
        product.buy_from_iranicard_network_list.map(network => network.network)
      )
    )
  );

  return (
    <div>
      <label className="block text-gray-700 mb-1">شبکه</label>
      <select
        value={selectedNetwork}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
        disabled={isLoading || !!error}
      >
        {isLoading ? (
          <option value="">در حال دریافت لیست شبکه‌ها...</option>
        ) : error ? (
          <option value="">خطا در دریافت شبکه‌ها</option>
        ) : (
          <>
            <option value="">انتخاب شبکه</option>
            {allNetworks.map(network => (
              <option key={network} value={network}>
                {network}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default NetworkSelect;