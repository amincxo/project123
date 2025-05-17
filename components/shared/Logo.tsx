import React from 'react'
import Image from 'next/image'

function Logo() {
  return (
    <div className="mx-auto w-32 h-auto" >
        <Image src="/images/iranExchaneLogo.png" alt='لوگو سایت' width={500} height={500} />
    </div>
  )
}

export default Logo