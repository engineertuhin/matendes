import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../services/categoryApi";

export const useCategory = () => {
  const form = useForm();
  const { data, refetch, isFetching } = useFetchCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categoryState = {
    data: data?.data || [],
    form,
    refetch,
    isFetching,
  };

  const actions = {
    onCreate: async (formData) => {
      try {
        await createCategory(formData).unwrap();
        toast.success("Category created");
        refetch();
        form.reset();
        form.setValue("openModel", false);
      } catch {
        toast.error("Failed to create");
      }
    },
    onEdit: (item) => {
      form.reset(item);
      form.setValue("openModel", true);
    },
    onUpdate: async (formData) => {
      try {
        await updateCategory(formData).unwrap();
        toast.success("Category updated");
        refetch();
        form.reset();
        form.setValue("openModel", false);
      } catch {
        toast.error("Failed to update");
      }
    },
    onDelete: async (id) => {
      if (confirm("Delete this category?")) {
        try {
          await deleteCategory(id).unwrap();
          toast.success("Deleted");
          refetch();
        } catch {
          toast.error("Failed to delete");
        }
      }
    },
  };

  return { categoryState, actions };
};
