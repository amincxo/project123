import React from 'react'
import Logo from './Logo'

function WelomeText(apiError: string | null) {
  return (
    <div>
        <div className="text-center mb-6">
            <Logo />
            <h3 className="mt-4 text-xl text-right font-bold text-gray-800">ورود | ثبت نام</h3>
          </div>
          
          <div className="space-y-4">
            {apiError && (
              <div className="text-red-600 text-right p-2 bg-red-50 rounded">
                {apiError}
              </div>
            )}

            <div>
              <p className="text-gray-600 text-right">سلام!</p>
              <p className="text-gray-600 text-right">لطفا شماره موبایل خود را وارد کنید.</p>
            </div>
          </div>
    </div>
  )
}

export default WelomeText