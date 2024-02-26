<template>  
    <Header></Header>
    <div class="mx-auto relative flex flex-col items-center">
        <img src="@/assets/images/contact/banner_1.jpg" class="w-full h-full">
        <div class="rounded-3xl relative xl:absolute bg-second_p flex flex-col w-3/4 xl:w-1/4 p-8 xl:top-28 xl:left-28">
            <h2 class="font-bold text-center text-4xl pb-8">Get In Touch</h2>
            <h2 class="font-bold pb-6 text-4xl">Contact</h2>
            <div class="pb-8">
                <div class="flex items-center pb-4">
                    <div class="flex items-center w-8">
                        <img src="@/assets/images/icons/phone_call.png" class="size-6">
                    </div>
                    <p class="font-regular text-2xl pl-2">+1 (252) 591-6930</p>
                </div>
                <div class="flex items-center pb-4">
                    <div class="flex items-center w-8">
                        <img src="@/assets/images/icons/sharp_email.png" class="size-6">
                    </div>
                    <p class="font-regular text-2xl pl-2">info@hello.com</p>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center w-8">
                        <img src="@/assets/images/icons/location.png" class="size-6">
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
                <img src="@/assets/images/icons/social_media/facebook.png" class="size-9">
                <img src="@/assets/images/icons/social_media/instagram.png" class="size-9">
                <img src="@/assets/images/icons/social_media/twitter.png" class="size-9">
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
    import { GoogleMap, Marker } from 'vue3-google-map';
    import Header from "@/components/layouts/Header.vue";
    import Footer from "@/components/layouts/Footer.vue";

    const center = { lat: 35.2270900, lng: -80.8431300 }
</script>