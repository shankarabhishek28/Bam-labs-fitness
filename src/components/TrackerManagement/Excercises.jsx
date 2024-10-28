import React from 'react'
import ExerciseCard from './ExcerciseCard'

const Excercises = () => {
  return (
    <div className='flex flex-col gap-4'>
      <ExerciseCard imageUrl={'/push.png'} title='Push' muscleGroups={['Chest', 'Shoulder','Triceps']} />
      <ExerciseCard imageUrl={'/push.png'} title='Push' muscleGroups={['Chest', 'Shoulder','Triceps']} />
      <ExerciseCard imageUrl={'/push.png'} title='Push' muscleGroups={['Chest', 'Shoulder','Triceps']} />

    </div>
  )
}

export default Excercises
