import { defineStore } from 'pinia';

export interface ICategory {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  orders: number;
  product_count: number;
}

// Define the state with a type or interface
interface State {
  categories: ICategory[];
}

export const useCategoriesStore = defineStore('categories', {
  state: (): State => {
    return {
      categories: [],
    };
  },
});
