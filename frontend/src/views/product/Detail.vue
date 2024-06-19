<template>
    <!-- Banner Component -->
    <Banner></Banner>
    <!-- Header Component -->
    <Header></Header>

    <!-- Product Section -->
    <div v-if="product" class="relative isolate px-6 lg:px-8">
        <div class="bg-white">
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
                <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">

                    <!-- Image Gallery -->
                    <TabGroup as="div" class="flex flex-col-reverse">

                        <!-- Image Selector -->
                        <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <TabList class="grid grid-cols-4 gap-6">
                                <Tab v-for="image in product.gallery_urls" :key="image"
                                    class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-black_p hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 transition-transform duration-300 transform hover:scale-110">
                                    <span class="absolute inset-0 overflow-hidden rounded-md">
                                        <img :src="image" alt="" class="h-full w-full object-cover object-center" />
                                    </span>
                                    <span
                                        :class="[selected ? 'ring-primary_p' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']"
                                        aria-hidden="true" />
                                </Tab>
                            </TabList>
                        </div>

                        <TabPanels class="aspect-h-1 aspect-w-1 w-full">
                            <TabPanel v-for="image in product.gallery_urls" :key="image">
                                <img :src="image" alt="" class="h-full w-full object-cover object-center sm:rounded-lg"
                                    @mousemove="handleMouseMove" @mouseenter="handleMouseEnter(image)"
                                    @mouseleave="handleMouseLeave" />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>

                    <!-- Product Info -->
                    <div v-if="selectedImage" class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                            <img :src="selectedImage" alt="" class="h-full w-full object-cover"
                                :style="{ transform: `scale(${4}) translate(${mouseX}px, ${mouseY}px)` }" />
                        </div>
                    </div>

                    <div v-if="!selectedImage" class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">

                        <!-- Product Title and Price -->
                        <div class="mt-3 flex justify-between">
                            <h1 v-if="currentLanguage === 'en'"
                                class="inline-block text-3xl font-semibold tracking-tight text-black_p">
                                {{ product.title }}
                            </h1>
                            <h1 v-else class="inline-block text-3xl font-semibold tracking-tight text-black_p">
                                {{ product.titulo }}
                            </h1>
                            <p class="inline-block text-3xl tracking-tight font-regular text-black_p">$ {{ product.price
                                }}</p>
                        </div>

                        <!-- Reviews -->
                        <div class="mt-4">
                            <h3 class="sr-only">Reviews</h3>
                            <div class="flex items-center">
                                <div class="flex items-center">
                                    <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                                        :class="[averageRate > rating ? 'text-terciary_p' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                                        aria-hidden="true" />
                                </div>
                                <p class="sr-only">{{ product.reviews }} out of 5 stars</p>
                                <div class="ms-3">
                                    <p class="font-medium inline-block"> {{ reviewsLength }} {{ $t('reviews_1') }}</p>
                                    <a data-modal-toggle="add-review-modal" data-modal-target="add-review-modal" class="ms-2 text-terciary_p font-medium inline-block cursor-pointer">{{ $t('write_review') }}</a>
                                </div>
                            </div>
                        </div>

                        <!-- Introductory phrase of the product -->
                        <div class="mt-8">
                            <p class="font-medium text-lg ">
                                <span v-if="currentLanguage === 'en'">
                                    {{ product.short_description }}
                                </span>
                                <span v-else>{{ product.descripcion_corta }}</span>
                            </p>
                        </div>

                        <!-- Color Options -->
                        <div class="mt-3">
                            <h3 class="text-md font-medium text-gray-700">Color</h3>
                            <div class="flex space-x-2 mt-2">
                                
                                <span v-for="color in product.colors" :key="color.name"
                                    class="w-8 h-8 border border-gray-300 cursor-pointer" :class="[
                                        { 'ring-2 ring-primary_p': colorSelected === color.name },
                                        color.name === 'black' || color.name === 'white'
                                            ? `bg-${color.name}`
                                            : color.name === 'yellow'
                                                ? `bg-${color.name}-300`
                                                : `bg-${color.name}-500`,
                                    ]" @click="colorSelected = color.name">
                                </span>

                                <span class="w-8 h-8 border border-gray-300 cursor-pointer"
                                    :class="[{ 'ring-2 ring-primary_p': colorSelected === 'rainbow' }]"
                                    @click="colorSelected = 'rainbow'">
                                    <img src="@/assets/images/image_rainbow.webp" alt="image_rainbow" />
                                </span>
                            </div>
                        </div>

                        <!-- Quantity Selector and Add to Cart Button -->
                        <div class="flex items-center gap-4 mt-12">
                            <div class="flex items-center border border-primary_p rounded-full h-12">
                                <button
                                    class="px-3 py-2 hover:text-gray-800 focus:outline-none"
                                    @click="decrementQuantity">
                                    <MinusSmallIcon class="h-6 w-6 text-black_p" aria-hidden="true" />
                                </button>
                                <span class="px-4 py-2 text-black_p font-semibold">{{ productQuantity }}</span>
                                <button
                                    class="px-3 py-2 hover:text-gray-800 focus:outline-none"
                                    @click="productQuantity++">
                                    <PlusSmallIcon class="w-6 h-6 text-black_p"/>
                                </button>
                                
                            </div>

                            <button v-if="colorSelected !== 'rainbow'" @click="addToCart"
                                class="px-8 py-2 w-full h-12 bg-black text-white rounded-full hover:bg-primary_p focus:outline-none font-regular tracking-wide text-md">
                                <span class="uppercase">{{ $t('add_to_cart') }}</span>
                            </button>

                            <form v-if="colorSelected === 'rainbow'" class="w-full">
                                <button type="submit"
                                    class="px-8 py-2 w-full h-12 bg-black_p border border-transparent focus:outline-none font-regular tracking-wide hover:bg-primary_p justify-center rounded-full text-white">
                                    <div>
                                        <i class="bi bi-whatsapp text-md me-2.5"></i>
                                        <a href="https://wa.me/17049005171" target="_blank" class="text-md ms-2.5 uppercase">
                                            {{ $t('order') }}
                                        </a>
                                    </div>
                                </button>
                            </form>
                        </div>

                        <!-- Description, Ingredients, How To Use, and How To Feel Collapses -->
                        <div class="space-y-6 font-regular mt-12">
                            <Disclosure>
                                <template #default="{ open }">
                                    <DisclosureButton
                                        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border-b border-b-primary_p">
                                        <span class="font-bold text-xl">{{ $t('description') }}</span>
                                        <PlusSmallIcon v-if="!open" class="w-8 h-8 text-primary_p"/>
                                        <MinusSmallIcon v-else class="h-8 w-8 text-primary_p" aria-hidden="true" />
                                    </DisclosureButton>
                                    <DisclosurePanel class="px-4 pt-4 pb-2 text-md text-gray-700 font-medium">
                                        <p v-if="currentLanguage === 'en'">{{ product.description }}</p>
                                        <p v-else>{{ product.descripcion }}</p>
                                    </DisclosurePanel>
                                </template>
                            </Disclosure>

                            <Disclosure>
                                <template #default="{ open }">
                                    <DisclosureButton
                                        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border-b border-b-primary_p">
                                        <span class="font-bold text-xl">{{ $t('ingredients') }}</span>
                                        <PlusSmallIcon v-if="!open" class="w-8 h-8 text-primary_p"/>
                                         <MinusSmallIcon v-else class="h-8 w-8 text-primary_p" aria-hidden="true" />
                                    </DisclosureButton>
                                    <DisclosurePanel class="px-4 pt-4 pb-2 text-md text-gray-700 font-medium">
                                        <p v-if="currentLanguage === 'en'">{{ product.ingredients }}</p>
                                        <p v-else>{{ product.ingredientes }}</p>
                                    </DisclosurePanel>
                                </template>
                            </Disclosure>

                            <Disclosure>
                                <template #default="{ open }">
                                    <DisclosureButton
                                        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border-b border-b-primary_p">
                                        <span class="font-bold text-xl">{{ $t('how_to_use') }}</span>
                                        <PlusSmallIcon v-if="!open" class="w-8 h-8 text-primary_p"/>
                                         <MinusSmallIcon v-else class="h-8 w-8 text-primary_p" aria-hidden="true" />
                                    </DisclosureButton>
                                    <DisclosurePanel class="px-4 pt-4 pb-2 text-md text-gray-700 font-medium">
                                        <p v-if="currentLanguage === 'en'">{{ product.how_to_use }}</p>
                                        <p v-else>{{ product.como_usarlo }}</p>
                                    </DisclosurePanel>
                                </template>
                            </Disclosure>

                            <Disclosure>
                                <template #default="{ open }">
                                    <DisclosureButton
                                        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border-b border-b-primary_p">
                                        <span class="font-bold text-xl">{{ $t('how_to_feel') }}</span>
                                        <PlusSmallIcon v-if="!open" class="w-8 h-8 text-primary_p"/>
                                         <MinusSmallIcon v-else class="h-8 w-8 text-primary_p" aria-hidden="true" />
                                    </DisclosureButton>
                                    <DisclosurePanel class="px-4 pt-4 pb-2 text-md text-gray-700 font-medium">
                                        <p v-if="currentLanguage === 'en'">{{ product.how_to_feel }}</p>
                                        <p v-else>{{ product.como_se_siente }}</p>
                                    </DisclosurePanel>
                                </template>
                            </Disclosure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Trending Section -->
    <div class="container mx-auto mt-16 grid text-center xl:text-start xl:grid-cols-2 gap-4">
        <div class="grid content-center">
            <div>
                <h2 class="font-regular text-2xl text-gray_p tracking-widest">{{ $t('trending') }}</h2>
                <p class="font-medium text-2xl xl:text-4xl text-black_p mt-12 tracking-wider ">{{ $t('text') }}</p>
            </div>
        </div>
        <div class="relative">
            <img src="@/assets/images/general/hazelnuts.avif" alt="..."
                class="h-full w-full object-cover object-center sm:rounded-lg">
        </div>
    </div>

    <!-- Reviews Section -->
    <div
        class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div class="lg:col-span-4">
            <h2 class="text-2xl font-bold tracking-tight text-black_p">{{ $t('reviews_title') }}</h2>
            <div v-if="reviews" class="mt-3 flex items-center">
                <div>
                    <div class="flex items-center">
                        <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                            :class="[averageRate > rating ? 'text-primary_p' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                            aria-hidden="true" />
                    </div>
                    <p class="sr-only">out of 5 stars</p>
                </div>
                <p class="ml-2 text-sm text-black_p">{{ $t('based_on') }} {{ reviews.length }} {{ $t('reviews_2') }}</p>
            </div>
            <div class="mt-10">
                <h3 class="text-lg font-medium text-black_p">{{ $t('reviews_subtitle') }}</h3>
                <p class="mt-1 text-sm text-gray-600">{{ $t('reviews_text') }}</p>
                <a data-modal-toggle="add-review-modal" data-modal-target="add-review-modal"
                    class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-black_p hover:bg-gray-50 sm:w-auto lg:w-full">
                    {{ $t('reviews_button') }}
                </a>
                <AddReview v-if="productId" :product_id="productId"></AddReview>
            </div>
        </div>

        <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <h3 class="sr-only">Recent reviews</h3>
            <div class="flow-root">
                <div class="-my-12 divide-y divide-gray-200">
                    <div v-for="review in reviews" :key="review.id" class="py-12">
                        <div class="flex items-center">
                            <img src="@/assets/images/user_avatar.jpg" :alt="`user avatar`"
                                class="h-12 w-12 rounded-full" />
                            <div class="ml-4">
                                <h4 class="text-sm font-bold text-black_p">{{ review.user.full_name }}</h4>
                                <div class="mt-1 flex items-center">
                                    <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                                        :class="[review.rate > rating ? 'text-primary_p' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                                        aria-hidden="true" />
                                </div>
                                <p class="sr-only">{{ review.rate }} out of 5 stars</p>
                            </div>
                        </div>
                        <p class="mt-4 space-y-6 text-base italic text-gray-600">{{ review.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer Component -->
    <Footer></Footer>
</template>

<script setup>
    import { computed, onMounted, ref, watchEffect } from 'vue';
    import { useRoute } from 'vue-router';
    import Swal from 'sweetalert2';
    import {
        Disclosure, DisclosureButton, DisclosurePanel,
        Tab, TabGroup, TabList, TabPanel, TabPanels,
    } from '@headlessui/vue';
    import { ChevronUpIcon, StarIcon } from '@heroicons/vue/20/solid';
    import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline';
    import Banner from "@/components/layouts/Banner.vue";
    import Footer from "@/components/layouts/Footer.vue";
    import Header from "@/components/layouts/Header.vue";
    import AddReview from "@/components/product/AddReview.vue";
    import { useAppStore } from '@/stores/language.js';
    import { useProductStore } from '@/stores/product';
    import { useReviewStore } from '@/stores/review';
    import { initModals } from 'flowbite';
    import enMessages from '@/locales/product/detail/en.js';
    import esMessages from '@/locales/product/detail/es.js';

    // Initialize stores and references
    const appStore = useAppStore();
    const productStore = useProductStore();
    const reviewStore = useReviewStore();
    const currentLanguage = computed(() => appStore.getCurrentLanguage);
    const messages = ref('');
    const $t = (key) => messages.value[key];
    const colorSelected = ref('');
    const productQuantity = ref(1);
    const selected = '';
    const selectedImage = ref(null);
    const mouseX = ref(0);
    const mouseY = ref(0);
    const zoom = ref(2);

    const route = useRoute();
    const productId = ref(0);
    const product = computed(() => productStore.productById(productId.value));
    const reviews = computed(() => reviewStore.reviewsByProductId(productId.value));
    const averageRate = ref(0);
    const reviewsLength = ref(0);

    /**
     * onMounted lifecycle hook.
     * Fetches product data and initializes modals.
     */
    onMounted(async () => {
        window.scrollTo({ top: 0 });
        productId.value = parseInt(route.params.product_id);
        await productStore.fetchProductsData();
        initModals();
        colorSelected.value = product.value.colors[0].name;
    });

    // Watch for changes in current language and reviews
    watchEffect(() => {
        messages.value = currentLanguage.value === 'en' ? enMessages : esMessages;
    });

    watchEffect(() => {
        if (reviews.value.length > 0) {
            reviewsLength.value = reviews.value.length;
            averageRate.value = calculateAverageRate();
        }
    });

    /**
     * Decrease the product quantity by 1.
     */
    const decrementQuantity = () => {
        if (productQuantity.value > 1) {
            productQuantity.value--;
        }
    };

    /**
     * Add product to the shopping cart.
     */
    const addToCart = () => {
        productStore.addProductToCart(product.value, productQuantity.value, colorSelected.value);
        Swal.fire({
            title: "Product added to Shopping Cart successfully",
            icon: "success"
        });
    };

    /**
     * Calculate the average rating of the product.
     * @returns {number} Average rating.
     */
    const calculateAverageRate = () => {
        if (!reviews.value || reviews.value.length === 0) return 0;
        const sum = reviews.value.reduce((total, review) => total + review.rate, 0);
        return sum / reviews.value.length;
    };

    /**
     * Handle mouse enter event on image.
     * @param {string} image - The image URL.
     */
    const handleMouseEnter = (image) => {
        selectedImage.value = image;
    };

    /**
     * Handle mouse leave event.
     */
    const handleMouseLeave = () => {
        selectedImage.value = null;
        resetZoom();
    };

    /**
     * Handle mouse move event for image zoom effect.
     * @param {Event} event - Mouse move event.
     */
    const handleMouseMove = (event) => {
        if (!selectedImage.value) return;
        const img = event.target.getBoundingClientRect();
        mouseX.value = (event.clientX - img.left - (img.width / 2)) * -1;
        mouseY.value = (event.clientY - img.top - (img.height / 2)) * -1;
        zoom.value = 2;
    };

    /**
     * Reset zoom effect.
     */
    const resetZoom = () => {
        mouseX.value = 0;
        mouseY.value = 0;
        zoom.value = 2;
    };
</script>
