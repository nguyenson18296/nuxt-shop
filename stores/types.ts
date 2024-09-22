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
  price: number;
  discount_price: number;
  in_stock: number;
  created_at: string;
  updated_at: string;
  description: string;
  images: string[];
}
