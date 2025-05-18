type Wallet = {
  _id: string;
  title: string;
  user_id: string;
  symbol: string;
  network: string;
  address: string;
  memo: string | null;
  updated_at: string;
  created_at: string;
};

type ApiResponse = {
  status: 'success' | 'error';
  status_code: number;
  data: Wallet[];
};

export const getAllWallets = async (): Promise<ApiResponse> => {
  const response = await fetch('https://api.irxe.com/api/modules/crypto/v1/client/getAllWallets', {
    method: 'GET',
    credentials: 'include', // این خط باعث ارسال خودکار کوکی‌ها می‌شود
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized - Please login again');
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};