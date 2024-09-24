<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { PhCaretDown, PhMagnifyingGlass, PhPhone, PhHeart, PhUser, PhUserCheck, PhSignOut } from "@phosphor-icons/vue";
import { useAuthStore, type UserInterface } from '@/stores/auth';

const { user, authenticated } = storeToRefs(useAuthStore());
const { setUser } = useAuthStore();
const token = useCookie('token')

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

getMe();
</script>

<template>
  <header>
    <div class="header-center bg-[#443e40] px-0 py-[15px] w-full">
      <div class="container !flex items-center">
        <div class="header-logo text-center mt-[22px] mb-[19px] mx-0 lg:p-0">
          <NuxtLink href="/">
            <img src="/img/flex-cart.webp" alt="flex-cart" />
          </NuxtLink>
        </div>
        <div class="search-bar w-[40%] px-[15px] py-0">
          <div class="w-full relative">
            <input class="w-full px-4 text-sm h-[50px] text-[#666] rounded-lg border-[none] bg-white" />
            <div class="search-icon absolute top-0 right-0 bottom-0 flex items-center justify-center">
              <button
                class="flex items-center gap-2 bg-[#443e40] text-white tracking-[1px] h-11 normal-case float-left w-auto relative transition-[0.5s] duration-[ease-in-out] mx-[5px] my-[3px] px-5 py-3.5 rounded-lg border-[none]">
                <span>
                  Search
                </span>
                <PhMagnifyingGlass :size="24" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="bg-[#f27002] rounded-lg px-2.5 py-[12px] cursor-pointer contact-number w-[16%] text-white flex items-center gap-2">
          <PhPhone />
          <div>
            +(00)1234 567891
          </div>
        </div>
        <div class="ml-4 nav-user flex items-center gap-4">
          <PhHeart :size="30" color="white" class="cursor-pointer hover:fill-[#f27002]" />
          <Dropdown
            dropdownButtonId="user-dropdown"
          >
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
    <div class="header-bottom bg-[#f27002] text-center w-full px-0 py-2">
      <div class="container">
        <div class="flex items-center">
          <ShopByCategoryDropdown />
          <div class="flex items-center">
            <div class="cursor-pointer group mt-1.5 mb-0 mx-2">
              <a
                class="group-hover:bg-[#443e40] text-white no-underline block float-left overflow-hidden relative capitalize z-[1] transition-all duration-[0.4s] ease-[ease-in-out] m-0 px-5 py-3 rounded-lg">
                About Us
              </a>
            </div>
            <div class="flex items-center group mt-1.5 mb-0 mx-2">
              <a
                class="group-hover:bg-[#443e40] text-white no-underline block float-left overflow-hidden relative capitalize z-[1] transition-all duration-[0.4s] ease-[ease-in-out] m-0 px-5 py-3 rounded-lg">
                Affiliate
              </a>
            </div>
            <div class="flex items-center group mt-1.5 mb-0 mx-2">
              <a
                class="group-hover:bg-[#443e40] text-white no-underline block float-left overflow-hidden relative capitalize z-[1] transition-all duration-[0.4s] ease-[ease-in-out] m-0 px-5 py-3 rounded-lg">
                Contact Us
              </a>
            </div>
            <div class="cursor-pointer group mt-1.5 mb-0 mx-2">
              <a
                class="group-hover:bg-[#443e40] text-white no-underline block float-left overflow-hidden relative capitalize z-[1] transition-all duration-[0.4s] ease-[ease-in-out] m-0 px-5 py-3 rounded-lg">
                Return Policy
              </a>
            </div>
            <div class="cursor-pointer group mt-1.5 mb-0 mx-2">
              <a
                class="group-hover:bg-[#443e40] text-white no-underline block float-left overflow-hidden relative capitalize z-[1] transition-all duration-[0.4s] ease-[ease-in-out] m-0 px-5 py-3 rounded-lg">
                Terms & Conditions
              </a>
            </div>
            <div class="cursor-pointer group mt-1.5 mb-0 mx-2 flex items-center">
              <a
                class="group-hover:bg-[#443e40] text-white no-underline block float-left overflow-hidden relative capitalize z-[1] transition-all duration-[0.4s] ease-[ease-in-out] m-0 px-5 py-3 rounded-lg">
                More
              </a>
              <PhCaretDown color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
