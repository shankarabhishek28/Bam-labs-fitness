import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { deleteStrengthContent, getStrengthContent } from "@/serviceAPI/tennant";
import { useRouter } from "next/navigation";
import Popup from "../ui/Popup";
import { toast } from "react-toastify";

const Categories = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [excerciseData, setExcerciseData] = useState(null);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState({ open: false, id: null });

  const fetchAllExcercise = async () => {
    setLoading(true);
    const res = await getStrengthContent();
    if (res?.status) {
      setExcerciseData(res?.data);
    }
    setLoading(false);
  };

  const handleDeleteConfirm = async (id) => {
    const res = await deleteStrengthContent(id);
    if (res?.status) {
      toast.success('Category Deleted Successfully!')
      fetchAllExcercise();

    }
    setDeleteCategoryModal({ open: false, id: null });
  };

  const handleDeleteClick = (id) => {
    setDeleteCategoryModal({ open: true, id });
  };

  const editStrength = (id) => {
    router.push(`/tracker-management/edit-category/${id}`);
  };

  useEffect(() => {
    fetchAllExcercise();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <span class="loader"></span>
        </div>
      ) : (
        excerciseData?.map((item, index) => (
          <CategoryCard
            onEdit={() => editStrength(item?._id)}
            onDelete={() => handleDeleteClick(item?._id)}
            key={index}
            imageUrl={item?.image?.url}
            title={item?.categoryName || "Default Title"}
            muscleGroups={item?.muscles || []}
          />
        ))
      )}
      {deleteCategoryModal.open && (
        <Popup
          title="Are you sure you wish to delete this Category?"
          isOpen={deleteCategoryModal.open}
          onClose={() => setDeleteCategoryModal({ open: false, id: null })}
          footerButtons={[
            {
              label: "Cancel",
              onClick: () => setDeleteCategoryModal({ open: false, id: null }),
            },
            {
              label: "Confirm",
              variant: "primary",
              onClick: () => handleDeleteConfirm(deleteCategoryModal.id),
            },
          ]}
        >
          <p>This Category and its corresponding Muscles and Exercises will no longer be available in the app!</p>
        </Popup>
      )}
    </div>
  );
};

export default Categories;
