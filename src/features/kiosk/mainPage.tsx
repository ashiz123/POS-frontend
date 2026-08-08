import {
  getAllCategories,
  getAllProductsOfCategory,
} from "../../services/kiosk/menu";
import { useEffect, useState } from "react";
import KioskHeader from "./components/KioskHeader";
import CategorySidebar from "./components/CategorySidebar";
import CartSidebar from "./components/CartSidebar";
import ProductGrid from "./components/ProductGrid";
import type { CategoryType, ProductType } from "./types/types";
import { useCartContext } from "../../hooks/useCartContext";

const MainPage = () => {
  const { cart, addToCart } = useCartContext();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const allCategories = async () => {
      try {
        const menusData = await getAllCategories();
        if (menusData.success === true) {
          setCategories(menusData.data);
          setActiveCategory(menusData.data[1]._id); // TODO: Modify this. category may not have product
        }
      } catch (error) {
        console.log(error);
      }
    };

    allCategories();
  }, [setCategories]);

  useEffect(() => {
    const getProductOfActiveCategory = async () => {
      try {
        console.log("act");
        const allProducts = await getAllProductsOfCategory(activeCategory);
        console.log(allProducts);
        setProducts(allProducts.data);
        setLoadingProducts(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProducts(false);
      }
    };

    getProductOfActiveCategory();
  }, [activeCategory]);

  if (loadingProducts === true) {
    return <div>Loading Products...</div>;
  }

  console.log(cart);

  return (
    <div className="h-screen flex flex-col bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* 1. Top Header Area */}
      <KioskHeader />
      {/* Main Container Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* 2. Left Side: Categories Sidebar */}
        <CategorySidebar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 3. Center Area: Product Grid Content Page */}
        <ProductGrid
          products={products}
          categories={categories}
          activeCategory={activeCategory}
          onAddToCart={addToCart}
        />

        {/* 4. Right Side: Checkout Basket Sidebar */}
        <CartSidebar />
      </div>
    </div>
  );
};

export default MainPage;
