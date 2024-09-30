import { defineStore } from 'pinia';

interface State {
  products: IProductItem[];
  queryParams: {
    min_price: string;
    max_price: string;
  }
}

export const useProductStore = defineStore('product', {
  state: (): State => {
    return {
      products: [],
      queryParams: {
        min_price: '',
        max_price: '',
      }
    };
  },
  actions: {
    setParams(params: { min_price: string; max_price: string }) {
      console.log('min_price', params.min_price);
      console.log('max_price', params.max_price);
      this.queryParams = params;
    }
  },
})