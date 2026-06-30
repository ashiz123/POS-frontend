import { useEffect, useState } from "react";
import {
  activeCategoryList,
  allCategoryList,
} from "../services/admin/category";
import type { CategoryData } from "../validations/categoryValidation";

export const useGetCategories = (showAll: boolean = false) => {
  const [categories, setCategories] = useState<
    (CategoryData & { _id: string })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        let categoriesApi;
        if (showAll) {
          categoriesApi = await allCategoryList();
        } else {
          categoriesApi = await activeCategoryList();
        }

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
