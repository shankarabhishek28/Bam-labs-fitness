import { useState } from "react";
import AddExerciseCard from "./AddExerciseCard"; // Assuming the component is in the same directory
import { Delete, DeleteIcon, Trash2 } from "lucide-react";

const ExerciseMetrics = ({muscle}) => {
  // State to manage the list of exercise cards with unique IDs
  const [exerciseCards, setExerciseCards] = useState([{ id: 1 }]); // Initial card with a unique id

  // Function to add a new card
  const addNewCard = () => {
    setExerciseCards((prevCards) => [
      ...prevCards,
      { id: prevCards.length ? prevCards[prevCards.length - 1].id + 1 : 1 },
    ]);
  };

  // Function to remove a card
  const removeCard = (id) => {
    setExerciseCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <div className="exercise-metrics-container">
      <label
        htmlFor="exercise"
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        {muscle}
      </label>
      {exerciseCards.map((card) => (
        <div key={card.id} className="relative exercise-card-wrapper mb-6 border rounded-lg shadow-md p-4">
          <AddExerciseCard />
          <button
            onClick={() => removeCard(card.id)}
            className="absolute top-2 right-2 px-3 py-1  text-red-600 rounded "
          >
            <Trash2 />
          </button>
        </div>
      ))}
      <button
        onClick={addNewCard}
        className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-600"
      >
        Add New Exercise
      </button>
    </div>
  );
};

export default ExerciseMetrics;
