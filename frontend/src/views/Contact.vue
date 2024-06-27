<template>
    <Header></Header>
    <div class="mx-auto relative flex flex-col items-center">
        <!-- Contact Banner Image -->
        <img src="@/assets/images/contact/banner_1.jpg" class="w-full h-full" />

        <!-- Contact Information Section -->
        <div class="rounded-3xl relative xl:absolute bg-second_p flex flex-col w-auto p-8 xl:top-28 xl:left-28">
            <h2 class="font-bold text-center text-4xl pb-8 test-contact_title">{{ $t('contact_title') }}</h2>
            <h2 class="font-bold pb-6 text-4xl test-contact">{{ $t('contact') }}</h2>

            <!-- Contact Details -->
            <div class="pb-8">
                <!-- Phone Number -->
                <div class="flex items-center pb-4">
                    <div class="flex items-center w-8">
                        <img src="@/assets/images/icons/phone_call.png" class="size-6" />
                    </div>
                    <a href="tel:+17049005171" class="font-regular text-2xl pl-2">+1 (704) 900-5171</a>
                </div>

                <!-- Email Address -->
                <div class="flex items-center pb-4">
                    <div class="flex items-center w-8">
                        <img src="@/assets/images/icons/sharp_email.png" class="size-6" />
                    </div>
                    <a href="mailto:sensescandlesbykate@gmail.com"
                        class="font-regular text-2xl pl-2">sensescandlesbykate@gmail.com</a>
                </div>

                <!-- Location -->
                <div class="flex items-center">
                    <div class="flex items-center w-8">
                        <img src="@/assets/images/icons/location.png" class="size-6" />
                    </div>
                    <p class="font-regular text-2xl pl-2">Charlotte | NC-SC</p>
                </div>
            </div>

            <!-- Google Map -->
            <div class="w-full h-40 relative">
                <GoogleMap api-key="AIzaSyD7cf5pD4u32w9k2zEnjq19nd8WlGmm-ls" class="h-full" :center="center" :zoom="10">
                    <Marker :options="{ position: center }" />
                </GoogleMap>
            </div>

            <!-- Social Media Links -->
            <div class="flex justify-evenly pt-8">
                <a href="https://wa.me/17049005171" target="_blank">
                    <i class="bi bi-whatsapp text-4xl"></i>
                </a>
                <a href="https://www.tiktok.com/@sensescandlesbykate?_t=8lCy5sMMc1a&_r=1" target="_blank">
                    <i class="bi bi-tiktok text-4xl"></i>
                </a>
                <a href="https://www.instagram.com/sensescandlesbykate?igsh=YnhsMmZrbXh2amMy&utm_source=qr"
                    target="_blank">
                    <i class="bi bi-instagram text-4xl"></i>
                </a>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
    import { GoogleMap, Marker } from "vue3-google-map";
    import { computed, onMounted, ref, watchEffect } from "vue";
    import Footer from "@/components/layouts/Footer.vue";
    import Header from "@/components/layouts/Header.vue";
    import enMessages from '@/locales/contact/en.js';
    import esMessages from '@/locales/contact/es.js';
    import { useLanguageStore } from '@/stores/language.js';

    // State for messages and current language
    const messages = ref('');
    const $t = (key) => messages.value[key];
    const appStore = useLanguageStore();
    const currentLanguage = computed(() => appStore.getCurrentLanguage);

    // Center coordinates for Google Map
    const center = { lat: 35.22709, lng: -80.84313 };

    /**
     * Lifecycle hook to handle component mounting.
     */
    onMounted(() => {
        window.scrollTo({ top: 0 });
    });

    // Watch for changes in current language
    watchEffect(() => {
        messages.value = currentLanguage.value === 'en' ? enMessages : esMessages;
    });
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
