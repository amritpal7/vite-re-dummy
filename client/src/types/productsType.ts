type Reviews = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type ProductType = {
  id?: number;
  title: string;
  description: string;
  thumbnail?: string;
  category: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand: string;
  reviews?: Reviews[];
  images?: string[];
  [key: string]: any; // for other potential properties from response
};

export type ProductsType = {
  products: ProductType[];
  status: "idle" | "loading" | "failed";
  error: string | null;
};
