export interface IListResponse<T> {
  data: T[];
  success: boolean;
  limit: number;
  total: number;
  page: number;
}

export interface ICartItem {
  id: number;
  quantity: number;
  product: IProductItem;
}

export interface IProductItem {
  id: number;
  title: string;
  slug?: string;
  thumbnail: string;
  price: string;
  discount_price?: string;
  in_stock: number;
  created_at?: string;
  updated_at?: string;
  short_description?: string;
  description?: string;
  images?: string[];
  rating: number;
}

export type TProductCompare = Pick<IProductItem, 'id' | 'title' | 'description' | 'thumbnail' | 'price' | 'slug'>;

export type PostType = 'normal' | 'headline' | 'first_headline' | 'second_headline';

export interface IPost {
  id: number;
  title: string;
  seo_title: string;
  slug: string;
  short_description: string;
  seo_description: string;
  content: string;
  cover_photo: string;
  created_at: string;
  post_type: PostType;
  user: {
    id: number;
    username: string;
    email: string;
    avatar: string;
  }
}

export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return;
export type MaybeRef<T> = T | Ref<T>;

export interface IOption {
  value: string;
  label: string;
}
