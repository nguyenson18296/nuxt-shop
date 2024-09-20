<script setup lang="ts">
const email = defineModel<string>('email', {
  default: ''
});
const password = defineModel<string>('password', {
  default: ''
});

const { login } = useAuthStore();
const router = useRouter();

const onLogin = async () => {
  await login({
    email: email.value,
    password: password.value
  });
  router.push('/');
}

</script>

<template>
  <div class="w-[66.66667%] mx-auto px-3 pb-10">
    <div
      class="page-heading mt-0 mb-[15px] mx-0 text-[#222] font-bold text-[22px] leading-[34px] relative capitalize w-full tracking-[0.8px] text-left z-[1] m-0 px-0 py-1.5">
      <span class="relative bg-[#fff] z-[2] pl-0 pr-[25px] py-0">
        Sign in
      </span>
    </div>
    <div class="max-w-[120rem] w-full mt-6 mx-auto my-0 flex items-center gap-4">
      <form class="login-form flex-[0_0_50%] mt-12 mb-6" @submit.prevent="onLogin">
        <div class="form-group mb-6">
          <label for="email" class="text-[#666] cursor-pointer block text-[13px] leading-normal mb-2">Email Address:</label>
          <input
            v-model="email"
            type="email" 
            id="email"
            name="email" 
            class="appearance-none bg-white border-neutral-200 border rounded text-[#666] block text-[13px] antialiased h-12 transition-[border-color] duration-[0.1s] ease-[ease-out] w-full m-0 px-4 py-3 border-solid"
          />
        </div>
        <div class="form-group">
          <label for="password" class="text-[#666] cursor-pointer block text-[13px] leading-normal mb-2">Password:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="appearance-none bg-white border-neutral-200 border rounded text-[#666] block text-[13px] antialiased h-12 transition-[border-color] duration-[0.1s] ease-[ease-out] w-full m-0 px-4 py-3 border-solid"
          />
        </div>
        <div class="form-actions mt-4 flex items-center gap-2">
          <button type="submit" class="bg-[#443e40] text-white rounded-[25px] font-semibold text-sm px-[2.28571rem] py-[0.85714rem]">
            Sign in
          </button>
          <a class="text-[#666]">
            Forgot password?
          </a>
        </div>
      </form>
      <div class="new-customer bg-[#f5f5f5] px-3">
        <div class="panel-header pt-6 pb-0 px-8">
          <h2 class="panel-title font-bold text-[#000]">
            New Customer?
          </h2>
        </div>
        <div class="panel-body mb-6 pt-4 pb-6 px-8 text-[#666]">
          <p>
            Create an account with us and you'll be able to:
          </p>
          <ul class="ml-6 my-2.5 list-disc">
            <li>
              Check out faster
            </li>
            <li>
              Save multiple shipping addresses
            </li>
            <li>
              Access your order history
            </li>
            <li>
              Track new orders
            </li>
            <li>
              Save items to your Wish list
            </li>
          </ul>
          <button class="bg-[#443e40] text-white rounded-[25px] font-semibold text-sm px-[2.28571rem] py-[0.85714rem]">
            Create Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-heading:after {
  background: #f5f5f5;
  content: "";
  bottom: 0;
  top: 3px;
  width: 100%;
  height: 3px;
  position: absolute;
  left: 0;
  right: auto;
  margin: auto;
  transition: all .4s ease-in-out;
}
</style>
