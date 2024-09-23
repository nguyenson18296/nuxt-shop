<script setup lang="ts">
import { PhTrash } from '@phosphor-icons/vue';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { cartTotal, cartTotalDiscount, removeProductFromCart } = useCartStore();
import { convertToCurrency } from '@/utils/convert-currency';


const isShowCouponInputForm = ref(false);
const isShowConfirmModal = ref(false);
const selectedCartItemId = ref<number | null>(null);

const toggleCouponInputForm = () => {
  isShowCouponInputForm.value = !isShowCouponInputForm.value;
}

const onRemoveCartItem = async () => {
  const { data } = await useFetch<{
    success: boolean;
  }>(`/api/cart/cart-item/${selectedCartItemId.value}`, {
    baseURL: 'http://localhost:1996',
    method: 'DELETE',
  })
  if (data.value?.success) {
    if (selectedCartItemId.value) {
      removeProductFromCart(selectedCartItemId.value);
    }
  }
};

const { cart } = storeToRefs(cartStore);

const onCancelDelete = () => {
  isShowConfirmModal.value = false;
  selectedCartItemId.value = null;
}

const onOpenConfirmModal = (id: number) => {
  isShowConfirmModal.value = true;
  selectedCartItemId.value = id;
}

</script>

<template>
  <ConfirmModal v-if="isShowConfirmModal" modal-id="confirm-delete-modal" :is-open="isShowConfirmModal"
    text-confirm="Are you sure want to delete this product?" @close-modal="() => onCancelDelete()"
    @confirm-delete="() => onRemoveCartItem()" />
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs title="Your cart" />
    <div class="container py-8">
      <div class="w-[80%] float-left float-none mx-auto px-3">
        <SectionHeader title="Your cart" bgText="#fff" />
        <div data-cart-content>
          <table class="cart block lg:table">
            <thead class="table-header-group">
              <tr>
                <th class="hidden lg:table-cell" colspan="2">Item</th>
                <th class="hidden lg:table-cell">Price</th>
                <th class="hidden lg:table-cell">Quantity</th>
                <th class="hidden lg:table-cell text-right">Total</th>
              </tr>
            </thead>
            <tbody class="border-t-neutral-200 border-b-neutral-200 border-t border-solid border-b">
              <tr class="cart-item table-row hover:bg-[#f3f3f3]" v-for="item in cart" :key="item.product.id">
                <td>
                  <NuxtImg :src="item.product.thumbnail" :alt="item.product.title" width="100" height="100"
                    layout="fixed" />
                </td>
                <td class="table-cell p-6">
                  <h4 class="cart-item-brand text-[#999] mb-[0.21429rem] text-sm">
                    Sagaform
                  </h4>
                  <h3 class="text-sm">
                    <NuxtLink :to="`/products/${item.product.slug}`" class="text-[#111] font-bold capitalize">
                      {{ item.product.title }}
                    </NuxtLink>
                  </h3>
                </td>
                <td class="table-cell">
                  <ProductPrice :price="item.product.price" :discount_price="item.product.discount_price" />
                </td>
                <td class="table-cell text-center">
                  {{ item.quantity }}
                </td>
                <td class="text-right">
                  <div class="flex gap-1 items-center">
                    <ProductPrice :price="(item.product.price * item.quantity)"
                      :discount_price="item.product.discount_price * item.quantity" />
                    <button @click.stop="() => onOpenConfirmModal(item.id)">
                      <PhTrash size="24" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="data-cart-total flex justify-end">
          <ul class="cart-total w-[41.66667%] mb-4">
            <li class="flex justify-between border-t border-b border-solid border-neutral-200">
              <div class="px-0 py-4">
                <strong>
                  Subtotal:
                </strong>
              </div>
              <div class="px-0 py-4">
                <span>
                  <ProductPrice :price="cartTotal" :discount_price="cartTotalDiscount" />
                </span>
              </div>
            </li>
            <li class="border-t">
              <div class="flex justify-between">
                <div class="px-0 py-4">
                  <strong>
                    Shipping:
                  </strong>
                </div>
                <div class="px-0 py-4 text-[#666] text-sm">
                  <span>
                    Add info
                  </span>
                </div>
              </div>
              <form class="my-2">
                <div class="form-group flex items-center mb-4">
                  <label class="flex-[0_0_30%] text-[#666] text-sm">
                    Address
                  </label>
                  <input type="text" placeholder="Enter your coupon code"
                    class="appearance-none bg-white border-neutral-200 border rounded text-[#666] block text-[13px] antialiased h-[2.28571rem] transition-[border-color] duration-[0.1s] ease-[ease-out] w-full m-0 px-4 py-3 border-solid" />
                </div>
                <div class="form-group flex items-center mb-4">
                  <label class="flex-[0_0_30%] text-[#666] text-sm">
                    Full Name
                  </label>
                  <input type="text" placeholder="Enter your coupon code"
                    class="appearance-none bg-white border-neutral-200 border rounded text-[#666] block text-[13px] antialiased h-[2.28571rem] transition-[border-color] duration-[0.1s] ease-[ease-out] w-full m-0 px-4 py-3 border-solid" />
                </div>
                <div class="form-group flex items-center">
                  <label class="flex-[0_0_30%] text-[#666] text-sm">
                    Phone Number
                  </label>
                  <input type="text" placeholder="Enter your coupon code"
                    class="appearance-none bg-white border-neutral-200 border rounded text-[#666] block text-[13px] antialiased h-[2.28571rem] transition-[border-color] duration-[0.1s] ease-[ease-out] w-full m-0 px-4 py-3 border-solid" />
                </div>
              </form>
            </li>
            <li class="border-t my-2">
              <div class="flex justify-between">
                <div class="px-0 py-4">
                  <strong>
                    Coupon Code:
                  </strong>
                </div>
                <div class="px-0 py-4">
                  <span class="cursor-pointer text-[#666] text-sm" @click="toggleCouponInputForm">
                    {{ isShowCouponInputForm ? 'Cancel' : 'Apply' }}
                  </span>
                </div>
              </div>
              <form v-show="isShowCouponInputForm" class="form flex items-center gap-2">
                <input type="text" placeholder="Enter your coupon code"
                  class="appearance-none bg-white border-neutral-200 border rounded text-[#666] block text-[13px] antialiased h-12 transition-[border-color] duration-[0.1s] ease-[ease-out] w-full m-0 px-4 py-3 border-solid" />
                <button
                  class="border-neutral-200 text-[#666] font-semibold rounded-[25px] px-6 py-[0.57143rem] bg-[#e5e5e5] hover:bg-[#f27002] hover:text-white">Apply</button>
              </form>
            </li>
            <li class="flex justify-between border-t border-b border-solid border-neutral-200">
              <div class="px-0 py-4">
                <strong>
                  Gift Certificate:
                </strong>
              </div>
              <div class="px-0 py-4">
                <span>
                  Gift Certificate
                </span>
              </div>
            </li>
            <li class="flex justify-between border-t border-b border-solid border-neutral-200">
              <div class="px-0 py-4">
                <strong>
                  Grand total:
                </strong>
              </div>
              <div class="px-0 py-4">
                <strong>
                  {{ convertToCurrency(cartTotalDiscount) }}
                </strong>
              </div>
            </li>
          </ul>
        </div>
        <button
          class="float-right button-primary font-semibold text-white text-sm leading-[18px] tracking-[1px] normal-case w-auto relative transition-[0.5s] duration-[ease-in-out] m-0 px-5 py-2.5 rounded-[25px] border-[none] bg-[#443e40]">
          <NuxtLink href="/checkout">
            Checkout
          </NuxtLink>
        </button>
        <div class="clear-both" />
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.button-primary:hover {
  background-color: #f27002;
}
</style>