import { useEffect, useState } from "react";
import { categoryList } from "../services/category";
import type { CategoryData } from "../validations/categoryValidation";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<
    (CategoryData & { _id: string })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesApi = await categoryList();
        setCategories(categoriesApi.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return { categories, setCategories, loading };
};
