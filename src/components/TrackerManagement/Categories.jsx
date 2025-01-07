import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import { deleteStrengthContent, getStrengthContent } from '@/serviceAPI/tennant'
import { useRouter } from 'next/navigation';

const Categories = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true)
  const deleteExercise = async(id) => {
    const res =  await deleteStrengthContent(id);
    if(res?.status){
      fetchAllExcercise();
    }
    
  }
  const editStrength = (id) => {
    router.push(`/tracker-management/edit-category/${id}`)
  }
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
          onEdit={()=>editStrength(item?._id)}
          onDelete={()=>deleteExercise(item?._id)}
          key={index}
          imageUrl={item?.image?.url} 
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
