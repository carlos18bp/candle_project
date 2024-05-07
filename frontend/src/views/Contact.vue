<template>
  <Banner></Banner>
  <Header></Header>
  <div class="mx-auto relative flex flex-col items-center">
    <img src="@/assets/images/contact/banner_1.jpg" class="w-full h-full" />
    <div
      class="rounded-3xl relative xl:absolute bg-second_p flex flex-col w-auto p-8 xl:top-28 xl:left-28"
    >
      <h2 class="font-bold text-center text-4xl pb-8">{{ $t('contact_title') }}</h2>
      <h2 class="font-bold pb-6 text-4xl">{{ $t('contact') }}</h2>
      <div class="pb-8">
        <div class="flex items-center pb-4">
          <div class="flex items-center w-8">
            <img src="@/assets/images/icons/phone_call.png" class="size-6" />
          </div>
          <a href="tel:+17049005171" class="font-regular text-2xl pl-2">+1 (704) 900-5171</a>
        </div>
        <div class="flex items-center pb-4">
          <div class="flex items-center w-8">
            <img src="@/assets/images/icons/sharp_email.png" class="size-6" />
          </div>
          <a href="mailto:sensescandlesbykate@gmail.com" class="font-regular text-2xl pl-2">sensescandlesbykate@gmail.com</a>
        </div>
        <div class="flex items-center">
          <div class="flex items-center w-8">
            <img src="@/assets/images/icons/location.png" class="size-6" />
          </div>
          <p class="font-regular text-2xl pl-2">Charlotte | NC-SC</p>
        </div>
      </div>
      <!-- Map Container -->
      <div class="w-full h-40 relative">
        <GoogleMap
          api-key="AIzaSyD7cf5pD4u32w9k2zEnjq19nd8WlGmm-ls"
          class="h-full"
          :center="center"
          :zoom="10"
        >
          <Marker :options="{ position: center }" />
        </GoogleMap>
      </div>
      <div class="flex justify-evenly pt-8">
        <a href="https://wa.me/17049005171" target="_blank">
          <i class="bi bi-whatsapp text-4xl"></i>
        </a>
        <a href="https://www.tiktok.com/@sensescandlesbykate?_t=8lCy5sMMc1a&_r=1" target="_blank">
          <i class="bi bi-tiktok text-4xl"></i>
        </a>
        <a href="https://www.instagram.com/sensescandlesbykate?igsh=YnhsMmZrbXh2amMy&utm_source=qr" target="_blank">
          <i class="bi bi-instagram text-4xl"></i>
        </a>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
  import Banner from "@/components/layouts/Banner.vue";
  import { GoogleMap, Marker } from "vue3-google-map";
  import Header from "@/components/layouts/Header.vue";
  import Footer from "@/components/layouts/Footer.vue";
  import { useAppStore } from '@/stores/language.js';
  import enMessages from '@/locales/contact/en.js';
  import esMessages from '@/locales/contact/es.js';
  import { onMounted, watchEffect , ref } from "vue";

  const messages = ref('');
  const $t = (key) => messages.value[key];
  const appStore = useAppStore();
  const currentLanguage = ref('');
  const center = { lat: 35.22709, lng: -80.84313 };

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
