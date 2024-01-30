<template>  
    <Header></Header>
    <div class="mx-auto relative flex flex-col max-w-7xl px-8">
        <img src="@/assets/images/contact/banner_1.jpg" class="w-full h-full">
        <div class="rounded-3xl absolute bg-white flex flex-col w-1/4 p-8 top-28 left-28">
            <p class="font-bold pb-8">Get In Touch</p>
            <p class="font-bold pb-6">Contact</p>
            <div class="flex">
                <img src="@/assets/images/icons/phone_call.png" class="size-6">
                <p class="pl-2 pb-4">+1 (252) 591-6930</p>
            </div>
            <div class="flex">
                <img src="@/assets/images/icons/sharp_email.png" class="size-6">
                <p class="pl-2 pb-4">info@hello.com</p>
            </div>
            <div class="flex">
                <img src="@/assets/images/icons/location.png" class="size-6">
                <p class="pl-2 pb-4">Charlotte | NC-SC</p>
            </div>
            <!-- Map Container -->
            <div class="w-full h-40 relative">
                <GoogleMap
                api-key="AIzaSyD7cf5pD4u32w9k2zEnjq19nd8WlGmm-ls"
                class="h-full"
                :center="center"
                :zoom="15"
                >
                <Marker :options="{ position: center }" />
                </GoogleMap>
            </div>
            <div class="flex justify-between pt-8">
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