import { defineStore } from 'pinia';
import type { TProductCompare } from './types';

interface State {
  products: IProductItem[];
  compareProducts: TProductCompare[];
  queryParams: {
    min_price: string;
    max_price: string;
  }
}

export const useProductStore = defineStore('product', {
  state: (): State => {
    return {
      products: [],
      compareProducts: [],
      queryParams: {
        min_price: '',
        max_price: '',
      }
    };
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
  actions: {
    setParams(params: { min_price: string; max_price: string }) {
      console.log('min_price', params.min_price);
      console.log('max_price', params.max_price);
      this.queryParams = params;
    },
    pushProductForComparing(product: TProductCompare) {
      if (this.compareProducts.map((p) => p.id).includes(product.id)) {
        throw new Error('Product already exists in the compare list');
      } else {
        if (this.compareProducts.length >= 4) {
          this.compareProducts.shift();
        }
        this.compareProducts.push(product);
      }
    }
  },
})