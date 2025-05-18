import React from 'react'
import WalletList from '../../components/WalletList'

function wallets() {
  return (
    <div>
        <main className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Crypto Wallets Management
        </h1>
        <WalletList />
      </div>
    </main>
    </div>
  )
}

export default wallets