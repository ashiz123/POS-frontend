export type ProductType = {
  _id: string;
  categoryId: string;
  name: string;
  description: string;
  isActive: boolean;
  sku: string;
  slug: string;
  stockType: string;
  image: string;
  sellPrice: number;
};

export type CategoryType = {
  _id: string;
  title: string;
  parentCategoryId: string;
  slug: string;
  isActive: boolean;
};

export interface CartItem {
  _id: string;
  batchId: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  totalStock: number;
}
