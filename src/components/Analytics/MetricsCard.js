import React from 'react'

const MetricsCard = ({data,title}) => {
  return (
    <div className='min-w-[174px] flex flex-col px-4 justify-center h-[100px] rounded-[12px] bg-[#DEF4FF]'>
      <span className='text-2xl text-textColor font-bold'>{data}</span>
      <span>{title}</span>
    </div>
  )
}

export default MetricsCard
