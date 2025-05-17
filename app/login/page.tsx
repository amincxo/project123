import Exbutton from '@/components/shared/ExButton'
import ExInput from '@/components/shared/ExInput'
import Logo from '@/components/shared/Logo'
import React from 'react'

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <Logo  />
          <h3 className="mt-4 text-xl font-bold text-gray-800">ورود | ثبت نام</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-right">سلام!</p>
          <p className="text-gray-600 text-right">لطفا شماره موبایل خود را وارد کنید.</p>
          
          <ExInput 
            placeholder="شماره موبایل"
            type="tel"
            logo="/images/call.png"
            className="w-full"
          />
          <Exbutton
            title='ورود'
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage