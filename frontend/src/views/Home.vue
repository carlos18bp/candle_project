<template>
    <div class="absolute w-full">
        <Header></Header>
    </div>

    <div class="grid lg:flex pt-24 lg:pt-0 pb-12">
        <div class="hidden lg:block lg:w-2/5">
            <img src="@/assets/images/home/banner_1.jpg" class="w-full h-auto">
        </div>
        <div class="w-full lg:w-3/5 bg-second_p flex flex-col justify-center lg:px-32">
            <p class="uppercase pb-4 font-regular tracking-widest text-center text-gray_p lg:text-start text-base md:text-2xl lg:text-xl">#Candle Experience</p>
            <p class="px-3 lg:px-0 pb-8 text-center lg:text-start">
                <span class="font-semibold text-4xl md:text-6xl 2xl:text-8xl">Always </span>
                <span class="text-primary_p font-semibold text-4xl md:text-6xl 2xl:text-8xl">cool and soothe </span>
                <span class="text-black_p font-semibold text-4xl md:text-6xl 2xl:text-8xl">your feelings available in a variety of </span>
                <span class="font-special text-primary_p text-5xl md:text-7xl 2xl:text-9xl">candle</span>
            </p>
            <div class="flex justify-center lg:justify-start">
                <RouterLink :to="{ name: 'products' }" 
                    class="inline-block font-regular rounded-full bg-black_p py-4 px-8 xl:text-md 2xl:text-lg text-second_p shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-primary_p uppercase">
                    Discover Products
                </RouterLink>
            </div>
        </div>
        <div class="lg:hidden w-full mt-10">
            <img src="@/assets/images/home/banner_1.jpg" class="w-full h-auto">
        </div>
    </div>

    <div class="mx-auto flex flex-col items-center justify-center max-w-7xl px-8 pb-12">
        <h2 class="uppercase pb-4 font-regular tracking-widest text-gray_p text-center text-2xl">Trending</h2>
        <h2 class="pb-4 font-semibold text-center text-4xl">Shop our pupular candle products</h2>
        <ProductCarousel
            :top="4"
        ></ProductCarousel>
    </div>

    <div class="mx-auto relative flex flex-col items-center justify-center px-16 pb-12">
        <img src="@/assets/images/home/banner_2.jpg" class="w-full h-auto pb-8">
        <RouterLink :to="{ name: 'blogs' }" 
              class="font-regular rounded-full bg-white py-4 px-16 text-xl text-black_p shadow-sm ring-1 ring-inset ring-primary_p hover:bg-black_p hover:text-second_p hover:ring-transparent uppercase">
              Show more
        </RouterLink> 
    </div>

    <div class="bg-cream_p py-20">
        <div class="mx-auto flex flex-col px-16 pb-12">
            <img src="@/assets/images/home/banner_3.jpg" class="w-full h-auto pb-8">
            <p class="pb-4 font-medium text-3xl tracking-wide w-1/2 text-black_p">We make products with quality materials so you get a very good product</p>
        </div>
        <div class="mx-auto flex px-16 pb-12">
            <div class="w-1/2">
                <img src="@/assets/images/home/banner_4.jpg" class="w-full h-auto">
            </div>
            <div class="w-1/2 flex flex-col pl-6">
                <img src="@/assets/images/home/banner_5.jpg" class="w-full h-auto pb-4">
                <h2 class="font-bold text-4xl pb-6">Durable</h2>
                <p class="text-3xl font-medium tracking-wide">The life of the candle reaches 6 months since it is used and still feels the smell</p>
            </div>
        </div>
        <div class="mx-auto flex px-16 pb-12">
            <div class="w-1/2 flex flex-col">
                <img src="@/assets/images/home/banner_6.jpg" class="w-full h-auto pb-4">
                <h2 class="font-bold text-4xl pb-6">Calm</h2>
                <p class="text-3xl font-medium tracking-wide">The aroma emitted by the candles soothes the feeling and the room is of course very durable</p>
            </div>
            <div class="w-1/2">
                <img src="@/assets/images/home/banner_7.jpg" class="w-full h-auto pl-6">
            </div>
        </div>
    </div>

    <div class="mx-auto relative px-8 py-12 bg-primary_p">
        <div class="relative z-10">
            <img src="@/assets/images/home/banner_8.png" class="max-w-7xl mx-auto h-auto relative z-20">
                <h1 class="absolute w-full text-center top-40 font-bold text-second_p text-8xl tracking-wider">
                    <span class="relative z-30">Fragr</span>
                    <span>anc</span>
                    <span class="relative z-30">e Room</span>
                </h1>
            <div class="absolute bottom-14 left-1/2 -translate-x-1/2">        
                <button type="button" 
                        class=" font-regular tracking-wider rounded-full bg-black_p py-3 px-14 text-sm text-second_p shadow-sm  hover:bg-second_p hover:text-black_p uppercase">
                    Find product
                </button>
            </div>
        </div>

        <div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-shadow_home to-transparent"></div>
    </div>
    <FAQS></FAQS>
    <Footer></Footer>
</template>

<script setup>
    import Header from "@/components/layouts/Header.vue";
    import Footer from "@/components/layouts/Footer.vue";
    import ProductCarousel from "@/components/product/ProductCarousel.vue";
    import FAQS from "@/components/home/FAQS.vue";
</script>