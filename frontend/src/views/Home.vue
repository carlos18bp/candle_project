<template>  
    <Header></Header>
    <div class="mx-auto flex max-w-7xl px-8 pb-12">
        <div class="w-2/5">
            <img src="@/assets/images/home/banner_1.jpg" class="w-full h-auto">
        </div>
        <div class="w-3/5 bg-second_p flex flex-col justify-center px-8">
            <p class="uppercase pb-4">#Candle Experience</p>
            <p class="text-4xl pb-8">Always cool and soothe your feelings available in a variety of candle</p>
            <button type="button" 
                    class="rounded-full bg-black_p py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black_p uppercase w-48">
                    Discover Products
            </button>
        </div>
    </div>
    <div class="mx-auto flex flex-col items-center justify-center max-w-7xl px-8 pb-12">
        <p class="uppercase pb-4">Trending</p>
        <p class="pb-4">Shop our pupular candle products</p>
        <ProductCarousel></ProductCarousel>
    </div>
    <div class="mx-auto relative flex flex-col items-center justify-center max-w-7xl px-8 pb-12">
        <img src="@/assets/images/home/banner_2.jpg" class="w-full h-auto pb-8">
        <div class="absolute px-16 left-0">
            <p>Make the most of your</p>
            <p>#scandlexperience</p>
        </div>
        <button type="button" 
                    class="rounded-full bg-white py-2 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-white uppercase w-48">
                Show more
        </button>
    </div>
    <div class="mx-auto flex flex-col max-w-7xl px-8 pb-12">
        <img src="@/assets/images/home/banner_3.jpg" class="w-full h-auto pb-8">
        <p class="pb-4">We make products with quality materials so you get a very good product</p>
    </div>
    <div class="mx-auto flex max-w-7xl px-8 pb-12">
        <div class="w-1/2">
            <img src="@/assets/images/home/banner_4.jpg" class="w-auto h-auto">
        </div>
        <div class="w-1/2 flex flex-col pl-6">
            <img src="@/assets/images/home/banner_5.jpg" class="w-auto h-auto pb-4">
            <p class="font-bold text-3xl pb-6">Durable</p>
            <p class="text-3xl">The life of the candle reaches 6 months since it is used and still feels the smell</p>
        </div>
    </div>
    <div class="mx-auto flex max-w-7xl py-8 pb-12">
        <div class="w-1/2 flex flex-col">
            <img src="@/assets/images/home/banner_6.jpg" class="w-auto h-auto pb-4">
            <p class="font-bold text-3xl pb-6">Calm</p>
            <p class="text-3xl">The aroma emitted by the candles soothes the feeling and the room is of course very durable</p>
        </div>
        <div class="w-1/2">
            <img src="@/assets/images/home/banner_7.jpg" class="w-auto h-auto pl-6">
        </div>
    </div>
    <div class="mx-auto relative max-w-7xl px-8 pb-12 bg-primary_p">
        <img src="@/assets/images/home/banner_8.png" class="w-full h-auto">
        <div class="absolute bottom-24 left-1/2 -translate-x-1/2">        
            <button type="button" 
                    class="rounded-full bg-black_p py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black_p uppercase w-48">
                Find product
            </button>
        </div>
    </div>
    <FAQS></FAQS>
    <Footer></Footer>
</template>

<script setup>
    import Header from "@/components/layouts/Header.vue";
    import Footer from "@/components/layouts/Footer.vue";
    import ProductCarousel from "@/components/ProductCarousel.vue";
    import FAQS from "@/components/home/FAQS.vue";

</script>