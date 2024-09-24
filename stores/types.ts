export interface ICartItem {
  id: number;
  quantity: number;
  product: IProductItem;
}

export interface IProductItem {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  price: string;
  discount_price: string;
  in_stock: number;
  created_at: string;
  updated_at: string;
  description: string;
  images: string[];
}
