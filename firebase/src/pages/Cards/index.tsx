import React from 'react'
import FoodDetails from '@/Components/cards/foodDetails'
import Header from '@/Components/Header'

const index = () => {
  return (
    <div className='p-1 h-screen'>
      <Header FoodItems={[]}/>
        <FoodDetails/>
        
    </div>
  )
}

export default index