<template>
  <div v-if="currentLanguage === 'en'" class="bg-black py-2">
    <vue-marquee-slider
    class="text-white font-semibold tracking-wider"
    id="marquee-slider-text"
    :space="0"
    :speed="30000"
    :width="900"
  >
    <span class="flex justify-center"><div class="flex">{{ $t('reminder') }}<div class="p-1"><img src="@/assets/images/icons/us.png" class="w-6"></div></div></span>
    <span class="flex justify-center">{{ $t('shipping') }}</span>
  </vue-marquee-slider>
  </div>
  <div v-else class="bg-black py-2">
    <vue-marquee-slider
    class="text-white font-semibold tracking-wider"
    id="marquee-slider-text"
    :space="0"
    :speed="30000"
    :width="900"
  >
    <span class="flex justify-center"><div class="flex">{{ $t('reminder') }}<div class="p-1"><img src="@/assets/images/icons/us.png" class="w-6"></div></div></span>
    <span class="flex justify-center">{{ $t('shipping') }}</span>
  </vue-marquee-slider>
  </div>
</template>
<script setup>
  import { VueMarqueeSlider } from "vue3-marquee-slider";
  import { watchEffect, ref, onBeforeMount } from "vue";
  import { useAppStore } from '@/stores/language.js';
  import enMessages from '@/locales/layout/banner/en.js';
  import esMessages from '@/locales/layout/banner/es.js';
  
  const messages = ref('');
  const $t = (key) => messages.value[key];
  const appStore = useAppStore();
  const currentLanguage = ref('');

  onBeforeMount(() => {
    watchEffect(() => {
        currentLanguage.value = appStore.getCurrentLanguage;
        if (currentLanguage.value === 'en') {
          messages.value = enMessages;
        } else {
          messages.value = esMessages;
        }
      });
  })
</script>

<style>
  ._marqueeSlider_1htck_3 {
    overflow: hidden;
  }
  ._marqueeSliderContainer_1htck_11 {
    width: 100%;
    animation-name: _horizontalAnimation_1htck_1;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    display: flex;
  }
  ._marqueeSliderContainerVertical_1htck_27 {
    height: fit-content;
    animation-name: _verticalAnimation_1htck_1;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    display: flex;
    flex-direction: column;
  }
  @keyframes _horizontalAnimation_1htck_1 {
    0% {
      transform: translate(0);
    }
    to {
      transform: translate(-100%);
    }
  }

  @keyframes _verticalAnimation_1htck_1 {
    0% {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }
</style>