<script setup lang="ts">
const { isLoading } = useLoading();

console.log('isLoading', isLoading.value);

</script>

<template>
  <div v-if="isLoading" id="loading">
    <div class="loader008"></div>
  </div>
</template>

<style scoped>
#loading {
  width: 100%;
  height: 100%;
  background: #9a7948;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader008,
.loader008:after {
  border-radius: 50%;
  width: 4.5rem;
  height: 4.5rem;
}

.loader008 {
  position: relative;
  text-indent: -9999em;
  border-top: 0.3rem solid rgba(255, 255, 255, 0.3);
  border-right: 0.3rem solid rgba(255, 255, 255, 0.3);
  border-bottom: 0.3rem solid rgba(255, 255, 255, 0.3);
  border-left: 0.3rem solid #fff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

#loading.loaded {
  opacity: 0;
  visibility: hidden;
  transition: opacity 1s, visibility 1s;
}
</style>