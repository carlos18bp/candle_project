<template>  
    <Header></Header>
    <!--Content block-->
    <div class="bg-primary_p h-96">
        <div class="grid grid-cols-2 gap-6">
            <div class="p-16">
                <h1 class="font-semibold text-7xl text-second_p">Let it cool completely to maximizing the life of your candle.</h1>
            </div>
            <div class="w-3/4 pb-16 flex items-end">
                <p class="text-second_p font-regular text-xl">More than 10 times experiments were carried out to find the fragance in accordance with nature to the point of having to stay overnight in the dark.</p>
            </div>
        </div>
    </div>

    <!--Content Block-->
    <div class="relative h-96">

        <!--Content-->
        <div class="absolute inset-0 grid grid-cols-3 gap-4">
            <div class="flex items-center">
                <img class="h-3/4" src="@/assets/images/aboutUs/About1.jpg">
            </div>
            <div>
                <img src="@/assets/images/aboutUs/About2.jpg">
            </div>
            <div class="flex items-center justify-end">
                <img class="h-3/4" src="@/assets/images/aboutUs/About3.jpg">
            </div>

        </div>
        <!--Halfs-->
        <div class="h-1/2 w-full bg-primary_p"></div>
        <div class="h-1/2 w-full bg-second_p"></div>
    </div>

    <!--Content-->
    <div class="relative mt-20 p-20">
        <h2 class="font-bold text-2xl tracking-widest text-black_p">OUR PRODUCT</h2>
        <div class="relative grid grid-cols-3 gap-4 mt-16 items-center">
            <div>
                <div class="w-3/4">
                    <h3 class="text-2xl font-bold text-black_p">Nature</h3>
                    <p class="text-xl font-medium text-gray_p mt-5">We are nature lovers, that's why we use environmentally friendly materials so that wax waste doesn't damage the environment</p>
                </div>
                <div class="w-3/4 mt-10">
                    <h3 class="text-2xl font-bold text-black_p">Premium</h3>
                    <p class="text-xl font-medium text-gray_p mt-5">Affordable prices, even so we still prioritize quality so that at low prices you still get quality products that hace been tested by our team</p>
                </div>
            </div>

            <div class="flex items-center justify-center">
                <img class="h-full w-auto" src="@/assets/images/aboutUs/candleJar.jpg" alt="...">
            </div>
            <div>
                <div class="w-3/4">
                    <h3 class="text-2xl font-bold text-black_p">Unique</h3>
                    <p class="text-xl font-medium text-gray_p mt-5">Different from most other candles, we present a wide variety of scents and have done field research by our team to get a realistic scent</p>
                </div>
                <div class="w-3/4 mt-10">
                    <h3 class="text-2xl font-bold text-black_p">Economical</h3>
                    <p class="text-xl font-medium text-gray_p mt-5">Our candles have a long shelf life and last for 6 months from the moment you start using them so you can save on your budget</p>
                </div>
            </div>
        </div>
    </div>

    <!--Video Content-->
    <div class="relative p-20 flex justify-center">
        <img class="w-full" src="@/assets/images/aboutUs/videPic.jpg" alt="...">
    </div>

    <!--Content-->
    <div class="relative p-20 grid grid-cols-2 gap-20 items-center">
        <div>
            <img class="w-auto h-full" src="@/assets/images/general/hazelnuts.avif">
        </div>

        <div class="grid grid-cols-1 gap-16">
            <div class="w-3/4 h-auto">
                <h2 class="font-bold text-2xl text-black_p">Plant-based ingredients</h2>
                <p class="font-semibold text-xl text-gray_p">A scented candle made with natural ingredients is a candle that uses plant-based waxes, such as soy or beeswax, and essential oils to create its scent.</p>
            </div>
            <div class="w-3/4 h-auto">
                <h2 class="font-bold text-2xl text-black_p">Parfume</h2>
                <p class="font-semibold text-xl text-gray_p">Provides a more natural, soothing aroma compared to candles made with synthetic fragances and chemicals.</p>
            </div>
        </div>
    </div>

    <!--Banner-->
    <div class="relative p-16 flex justify-center items-center bg-primary_p">
        <div class="inline-block">
            <h1 class="inline-block text-second_p tracking-wider"><span class="font-semibold text-4xl">Can safely enjoy your </span><span class="font-special text-5xl">candle</span></h1>
            <div class="flex justify-end">
                <img src="@/assets/images/aboutUs/lineCurved.png" alt="...">
            </div>
        </div>
    </div>

    <!--Reviews-->
    <div class="relative p-20">
        <div class="bg-white p-10">
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
                    <swiper-slide class="w-full " v-for="(review, reviewIdx) in reviews" :key="review.id">
                        <div class="p-16 w-full grid grid-cols-6 gap-6">
                            <div class="grid grid-cols-2 gap-6">

                                <img :src="`/api/${review.user_image_url}`" alt="..." style="width: 75%;  height: auto;" />

                                <div>
                                    <h2 class="font-bold text-2xl text-black_p">{{ review.user_full_name }}</h2>
                                </div>
                            </div>

                            <div class="w-auto col-span-5">
                                <div class="max-w-8">
                                    <img src="@/assets/images/aboutUs/resource.png">
                                </div>
                                <div class="ps-16">
                                    <p class="font-medium text-3xl text-justify">{{ review.description }}</p>
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
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import 'swiper/css/navigation';
    import { Autoplay, Pagination, Navigation } from 'swiper/modules';
    import { onMounted, ref } from "vue";
    import Header from "@/components/layouts/Header.vue";
    import Footer from "@/components/layouts/Footer.vue";
    import { useReviewStore } from '@/stores/review';
    import { StarIcon } from '@heroicons/vue/20/solid';

    const reviewtStore = useReviewStore();
    const reviews = ref([]);
    const modules = [Autoplay, Pagination, Navigation];

    onMounted(async () => {
        await reviewtStore.fetchReviewsData();
        reviews.value = reviewtStore.reviews
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
  background-color: #CEAD95;
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