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
  try {
    const response = await fetch('https://api.irxe.com/api/modules/crypto/v1/client/getAllWallets');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching wallets:', error);
    throw error;
  }
};