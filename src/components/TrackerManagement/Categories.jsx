import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import { getStrengthContent } from '@/serviceAPI/tennant'

const Categories = () => {
  const [loading, setLoading] = useState(true)

  const [excerciseData, setExcerciseData] = useState(null)
  const fetchAllExcercise = async () => {
    const res = await getStrengthContent();
    if (res?.status) {
      setExcerciseData(res?.data)
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAllExcercise()
  }, [])
  return (
    <div className="flex flex-col gap-4">
    {excerciseData ? (
      excerciseData.map((item, index) => (
        <CategoryCard
          key={index}
          imageUrl={'/push.png'} 
          title={item?.categoryName || 'Default Title'} 
          muscleGroups={item?.muscles || []} 
        />
      ))
    ) : (
      <p>Loading exercises...</p>
    )}
  </div>
  
  )
}

export default Categories
