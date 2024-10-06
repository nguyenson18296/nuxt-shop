<script setup lang="ts">
import { PhMapPin, PhEnvelope, PhPhone } from "@phosphor-icons/vue";
import { storeToRefs } from 'pinia';
import { twMerge } from 'tailwind-merge';

import { useCategoriesStore } from "@/stores/categories";

const categoriesStore = useCategoriesStore();

const { categories } = storeToRefs(categoriesStore);

onMounted(async () => {
  await categoriesStore.fetchCategories();
});

</script>

<template>
  <footer>
    <div class="subscription w-full bg-[#f27002]">
      <div class="container py-[18px]">
        <article class="full-subscription flex flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-12">
          <div
            :class="twMerge(
              'flex-[0_0_100%] lg:flex-[0_0_50%]',
              'text-white flex flex-wrap justify-center md:justify-start items-center gap-4'
            )">
            <h5 class="footer-heading text-xl flex items-center gap-2">
              <PhEnvelope :size="32" />
              <span>
                Sign Up For Newsletter
              </span>
            </h5>
            <p>
              ...and receive $20 coupon on next shopping
            </p>
          </div>
          <div class="relative w-full flex flex-wrap">
            <input
              class="text-sm w-full pl-5 h-12 pr-[147px] py-0 rounded-[25px]"
              placeholder="Enter your email address"
            />
            <input
              type="submit"
              value="Subscribe"
              class="w-auto absolute text-sm h-12 px-8 text-white border-[#443e40] -right-0.5 bg-[#443e40] rounded-[25px] cursor-pointer hover:bg-[#191919]"
            />
          </div>
        </article>
      </div>
    </div>
    <div class="footer-link bg-[#191919] pt-10 pb-2.5">
      <div class="container">
        <section class="footer-info flex flex-wrap gap-2 items-start">
          <article class="store-info-payment flex-[0_0_25%]">
            <h5 class="text-white cursor-pointer text-lg font-semibold leading-[22px] capitalize mt-0 mb-5 mx-0">
              Info
            </h5>
            <ul class="text-[#aaa] text-[13px] leading-6">
              <li class="flex items-start">
                <PhMapPin size="40" class="mr-[5px]" />
                <p>
                  A-1011, Acme Widgets
                  123 Widget Street
                  Acmeville, AC 12345
                  United States of America
                </p>
              </li>
              <li class="flex items-center">
                <PhEnvelope size="20" class="mr-[5px]" />
                <p>
                  support@yourstore.com
                </p>
              </li>
              <li class="flex items-center">
                <PhPhone size="20" class="mr-[5px]" />
                <p class="text-base font-bold text-[#f27002]">
                  (00)1234 567891
                </p>
              </li>
            </ul>
          </article>
          <article class="footer-link flex-[0_0_100%] lg:flex-[0_0_25%]">
            <h5 class="text-white cursor-pointer text-lg font-semibold leading-[22px] capitalize mt-0 mb-5 mx-0">
              Navigate
            </h5>
            <ul class="text-[#aaa] text-[13px] leading-6">
              <li>
                <nuxt-link to="/">About Us</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">Contact Us</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">Terms & Conditions</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">Blog</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">Affiliate</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">Return Policy</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">Shipping & Returns</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">Sitemap</nuxt-link>
              </li>
            </ul>
          </article>
          <article class="footer-categories flex-[0_0_100%] lg:flex-[0_0_25%]">
            <h5 class="text-white cursor-pointer text-lg font-semibold leading-[22px] capitalize mt-0 mb-5 mx-0">
              Categories
            </h5>
            <ul class="text-[#aaa] text-[13px] leading-6">
              <li v-for="category in categories" :key="category.id">
                <nuxt-link :to="`/category/${category.slug}`">{{ category.title }}</nuxt-link>
              </li>
            </ul>
          </article>
          <article class="footer-popular-brands flex-[0_0_100%] lg:flex-[0_0_25%]">
            <h5 class="text-white cursor-pointer text-lg font-semibold leading-[22px] capitalize mt-0 mb-5 mx-0">
              Popular Brands
            </h5>
            <ul>
              <li class="w-auto inline-block ml-0 mr-[5px] mt-0 mb-[5px]">
                <a class="w-auto px-[7px] py-[5px] rounded-[5px] bg-[#222] text-[#aaa] leading-6 text-[13px]">
                  Apple
                </a>
              </li>
              <li class="w-auto inline-block ml-0 mr-[5px] mt-0 mb-[5px]">
                <a class="w-auto px-[7px] py-[5px] rounded-[5px] bg-[#222] text-[#aaa] leading-6 text-[13px]">
                  Samsung
                </a>
              </li>
              <li class="w-auto inline-block ml-0 mr-[5px] mt-0 mb-[5px]">
                <a class="w-auto px-[7px] py-[5px] rounded-[5px] bg-[#222] text-[#aaa] leading-6 text-[13px]">
                  Xiaomi
                </a>
              </li>
              <li class="w-auto inline-block ml-0 mr-[5px] mt-0 mb-[5px]">
                <a class="w-auto px-[7px] py-[5px] rounded-[5px] bg-[#222] text-[#aaa] leading-6 text-[13px]">
                  ASUS
                </a>
              </li>
              <li class="w-auto inline-block ml-0 mr-[5px] mt-0 mb-[5px]">
                <a class="w-auto px-[7px] py-[5px] rounded-[5px] bg-[#222] text-[#aaa] leading-6 text-[13px]">
                  Dell
                </a>
              </li>
              <li class="w-auto inline-block ml-0 mr-[5px] mt-0 mb-[5px]">
                <a class="w-auto px-[7px] py-[5px] rounded-[5px] bg-[#222] text-[#aaa] leading-6 text-[13px]">
                  HP
                </a>
              </li>
              <li class="w-auto inline-block ml-0 mr-[5px] mt-0 mb-[5px]">
                <a class="w-auto px-[7px] py-[5px] rounded-[5px] bg-[#222] text-[#aaa] leading-6 text-[13px]">
                  Sony
                </a>
              </li>
              <li class="w-auto inline-block ml-0 mr-[5px] mt-0 mb-[5px]">
                <a class="w-auto px-[7px] py-[5px] rounded-[5px] bg-[#222] text-[#aaa] leading-6 text-[13px]">
                  Canon
                </a>
              </li>
            </ul>
          </article>
        </section>
      </div>
      <div class="social-copyright bg-[#222]">
        <div class="container">
          <div class="footer-payments">
            <ul class="footer-payment-icons px-0 py-2.5 flex items-center gap-4">
              <li>
                <img src="/img/american-express.svg" alt="american-express" class="w-[40px] h-[40px]" />
              </li>
              <li>
                <img src="/img/discover.svg" alt="discover" class="w-[40px] h-[40px]" />
              </li>
              <li>
                <img src="/img/mastercard.svg" alt="mastercard" class="w-[40px] h-[40px]" />
              </li>
              <li>
                <img src="/img/paypal.svg" alt="paypal" class="w-[40px] h-[40px]" />
              </li>
              <li>
                <img src="/img/visa.svg" alt="visa" class="w-[40px] h-[40px]" />
              </li>
              <li>
                <img src="/img/amazon-pay.svg" alt="amazon-pay" class="w-[40px] h-[40px]" />
              </li>
              <li>
                <img src="/img/google-pay.svg" alt="google-pay" class="w-[40px] h-[40px]" />
              </li>
            </ul>
          </div>
          <div class="copyright text-center">
            <p class="text-[#aaa] text-[13px] leading-6">
              © 2024 Your Store. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>