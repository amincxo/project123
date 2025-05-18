import FaqAccordion from '@/components/FaqAccordion'
import Slider from '@/components/shared/Slider'
import UserList from '@/components/UserList'
import React from 'react'

function Home() {
  return (
    <div>
      <Slider />
      <FaqAccordion />
      <UserList />
    </div>
  )
}

export default Home