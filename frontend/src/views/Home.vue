<template>
  <div class="absolute w-full z-30">
    <Header></Header>
  </div>

  <div class="grid lg:flex pt-24 lg:pt-0 pb-12">
    <div class="hidden lg:block lg:w-2/5">
      <video class="w-full h-auto" autoplay muted loop>
        <source src="@/assets/videos/home/presentation.mp4" type="video/mp4">
      </video>
    </div>
    <div
      class="w-full lg:w-3/5 bg-second_p flex flex-col justify-center lg:px-32"
    >
      <p
        class="uppercase pb-4 font-regular tracking-widest text-center text-gray_p lg:text-start text-base md:text-2xl lg:text-xl"
      >
        {{ $t('candle_tag') }}
      </p>
      <p class="px-3 lg:px-0 pb-8 text-center lg:text-start">
        <span class="font-semibold text-4xl md:text-6xl 2xl:text-8xl"
          >{{ $t('candle_title').first }}
        </span>
        <span
          class="text-primary_p font-semibold text-4xl md:text-6xl 2xl:text-8xl"
          >{{ $t('candle_title').second }}
        </span>
        <span
          class="text-black_p font-semibold text-4xl md:text-6xl 2xl:text-8xl"
          >{{ $t('candle_title').therciary }}
        </span>
        <span
          class="font-special text-primary_p text-5xl md:text-7xl 2xl:text-9xl"
          >{{ $t('candle_title').fourth }}</span
        >
      </p>
      <div class="flex justify-center lg:justify-start">
        <RouterLink
          :to="{ name: 'products' }"
          class="inline-block font-regular rounded-full bg-black_p py-4 px-8 xl:text-md 2xl:text-lg text-second_p shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-primary_p uppercase"
        >
          {{ $t('candle_button') }}
        </RouterLink>
      </div>
    </div>
    <div class="lg:hidden w-full mt-10">
      <video class="w-full h-auto" autoplay muted loop>
        <source src="@/assets/videos/home/presentation.mp4" type="video/mp4">
      </video>
    </div>
  </div>

  <div
    class="mx-auto flex flex-col items-center justify-center max-w-7xl px-8 pb-12"
  >
    <h2
      class="uppercase pb-4 font-regular tracking-widest text-gray_p text-center text-2xl"
    >
      {{ $t('trending_tag') }}
    </h2>
    <h2 class="pb-4 font-semibold text-center text-4xl">
      {{ $t('carousel_subtitle') }}
    </h2>
    <ProductCarousel :top="4"></ProductCarousel>
  </div>

  <div class="mx-auto relative flex flex-col items-center justify-center pb-12">
      <video class="w-full h-auto p-20 pb-12" autoplay muted loop>
        <source src="@/assets/videos/home/banner.mp4" type="video/mp4">
      </video>
    <RouterLink
      :to="{ name: 'products' }"
      class="font-regular rounded-full bg-white py-4 px-16 text-xl text-black_p shadow-sm ring-1 ring-inset ring-primary_p hover:bg-black_p hover:text-second_p hover:ring-transparent uppercase"
    >
      {{ $t('show_more_button') }}
    </RouterLink>
  </div>

  <div class="bg-cream_p py-20">
    <div class="mx-auto flex flex-col xl:px-16 pb-12">
      <img src="@/assets/images/home/banner_3.jpg" class="w-full h-auto pb-8" />
      <h2 class="font-bold text-4xl px-8 xl:px-0 pb-6">{{ $t('nature_subtitle') }}</h2>
      <p
        class="pb-4 px-8 xl:px-0 font-medium text-3xl tracking-wide w-full xl:w-1/2 text-black_p"
      >
        {{ $t('nature_description') }}
      </p>
    </div>
    <div class="mx-auto xl:flex xl:px-16 pb-12">
      <div class="w-full xl:w-1/2">
        <img src="@/assets/images/home/banner_4.jpg" class="w-full h-auto" />
      </div>
      <div class="w-full xl:w-1/2 flex flex-col xl:pl-6">
        <img
          src="@/assets/images/home/banner_5.jpg"
          class="w-full h-auto pb-4"
        />
        <h2 class="font-bold text-4xl px-8 xl:px-0 pb-6">{{ $t('durable_subtitle') }}</h2>
        <p class="text-3xl font-medium tracking-wide px-8 xl:px-0">
          {{ $t('durable_description') }}
        </p>
      </div>
    </div>
    <div class="mx-auto xl:flex px-0 xl:px-16 pb-12">
      <div class="w-full xl:w-1/2 flex flex-col">
        <img
          src="@/assets/images/home/banner_6.jpg"
          class="w-full h-auto pb-4"
        />
        <h2 class="font-bold text-4xl pb-6 px-8 xl:px-0">{{ $t('calm_subtitle') }}</h2>
        <p class="text-3xl font-medium tracking-wide pb-8 px-8 xl:px-8">
          {{ $t('calm_description') }}
        </p>
      </div>
      <div class="w-full xl:w-1/2">
        <img
          src="@/assets/images/home/banner_7.jpg"
          class="w-full h-auto xl:pl-6"
        />
      </div>
    </div>
  </div>

  <div class="mx-auto relative">
    <div class="relative z-10">
      <img
        src="@/assets/images/home/banner_8.jpg"

        class="w-full  mx-auto h-auto relative z-20 object-cover object-center"

      />
        <h1
          class="hidden w-full text-center top-60 font-bold text-second_p text-6xl md:text-8xl xl:absolute xl:inline-block tracking-wider"
        >
          <span class="relative z-30">{{ $t('fragance_room').first }}</span>
          <span class="relative z-30">{{ $t('fragance_room').second }}</span>
          <span class="relative z-30">{{ $t('fragance_room').third }}</span>
        </h1>
      <div class="absolute bottom-14 left-1/2 -translate-x-1/2 z-30">
        <RouterLink
          :to="{ name: 'products' }"
          type="button"
          class="font-regular tracking-wider rounded-full bg-black_p py-3 px-14 text-sm text-second_p shadow-sm hover:bg-second_p hover:text-black_p uppercase"
        >
          {{ $t('find_button') }}
        </RouterLink>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-shadow_home to-transparent"
    ></div>
  </div>
  <FAQS></FAQS>
  <Footer></Footer>
</template>

<script setup>
  import Header from "@/components/layouts/Header.vue";
  import Footer from "@/components/layouts/Footer.vue";
  import ProductCarousel from "@/components/product/ProductCarousel.vue";
  import FAQS from "@/components/home/FAQS.vue";
  import { useAppStore } from '@/stores/language.js';
  import enMessages from '@/locales/home/en.js';
  import esMessages from '@/locales/home/es.js';
  import { onMounted, watchEffect , ref } from "vue";

  const messages = ref(enMessages);
  const $t = (key) => messages.value[key];
  const appStore = useAppStore();
  const currentLanguage = ref('');

  onMounted(() => {
    window.scrollTo({ top: 0 });
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
