<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { PhCaretDown, PhPhone, PhHeart, PhUser, PhUserCheck, PhSignOut, PhArrowsClockwise } from "@phosphor-icons/vue";
import { useAuthStore, type UserInterface } from '@/stores/auth';
import { twMerge } from 'tailwind-merge';

const { user, authenticated } = storeToRefs(useAuthStore());
const { compareProducts } = storeToRefs(useProductStore());
const { setUser } = useAuthStore();
const token = useCookie('token');

const headerRef = ref<HTMLElement | null>(null);
const scrollPosition = useScroll(headerRef);

const getMe = async () => {
  const { data } = useFetch<{
    success: boolean;
    data: UserInterface;
  }>('http://localhost:1996/api/auth/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token.value}`
    }
  })
  if (data.value?.success) {
    setUser(data.value.data)
  }
}

const comparedProductLength = computed(() => compareProducts.value?.length ?? 0);

getMe();
</script>

<template>
  <header
    ref="headerRef"
  >
    <div
      ref="headerRef"
      class="header-center bg-[#443e40] px-0 py-[15px] w-full"
      :class="{ fixed: !scrollPosition.inView }"
    >
      <div class="container !flex flex-wrap justify-between items-center">
        <div class="header-logo text-center mt-[22px] mb-[19px] mx-0 lg:p-0 order-1">
          <NuxtLink href="/">
            <img
              src="/img/flex-cart.webp" 
              alt="flex-cart"
              class="w-[136px]"
            />
          </NuxtLink>
        </div>
        <SearchBox />
        <div
          :class="twMerge('bg-[#f27002] rounded-lg px-2.5 py-[12px] cursor-pointer contact-number w-[16%] text-white items-center gap-2', 'order-3 hidden xl:flex')">
          <PhPhone />
          <div>
            +(00)1234 567891
          </div>
        </div>
        <div
          :class="twMerge('ml-4 nav-user flex items-center gap-2 md:gap-4',
            'order-2 lg:order-4')">
          <PhHeart :size="30" color="white" class="cursor-pointer hover:fill-[#f27002]" />
          <NuxtLink to="/compare" v-if="comparedProductLength > 0">
            <div class="relative">
              <PhArrowsClockwise :size="30" color="white" class="cursor-pointer hover:fill-[#f27002]" />
              <div
                class="product-length absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#f27002] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                {{ comparedProductLength }}
              </div>
            </div>
          </NuxtLink>
          <Dropdown dropdownButtonId="user-dropdown">
            <template #trigger>
              <div class="flex items-center gap-2">
                <PhUser :size="30" color="white" class="cursor-pointer hover:fill-[#f27002]" />
                <span v-if="authenticated" class="text-white">
                  Hi, {{ user.username }}
                </span>
              </div>
            </template>
            <template #dropdown-content>
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <div v-if="authenticated">
                  <li>
                    <a href="/account"
                      class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      <PhUserCheck size="24" />
                      <span>
                        My Account
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/register"
                      class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      <PhSignOut size="24" />
                      <span>
                        Logout
                      </span>
                    </a>
                  </li>
                </div>
                <div v-else>
                  <li>
                    <a href="/sign-in"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Sign in
                    </a>
                  </li>
                  <li>
                    <a href="/register"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Register
                    </a>
                  </li>
                </div>
              </ul>
            </template>
          </Dropdown>
          <CartIcon />
        </div>
      </div>
    </div>
    <div
      class="header-bottom opacity-0 md:opacity-100 bg-[#f27002] text-center w-full px-0 py-2">
      <div class="container">
        <div class="flex items-center">
          <ShopByCategoryDropdown />
          <div class="flex items-center">
            <div class="cursor-pointer group mt-1.5 mb-0 mx-2">
              <NuxtLink to="/about-us"
                class="group-hover:bg-[#443e40] text-white no-underline block float-left overflow-hidden relative capitalize z-[1] transition-all duration-[0.4s] ease-[ease-in-out] m-0 px-5 py-3 rounded-lg">
                About Us
              </NuxtLink>
            </div>
            <div class="flex items-center group mt-1.5 mb-0 mx-2">
              <NuxtLink to="/affiliate"
                class="group-hover:bg-[#443e40] text-white no-underline block float-left overflow-hidden relative capitalize z-[1] transition-all duration-[0.4s] ease-[ease-in-out] m-0 px-5 py-3 rounded-lg">
                Affiliate
              </NuxtLink>
            </div>
            <div class="flex items-center group mt-1.5 mb-0 mx-2">
              <NuxtLink to="/contact-us"
                class="group-hover:bg-[#443e40] text-white no-underline block float-left overflow-hidden relative capitalize z-[1] transition-all duration-[0.4s] ease-[ease-in-out] m-0 px-5 py-3 rounded-lg">
                Contact Us
              </NuxtLink>
            </div>
            <div class="cursor-pointer group mt-1.5 mb-0 mx-2">
              <NuxtLink to="/return-policy"
                class="group-hover:bg-[#443e40] text-white no-underline block float-left overflow-hidden relative capitalize z-[1] transition-all duration-[0.4s] ease-[ease-in-out] m-0 px-5 py-3 rounded-lg">
                Return Policy
              </NuxtLink>
            </div>
            <Dropdown dropdown-button-id="more-dropdown" :should-open-on-hover="true"
              content-class-names="left-0 top-[50px]">
              <template #trigger>
                <div class="cursor-pointer group mt-1.5 mb-0 mx-2 flex items-center">
                  <a
                    class="flex items-center gap-1 group-hover:bg-[#443e40] text-white no-underline block float-left overflow-hidden relative capitalize z-[1] transition-all duration-[0.4s] ease-[ease-in-out] m-0 px-5 py-3 rounded-lg">
                    <span>
                      More
                    </span>
                    <PhCaretDown color="#fff" />
                  </a>
                </div>
              </template>
              <template #dropdown-content>
                <div
                  class="preview-cart max-h-[496px] w-[200px] overflow-y-auto px-[15px] py-[5px] bg-[white] rounded-lg">
                  <div>
                    <NuxtLink class="text-[#666] leading-[26px] hover:text-[#111]" to="/terms-and-conditions">
                      Terms & Conditions
                    </NuxtLink>
                  </div>
                  <div>
                    <NuxtLink class="text-[#666] leading-[26px] hover:text-[#111]" to="/shipping-policy">
                      Shipping Policy
                    </NuxtLink>
                  </div>
                  <div>
                    <NuxtLink class="text-[#666] leading-[26px] hover:text-[#111]" to="/blogs">
                      Blogs
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header .header-center.fixed {
  border: medium none;
  left: 0;
  margin: 0;
  position: fixed!important;
  right: 0;
  top: 0;
  width: 100%;
  padding: 5px 0;
  z-index: 9;
  background: #f27002;
  box-shadow: 0 0 4px 0 rgba(0,0,0,.2);
  -moz-box-shadow: 0 0 4px 0 rgba(0,0,0,.2);
  -webkit-box-shadow: 0 0 4px 0 rgba(0,0,0,.2);
  transition: all .4s ease 0s;
  animation: fixedmenu 0.5s ease 0s normal both 1 running;
  -webkit-animation: fixedmenu 0.5s ease 0s normal both 1 running;
  -moz-animation: fixedmenu 0.5s ease 0s normal both 1 running;
  -o-animation: fixedmenu 0.5s ease 0s normal both 1 running;
  min-height: auto;
}

@keyframes fixedmenu {
    0% {
        top: -100%
    }

    100% {
        top: 0
    }
}

.header-center {
  @media (min-width: 320px) and (max-width: 639px) {
  .container {
    width: calc(100vw - 20px);
    margin: 0;
  }
}
}
</style>