import React from 'react';

interface SymbolSelectProps {
  products: {
    _id: string;
    symbol: string;
    name: string;
    buy_from_iranicard_network_list: {
      network: string;
      name: string;
    }[];
  }[];
  selectedNetwork: string;
  selectedSymbol: string;
  onChange: (symbol: string) => void;
  isLoading: boolean;
  error: Error | null;
}

const SymbolSelect: React.FC<SymbolSelectProps> = ({ 
  products, 
  selectedNetwork, 
  selectedSymbol, 
  onChange, 
  isLoading,
  error
}) => {
  // فیلتر کردن نمادها بر اساس شبکه انتخابی
  const filteredSymbols = selectedNetwork
    ? products.filter(product => 
        product.buy_from_iranicard_network_list.some(
          network => network.network === selectedNetwork
        )
      )
    : [];

  return (
    <div>
      <label className="block text-gray-700 mb-1">نماد</label>
      <select
        value={selectedSymbol}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
        disabled={isLoading || !!error || !selectedNetwork}
      >
        {isLoading ? (
          <option value="">در حال دریافت لیست نمادها...</option>
        ) : error ? (
          <option value="">خطا در دریافت نمادها</option>
        ) : !selectedNetwork ? (
          <option value="">ابتدا شبکه را انتخاب کنید</option>
        ) : filteredSymbols.length === 0 ? (
          <option value="">نمادی برای این شبکه یافت نشد</option>
        ) : (
          <>
            <option value="">انتخاب نماد</option>
            {filteredSymbols.map(product => (
              <option key={product._id} value={product.symbol}>
                {product.symbol} - {product.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default SymbolSelect;