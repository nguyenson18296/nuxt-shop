import { defineStore } from 'pinia';
import type { ICartItem, IProductItem } from './types';

interface State {
  cart: ICartItem[];
}

export const useCartStore = defineStore('cart', {
  state: (): State => {
    return {
      cart: [],
    };
  },
  actions: {
    async fetchCart() {
      const token = useCookie('token');
      const { data } = await useFetch<{
        success: boolean;
        data: {
          items: ICartItem[];
        };
      }>('/api/cart', {
        baseURL: 'http://localhost:1996',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      if (data.value?.success) {
        this.cart = data.value.data.items;
      }
    },
    addProductToCart(product: IProductItem, quantity: number) {
      const cartItem = this.cart.find((item: ICartItem) => item.product.id === product.id);

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        this.cart = this.cart.concat({
          id: Date.now(),
          product,
          quantity,
        });
      }
    },
    removeProductFromCart(id: number) {
      this.cart = this.cart.filter((item: ICartItem) => item.id !== id);
    },
    emptyCart() {
      this.cart = [];
    }
  },
  getters: {
    cartTotal(): number {
      return this.cart.reduce((total: number, item: ICartItem) => {
        return total + item.product.price * item.quantity;
      }, 0);
    },
    cartTotalDiscount(): number {
      return this.cart.reduce((total: number, item: ICartItem) => {
        return total + item.product.discount_price * item.quantity;
      }, 0);
    },
  }
});
