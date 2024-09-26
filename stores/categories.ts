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
  actions: {
    async fetchCategories() {
      const data = await $fetch<{
        success: boolean;
        data: ICategory[];
      }>('/api/categories', {
        baseURL: 'http://localhost:1996',
        method: 'GET',
      });
      if (data.success) {
        this.categories = data.data;
      }
    },
    setCategories(categories: ICategory[]) {
      this.categories = categories;
    },
  }
});
