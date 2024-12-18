import React from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
  
  return (
    <div className='flex flex-col gap-4'>
      <CategoryCard imageUrl={'/push.png'} title='Push'  muscleGroups={['Chest', 'Shoulder','Triceps']} />
      <CategoryCard imageUrl={'/push.png'} title='Push' muscleGroups={['Chest', 'Shoulder','Triceps']} />
      <CategoryCard imageUrl={'/push.png'} title='Push' muscleGroups={['Chest', 'Shoulder','Triceps']} />

    </div>
  )
}

export default Categories
