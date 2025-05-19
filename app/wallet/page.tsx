import React from 'react'
import WalletList from '../../components/WalletList'

function wallets() {
  return (
    <div className='bg-white' >
        <main className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <WalletList />
      </div>
    </main>
    </div>
  )
}

export default wallets