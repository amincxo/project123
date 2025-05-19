import React from 'react';

interface ExitConfirmationProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ExitConfirmation: React.FC<ExitConfirmationProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center p-6">
      <div className="text-center">
        <h4 className="font-bold text-lg mb-3 text-gray-800">آیا مطمئن هستید؟</h4>
        <p className="mb-4 text-gray-600">تغییرات ذخیره نشده از بین خواهند رفت.</p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            بازگشت
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            بله، خارج شو
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmation;