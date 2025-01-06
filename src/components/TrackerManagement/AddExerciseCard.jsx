import React from 'react'
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import VideoUpload from "./VideoUpload";
import MetricsForm from "./MetricsForm";
import MultiSelect from './MetricesMultiSelect';
import { useTracker } from '@/Context/TrackerContext';
const AddExerciseCard = () => {
  const {trackerData, updateTrackerData} = useTracker()
  const handleOnChange = (val) => {
    console.log(val)
  }
  return (
    <></>
  )
}

export default AddExerciseCard
