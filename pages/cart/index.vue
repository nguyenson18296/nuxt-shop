<script setup lang="ts">
import { PhTrash } from '@phosphor-icons/vue';
import { storeToRefs } from 'pinia';
import { useForm, Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { convertToCurrency } from '@/utils/convert-currency';
import dayjs from 'dayjs';
import { useCartStore } from '@/stores/cart';

interface IShippingInfo {
  address: string;
  full_name: string;
  phone: string;
}

interface IVoucher {
  id: string;
  code: string;
  discount_value: number;
  is_active: boolean;
}

useSeoMeta({
  title: 'Vue Shop - E-commerce - Your Cart',
  ogTitle: 'Vue Shop - E-commerce - Your Cart',
  description: 'Vue Shop - E-commerce - Your Cart',
  ogDescription: 'Vue Shop - E-commerce - Your Cart',
})

const router = useRouter();
const cartStore = useCartStore();

const { removeProductFromCart, emptyCart } = useCartStore();
const { cart, cartTotalDiscount, cartTotal } = storeToRefs(cartStore);

const token = useCookie('token');
const checkingVoucher = ref(false);

const toast = useNuxtApp().$toast;

function showSuccessMessage() {
  toast('Create order failed. Please try again!', 5000);
}

const validationSchema = toTypedSchema(
  zod.object({
    address: zod.string().min(1, {
      message: 'Address is required',
    }),
    full_name: zod.string({
      required_error: 'Full name is required',
    }).min(1, {
      message: 'Full name is required',
    }),
    phone: zod.string({
      required_error: 'Phone number is required',
    }).min(1, {
      message: 'Phone number is required',
    }),
  })
);

console.log('cartTotalDiscount', cartTotalDiscount.value)
console.log('cartTotal', cartTotal.value)

const { errors, values } = useForm<IShippingInfo>({
  validateOnMount: false,
  initialErrors: {
    address: '',
    full_name: '',
    phone: '',
  },
  initialValues: {
    address: '',
    full_name: '',
    phone: '',
  },
  validationSchema,
});

const isShowCouponInputForm = ref(false);
const isShowConfirmModal = ref(false);
const selectedCartItemId = ref<number | null>(null);
const couponCode = ref('');
const isVoucherValid = ref(true);
const listVouchers = ref<IVoucher[]>([]);

const toggleCouponInputForm = () => {
  isShowCouponInputForm.value = !isShowCouponInputForm.value;
  if (!isShowCouponInputForm.value) {
    couponCode.value = '';
  }
}

const onRemoveCartItem = async () => {
  await useFetch<{
    success: boolean;
  }>(`/api/cart/cart-item/${selectedCartItemId.value}`, {
    baseURL: 'http://localhost:1996',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    onResponse: async ({ response }) => {
      if (response.ok) {
        if (selectedCartItemId.value) {
          removeProductFromCart(selectedCartItemId.value);
        }
      }
    },
    onResponseError: () => {
      toast('Error when deleting cart item, please try again!', 5000);
    }
  })
};

const onCheckValidCoupon = async () => {
  checkingVoucher.value = true;
  const formData = {
    voucher_code: couponCode.value,
  }
  await useFetch<{
    success: boolean;
    data: IVoucher;
  }>('/api/me/check-voucher', {
    baseURL: 'http://localhost:1996',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    method: 'POST',
    body: JSON.stringify(formData),
    onResponse: async ({ response }) => {
      if (response.ok) {
        isVoucherValid.value = true;
        const voucherId = toRaw(response._data.data.id);
        if (response._data.data && !listVouchers.value.map(item => item.id).includes(voucherId)) {
          listVouchers.value.push(response._data.data);
        }
      }
    },
    onResponseError: () => {
      isVoucherValid.value = false;
      showSuccessMessage();
    }
  })
  checkingVoucher.value = false;
};

const createOrder = async (values: any) => {
  let formData = {
    issued_date: dayjs().format('YYYY/MM/DD'),
    payment_status: 'PENDING',
    contact_detail: {
      address: values.address,
      full_name: values.full_name,
      phone: values.phone,
    },
    order_items: cart.value.map(item => ({
      id: item.product.id,
      quantity: item.quantity,
    })),
    voucher_id: '',
  }
  if (listVouchers.value.length > 0) {
    formData = {
      ...formData,
      voucher_id: listVouchers.value[0].id,
    }
  }
  await useFetch<{
    success: boolean;
  }>('/api/orders', {
    baseURL: 'http://localhost:1996',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    method: 'POST',
    body: JSON.stringify(formData),
    onResponse: async ({ response }) => {
      if (response.ok) {
        emptyCart();
        router.push('/checkout-success');
      }
    },
    onResponseError: () => {
      toast('Error when creating order', 5000);
    }
  })
}

const onCancelDelete = () => {
  isShowConfirmModal.value = false;
  selectedCartItemId.value = null;
}

const onOpenConfirmModal = (id: number) => {
  isShowConfirmModal.value = true;
  selectedCartItemId.value = id;
}

const totalDiscountOfVoucher = computed(() => {
  return listVouchers.value.reduce((acc, voucher) => acc + voucher.discount_value, 0);
});

const grandTotal = computed(() => {
  return cartTotalDiscount.value - totalDiscountOfVoucher.value;
});

const updateQuantity = (newQuantity: number, id: number) => {
  cartStore.updateQuantity(id, newQuantity);
};

</script>

<template>
  <ConfirmModal v-if="isShowConfirmModal" modal-id="confirm-delete-modal" :is-open="isShowConfirmModal"
    text-confirm="Are you sure want to delete this product?" @close-modal="() => onCancelDelete()"
    @confirm-delete="() => onRemoveCartItem()" />
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs title="Your cart" />
    <div class="container py-8">
      <div class="mx-auto px-3">
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
            <tbody class="border-t-neutral-200 border-t border-solid">
              <tr class="cart-item table-row border-b-neutral-200 border-b" v-for="item in cart" :key="item.product.id">
                <td class="py-2">
                  <div>
                    <NuxtImg :src="item.product.thumbnail" :alt="item.product.title" width="100"
                      layout="fixed" class="max-w-[100px] p-2 border border-neutral-200 mx-0 my-2.5 rounded-lg border-solid" />
                  </div>
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
                  <ProductPrice
                    :price="+item.product.price" 
                    :discount_price="+item.product.discount_price"
                    font-size="text-sm"
                  />
                </td>
                <td class="table-cell text-center">
                  <!-- {{ item.quantity }} -->
                  <QuantityInput
                    :quantity="item.quantity"
                    :product-id="item.product.id"
                    @update:quantity="($event) => updateQuantity($event, item.id)"
                  />
                </td>
                <td class="text-right">
                  <div class="flex gap-1 items-center justify-end">
                    <ProductPrice :price="(+item.product.price * item.quantity)"
                      :discount_price="+item.product.discount_price * item.quantity"
                      font-size="text-sm"
                    />
                    <button @click.stop="() => onOpenConfirmModal(item.id)">
                      <PhTrash size="24" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Form :validation-schema="validationSchema" class="my-2" @submit="createOrder">
          <div class="data-cart-total flex justify-end">
            <ul class="cart-total w-[41.66667%] mb-4">
              <li class="flex justify-between border-b border-solid border-neutral-200">
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
                <div class="form-group flex items-start mb-4">
                  <label class="flex-[0_0_30%] text-[#666] text-sm">
                    Address
                  </label>
                  <div class="flex flex-1 flex-col gap-1">
                    <Field
                      name="address" 
                      type="text" 
                      placeholder="Enter your address"
                      class="appearance-none bg-white border-neutral-200 border rounded text-[#666] block text-[13px] antialiased h-[2.28571rem] transition-[border-color] duration-[0.1s] ease-[ease-out] w-full m-0 px-4 py-3 border-solid"
                    />
                    <ErrorMessage class="text-[#cc4749]" name="address" />
                  </div>
                </div>
                <div class="form-group flex items-start mb-4">
                  <label class="flex-[0_0_30%] text-[#666] text-sm">
                    Full Name
                  </label>
                  <div class="flex flex-1 flex-col gap-1">
                    <Field name="full_name" type="text" placeholder="Enter your coupon code"
                      class="appearance-none bg-white border-neutral-200 border rounded text-[#666] block text-[13px] antialiased h-[2.28571rem] transition-[border-color] duration-[0.1s] ease-[ease-out] w-full m-0 px-4 py-3 border-solid"
                    />
                    <ErrorMessage class="text-[#cc4749]" name="full_name" />
                  </div>
                </div>
                <div class="form-group flex items-start">
                  <label class="flex-[0_0_30%] text-[#666] text-sm">
                    Phone Number
                  </label>
                  <div class="flex flex-1 flex-col gap-1">
                    <Field name="phone" type="text" placeholder="Enter your coupon code"
                      class="appearance-none bg-white border-neutral-200 border rounded text-[#666] block text-[13px] antialiased h-[2.28571rem] transition-[border-color] duration-[0.1s] ease-[ease-out] w-full m-0 px-4 py-3 border-solid"
                    />
                    <ErrorMessage class="text-[#cc4749]" name="phone" />
                  </div>
                </div>
              </li>
              <li class="border-t my-2">
                <div class="flex justify-between">
                  <div class="px-0 py-4">
                    <strong>
                      Coupon Code:
                    </strong>
                  </div>
                  <div class="px-0 py-4">
                    <button type="button" class="cursor-pointer text-[#666] text-sm" @click="toggleCouponInputForm">
                      {{ isShowCouponInputForm ? 'Cancel' : 'Apply' }}
                    </button>
                  </div>
                </div>
                <form v-show="isShowCouponInputForm" class="form flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <input type="text" placeholder="Enter your coupon code"
                    class="appearance-none bg-white border-neutral-200 border rounded text-[#666] block text-[13px] antialiased h-12 transition-[border-color] duration-[0.1s] ease-[ease-out] w-full m-0 px-4 py-3 border-solid"
                    v-model="couponCode"
                  />
                  <button
                    :disabled="!couponCode"
                    class="disabled:opacity-75 disabled:cursor-not-allowed flex items-center gap-2 border-neutral-200 text-[#666] font-semibold rounded-[25px] px-6 py-[0.57143rem] bg-[#e5e5e5] hover:bg-[#f27002] hover:text-white"
                    type="button" @click="onCheckValidCoupon">
                    Apply
                    <LoadingIndicator v-show="checkingVoucher" color="white" class-names="w-6 h-6" />
                  </button>
                  </div>
                  <p v-if="!isVoucherValid" class="text-[#cc4749]">
                    Voucher is not valid
                  </p>
                  <div class="flex items-center gap-2">
                    <ul class="list-disc list-inside text-[#666] text-sm">
                      <li>
                        <strong>
                          Voucher code:
                        </strong>
                        <Badge v-for="voucher in listVouchers" :key="voucher.id">
                          <template #badge-content>
                            {{ voucher.code }}
                          </template>
                        </Badge>
                      </li>
                      <li>
                        <strong>
                          Discount value:
                        </strong>
                        <span>
                          {{ listVouchers.map(voucher => voucher.discount_value).join(', ') }}
                        </span>
                      </li>
                    </ul>
                  </div>
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
                <div class="px-0 py-4 gap-2 flex">
                  <strong>
                    {{ convertToCurrency(grandTotal) }}
                  </strong>
                  <span v-if="listVouchers.length > 0" class="text-sm font-bold text-gray-500 dark:text-gray-400 text-[#f27002] line-through">
                    {{ convertToCurrency(cartTotalDiscount) }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <button
            class="float-right button-primary font-semibold text-white text-sm leading-[18px] tracking-[1px] normal-case w-auto relative transition-[0.5s] duration-[ease-in-out] m-0 px-5 py-2.5 rounded-[25px] border-[none] bg-[#443e40]"
            type="submit"
          >
            <!-- <NuxtLink href="/checkout"> -->
              Checkout
            <!-- </NuxtLink> -->
          </button>
        </Form>
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