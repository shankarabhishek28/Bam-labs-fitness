import { useState } from "react";
import AddExerciseCard from "./AddExerciseCard"; // Assuming the component is in the same directory
import { PlusCircle, PlusIcon, Trash2 } from "lucide-react";
import { useTracker } from "@/Context/TrackerContext";
import VideoUpload from "./VideoUpload";
import MetricesMultiSelect from "./MetricesMultiSelect";
import ButtonWithLoader from "../ui/ButtonWithLoader";
import { addStrengthContent } from "@/serviceAPI/tennant";
import { removeIds } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ExerciseMetrics = () => {
  const { trackerData, setTrackerData } = useTracker();
  
  const [selectedMuscleId, setSelectedMuscleId] = useState("");
  const router = useRouter()
  const addNewExercise = () => {
    if (!selectedMuscleId) {
      alert("Please select a muscle first.");
      return;
    }

    const newExercise = {
      id: Date.now(),
      name: "",
      video: { key: "", url: "" },
      metrices: [],
    };

    setTrackerData((prevData) => {
      const updatedMuscles = prevData.targetMuscle.map((muscle) => {
        if (muscle.id === selectedMuscleId) {
          return {
            ...muscle,
            excercizes: [...(muscle.excercizes || []), newExercise],
          };
        }
        return muscle;
      });

      return { ...prevData, targetMuscle: updatedMuscles };
    });
  };

  const removeExercise = (exerciseId) => {
    setTrackerData((prevData) => {
      const updatedMuscles = prevData.targetMuscle.map((muscle) => {
        if (muscle.id === selectedMuscleId) {
          return {
            ...muscle,
            excercizes: muscle.excercizes.filter(
              (exercise) => exercise.id !== exerciseId
            ),
          };
        }
        return muscle;
      });

      return { ...prevData, targetMuscle: updatedMuscles };
    });
  };
  const validateExercises = (data) => {
    const { targetMuscle } = data;
    let isValid = true;

    for (const muscle of targetMuscle) {
        const { muscleName, excercizes } = muscle;
        let missingFieldsMessage = "";

        for (const exercise of excercizes) {
            const { video, name, metrices } = exercise;

            // Check each field and append to the message if missing
            if (!video.key) {
                missingFieldsMessage += "video field, ";
            }
            if (!name) {
                missingFieldsMessage += "name field, ";
            }
            if (!metrices || metrices.length === 0) {
                missingFieldsMessage += "metrics field, ";
            }
        }

        // If there are missing fields, remove the trailing comma and space
        if (missingFieldsMessage) {
            missingFieldsMessage = missingFieldsMessage.slice(0, -2); // Remove last ", "
            toast.error(`The muscle "${muscleName}" has missing fields: ${missingFieldsMessage}.`);
            isValid = false;
        }
    }

    return isValid; // Return true if all validations pass
};

  const handleExerciseNameChange = (exerciseId, updatedName) => {
    setTrackerData((prevData) => {
      const updatedMuscles = prevData.targetMuscle.map((muscle) => {
        if (muscle.id === selectedMuscleId) {
          return {
            ...muscle,
            excercizes: muscle.excercizes.map((exercise) =>
              exercise.id === exerciseId ? { ...exercise, name: updatedName } : exercise
            ),
          };
        }
        return muscle;
      });

      return { ...prevData, targetMuscle: updatedMuscles };
    });
  };

  const selectedMuscle = trackerData?.targetMuscle?.find(
    (muscle) => muscle.id === selectedMuscleId
  );

  const saveStrengthContent = async () => {
    const isValid = validateExercises(trackerData);

    // If validation fails, stop further execution
    if (!isValid) {
        return;
    }    const res = await addStrengthContent(removeIds(trackerData));
    if (res?.status) {
      setTrackerData({
        name: '',
        image: { "key": "", "url": '' },
        targetMuscle: [{
          "muscleName": "",
          "id": Date.now(),
          "excercizes": [

            {
              "video": { "key": "", "url": '' },
              "id": Date.now(),
              "name": "",
              "metrices": []
            }
          ]
        },
        ],
      })
      router.push("/tracker-management")
    }
  }
  return (
    <div className="exercise-metrics-container">
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <label
            htmlFor="exerciseDropdown"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select Muscle
          </label>
          <select
            id="exerciseDropdown"
            value={selectedMuscleId}
            onChange={(e) => setSelectedMuscleId(Number(e.target.value))}
            className="block w-full bg-white border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              -- Select a Muscle --
            </option>
            {trackerData?.targetMuscle?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.muscleName}
              </option>
            ))}
          </select>
        </div>

        {selectedMuscle && <ButtonWithLoader className='mt-0' onClick={saveStrengthContent} >Submit</ButtonWithLoader>}
        
      </div>

      {selectedMuscle?.excercizes?.map((exercise) => (
        <div
          key={exercise.id}
          className="relative exercise-card-wrapper mb-6 mt-6 border  rounded-lg  p-4"
        >
          <div className="w-full flex bg-white mt-6">
            <div className="flex w-1/2 flex-col gap-8">
              <div className="md:col-span-2">
                <input
                  id="exercise"
                  type="text"
                  placeholder="Add exercise"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseNameChange(exercise.id, e.target.value)
                  }
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <VideoUpload exerciseId={exercise.id} muscleId={selectedMuscleId} />
            </div>
            <div className="w-1/2 ml-12">
              <MetricesMultiSelect placeholder={'Current Metrices'} exerciseId={exercise.id} muscleId={selectedMuscleId} options={["date", "sessionTime", "reps", "sets", "weight", "totalReps"]} onChange={() => { }} />
            </div>
          </div>
          <button
            onClick={() => removeExercise(exercise.id)}
            className="absolute top-2 right-2 px-3 py-1 text-red-600 rounded"
          >
            <Trash2 />
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between">
        {selectedMuscle && <button
          onClick={addNewExercise}
          className="mt-0 px-2 py-2 bg-primary text-white rounded hover:bg-blue-600"
        >
          <PlusIcon />
        </button>}
        

      </div>

    </div>
  );
};

export default ExerciseMetrics;
