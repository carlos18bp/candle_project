<template>
  <Header></Header>
  <!--Content block-->
  <div class="bg-primary_p relative">
    <div class="grid xl:grid-cols-2 gap-6">
      <div class="p-8 md:p-16">
        <h1 class="font-semibold text-5xl md:text-7xl text-second_p">
          {{ $t('main_title') }}
        </h1>
      </div>
      <div class="xl:w-3/4 px-8 md:px-16 xl:px-0 pb-16 flex items-end">
        <p class="text-second_p font-regular text-2xl md:text-4xl">
          {{ $t('main_description') }}
        </p>
      </div>
    </div>
  </div>

  <!--Content Block-->
  <div class="relative xl:h-96">
    <!--Content-->
    <div class="xl:absolute inset-0 grid xl:grid-cols-3 xl:gap-4">
      <div class="flex justify-end xl:justify-normal xl:items-center">
        <img
          class="w-full xl:w-full xl:h-3/4"
          src="@/assets/images/aboutUs/About1.jpg"
        />
      </div>
      <div>
        <img
          class="w-full xl:w-full"
          src="@/assets/images/aboutUs/About2.jpg"
        />
      </div>
      <div class="flex items-center justify-end">
        <img
          class="w-full xl:w-full xl:h-3/4"
          src="@/assets/images/aboutUs/About3.jpg"
        />
      </div>
    </div>
    <!--Halfs-->
    <div class="h-1/2 w-full bg-primary_p"></div>
    <div class="h-1/2 w-full bg-second_p"></div>
  </div>

  <!--Content-->
  <div class="relative mt-20 p-8 md:p-20">
    <h2 class="font-bold text-2xl tracking-widest text-black_p">{{ $t('our_product') }}</h2>
    <div class="relative grid xl:grid-cols-3 gap-4 mt-16 items-center">
      <div class="flex items-center justify-center xl:hidden">
        <img
          class="h-full w-auto"
          src="@/assets/images/aboutUs/candleJar.jpg"
          alt="..."
        />
      </div>

      <div>
        <div class="xl:w-3/4">
          <h3 class="text-2xl font-bold text-black_p">{{ $t('nature_title') }}</h3>
          <p class="text-xl font-medium text-gray_p mt-5">
            {{ $t('nature_description') }}
          </p>
        </div>
        <div class="xl:w-3/4 mt-10">
          <h3 class="text-2xl font-bold text-black_p">{{ $t('premium_title') }}</h3>
          <p class="text-xl font-medium text-gray_p mt-5">
            {{ $t('premium_description') }}
          </p>
        </div>
      </div>

      <div class="hidden xl:flex items-center justify-center">
        <img
          class="h-full w-auto"
          src="@/assets/images/aboutUs/candleJar.jpg"
          alt="..."
        />
      </div>

      <div>
        <div class="flex justify-end">
          <div class="xl:w-3/4">
            <h3 class="text-2xl text-end font-bold text-black_p">{{ $t('unique_title') }}</h3>
            <p class="text-xl text-end font-medium text-gray_p mt-5">
              {{ $t('unique_description') }}
            </p>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="xl:w-3/4 mt-10">
            <h3 class="text-2xl text-end font-bold text-black_p">{{ $t('economical_title') }}</h3>
            <p class="text-xl text-end font-medium text-gray_p mt-5">
              {{ $t('economical_description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--Video Content-->
  <div class="relative xl:p-20 flex justify-center">
    <video class="w-full h-auto" autoplay muted loop>
        <source src="@/assets/videos/about_us/presentation.mp4" type="video/mp4">
      </video>
  </div>

  <!--Content-->
  <div class="relative py-20 md:p-20 grid xl:grid-cols-2 gap-20 items-center">
    <div>
      <img class="w-auto h-full" src="@/assets/images/general/hazelnuts.avif" />
    </div>

    <div class="grid grid-cols-1 gap-16">
      <div class="px-8 md:px-0 md:w-3/4 h-auto">
        <h2 class="font-bold text-2xl text-black_p">{{ $t('why_senses') }}</h2>
        <p class="font-semibold text-xl text-gray_p">
          {{ $t('why_description') }}
        </p>
      </div>
      <div class="px-8 md:px-0 md:w-3/4 h-auto">
        <h2 class="font-bold text-2xl text-black_p">{{ $t('mission') }}</h2>
        <p class="font-semibold text-xl text-gray_p">
          {{ $t('mission_description') }}
        </p>
      </div>
    </div>
  </div>

  <!--Banner-->
  <div class="relative p-16 flex justify-center items-center bg-primary_p">
    <div class="inline-block">
      <h1 class="inline-block text-second_p tracking-wider">
        <span class="font-semibold text-4xl">{{ $t('candle_banner').first }}</span
        ><span class="font-special text-5xl">{{ $t('candle_banner').second }}</span>
      </h1>
      <div class="flex justify-end">
        <img src="@/assets/images/aboutUs/lineCurved.png" alt="..." />
      </div>
    </div>
  </div>

  <!--Reviews-->
  <div class="relative xl:p-20">
    <div class="bg-white md:p-10">
      <div>
        <h2 class="sr-only">Customer Reviews</h2>

        <div class="-my-10">
          <swiper
            :spaceBetween="30"
            :centeredSlides="true"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
            :pagination="{
              clickable: true,
            }"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide
              class="w-full"
              v-for="(review, reviewIdx) in reviews"
              :key="review.id"
            >
              <div class="p-8 md:p-16 w-full grid xl:grid-cols-6 gap-6">
                <div class="grid xl:grid-cols-2 gap-6">
                  <img
                    src="@/assets/images/user_avatar.jpg"
                    alt="..."
                    style="width: 75%; height: auto"
                  />

                  <div>
                    <h2 class="font-bold text-2xl text-black_p">
                      {{ review.user_full_name }}
                    </h2>
                  </div>
                </div>

                <div class="w-auto col-span-5">
                  <div class="max-w-8">
                    <img src="@/assets/images/aboutUs/resource.png" />
                  </div>
                  <div class="mt-8 md:mt-0 md:ps-16">
                    <p class="font-medium text-3xl text-justify">
                      {{ review.description }}
                    </p>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  import { Autoplay, Pagination, Navigation } from "swiper/modules";
  import { onMounted, ref, watchEffect } from "vue";
  import Header from "@/components/layouts/Header.vue";
  import Footer from "@/components/layouts/Footer.vue";
  import { useReviewStore } from "@/stores/review";
  import { useAppStore } from '@/stores/language.js';
  import enMessages from '@/locales/about_us/en.js';
  import esMessages from '@/locales/about_us/es.js';

  const messages = ref(enMessages);
  const $t = (key) => messages.value[key];
  const appStore = useAppStore();
  const currentLanguage = ref('');
  const reviewtStore = useReviewStore();
  const reviews = ref([]);
  const modules = [Autoplay, Pagination, Navigation];

  onMounted(async () => {
    watchEffect(() => {
      currentLanguage.value = appStore.getCurrentLanguage;
      if (currentLanguage.value === 'en') {
        messages.value = enMessages;
      } else {
        messages.value = esMessages;
      }
    });
    await reviewtStore.fetchReviewsData();
    reviews.value = reviewtStore.reviews;
  });
</script>

<style>
.mySwiper {
  width: 100%;
  height: 100%;
}

.mySwiper .swiper-pagination-bullet {
  background-color: #555659;
}

.mySwiper .swiper-pagination-bullet-active {
  background-color: #cead95;
}

.mySwiper .swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mySwiper .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
