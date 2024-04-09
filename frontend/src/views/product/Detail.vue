<template>  
    <Header></Header>

    <div v-if="product" class="relative isolate px-6 lg:px-8">
        <div class="bg-white">
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
              <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                  <!-- Image gallery -->
                  <TabGroup as="div" class="flex flex-col-reverse">
                      <!-- Image selector -->
                      <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                          <TabList class="grid grid-cols-4 gap-6">
                              <Tab v-for="image in product.images" :key="image.id" class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-black_p hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 transition-transform duration-300 transform hover:scale-110">
                                  <span class="sr-only"> ----- </span>
                                  <span class="absolute inset-0 overflow-hidden rounded-md">
                                      <img :src="`${image.image_url}`" alt="" class="h-full w-full object-cover object-center" />
                                  </span>
                                  <span :class="[selected ? 'ring-primary_p' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
                              </Tab>
                          </TabList>
                      </div>

                      <TabPanels class="aspect-h-1 aspect-w-1 w-full">
                          <TabPanel v-for="image in product.images" :key="image.id">
                              <img :src="`${image.image_url}`" alt=" ----- " class="h-full w-full object-cover object-center sm:rounded-lg" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter(image)" @mouseleave="handleMouseLeave"/>
                          </TabPanel>
                      </TabPanels>
                  </TabGroup>


                  <!-- Product info -->

                  <div v-if="selectedImage" class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                      <img
                                :src="`${selectedImage ? selectedImage.image_url : image.image_url}`"
                                alt=" ---- "
                                class="h-full w-full object-cover"
                                :style="{ transform: `scale(${4}) translate(${mouseX}px, ${mouseY}px)` }"
                      />
                    </div>
                  </div>

                  <div v-if="!selectedImage" class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">

                    <div class="mt-3 flex justify-between">
                        <h1 v-if="currentLanguage === 'en'" class="inline-block text-3xl font-semibold tracking-tight text-black_p">{{ product.title }}</h1>
                        <h1 v-else class="inline-block text-3xl font-semibold tracking-tight text-black_p">{{ product.titulo }}</h1>
                        <h2 class="sr-only">Product information</h2>
                        <p  class="inline-block text-3xl tracking-tight font-regular text-black_p">$ {{ product.price }}</p>
                    </div>

                    <!-- Reviews -->
                        <div class="mt-3">
                            <h3 class="sr-only">Reviews</h3>
                            <div class="flex items-center">
                              <div class="flex items-center">
                                  <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[averageRate > rating ? 'text-terciary_p' : 'text-gray-300', 'h-5 w-5 flex-shrink-0', ]" aria-hidden="true" />
                              </div>
                              <p class="sr-only">{{ product.reviews }} out of 5 stars</p>
                              <div class="ms-3">
                                <p class="font-medium">12 {{ $t('reviews_1') }}</p>
                              </div>
                        </div>

                        <div class="mt-3">
                          <p v-if="currentLanguage === 'en' " class="font-regular text-lg">{{ product.description }}</p>
                          <p v-else class="font-regular text-lg">{{ product.descripcion }}</p>
                        </div>
                    </div>

                    <form class="mt-6">
                        <div class="mt-5 flex">
                        <button type="submit" class="flex justify-center max-w-xs flex-1 items-center rounded-md border border-transparent bg-primary_p px-2 py-3 text-base font-medium text-white hover:bg-terciary_p focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terciary_p sm:w-full">
                          <div>
                            <i class="bi bi-whatsapp text-2xl me-2.5"></i>
                            <a href="https://wa.me/17049005171" target="_blank" class="text-2xl ms-2.5">{{ $t('order') }}</a>
                          </div>
                        </button>
                        </div>
                    </form>

                  </div>
              </div>
            </div>
        </div>
    </div>

    <!--Content-->

    <div class="container mx-auto mt-16 grid text-center xl:text-start xl:grid-cols-2 gap-4">
      <div class="grid content-center">
        <div>
          <h2 class="font-regular text-2xl text-gray_p tracking-widest">{{ $t('trending') }}</h2>
          <p class="font-medium text-2xl xl:text-4xl text-black_p mt-12 tracking-wider ">{{ $t('text') }}</p>
        </div>
      </div>
      <div class="relative">
        <img src="@/assets/images/general/hazelnuts.avif" alt="..." class="h-full w-full object-cover object-center sm:rounded-lg">
      </div>
    </div>

    <!--Reviews-->

    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
      <div class="lg:col-span-4">
        <h2 class="text-2xl font-bold tracking-tight text-black_p">{{ $t('reviews_title') }}</h2>

        <div v-if="reviews" class="mt-3 flex items-center">
          <div>
            <div class="flex items-center">
              <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[averageRate > rating ? 'text-primary_p' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
            </div>
            <p class="sr-only">out of 5 stars</p>
          </div>
          <p class="ml-2 text-sm text-black_p">{{ $t('based_on') }} {{ reviews.length }} {{ $t('reviews_2') }}</p>
        </div>
           
        <div class="mt-10">
          <h3 class="text-lg font-medium text-black_p">{{ $t('reviews_subtitle') }}</h3>
          <p class="mt-1 text-sm text-gray-600">{{ $t('reviews_text') }}</p>

          <a href="#"
             data-modal-toggle="add-review-modal" data-modal-target="add-review-modal"
             class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-black_p hover:bg-gray-50 sm:w-auto lg:w-full">
                {{ $t('reviews_button') }}
          </a>
          <AddReview
            :productId=productId
          ></AddReview>
        </div>
      </div>

      <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
        <h3 class="sr-only">Recent reviews</h3>

        <div class="flow-root">
          <div class="-my-12 divide-y divide-gray-200">
            <div v-for="review in reviews" key="" class="py-12">
              
              <div class="flex items-center">
                <img src="@/assets/images/user_avatar.jpg" :alt="`...`" class="h-12 w-12 rounded-full" />
                <div class="ml-4">
                  <h4 class="text-sm font-bold text-black_p">{{ review.user_full_name }}</h4>
                  <div class="mt-1 flex items-center">
                    <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[review.rate > rating ? 'text-primary_p' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
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
    <Footer></Footer>
</template>

<script setup>
  import Header from "@/components/layouts/Header.vue";
  import Footer from "@/components/layouts/Footer.vue";
  import AddReview from "@/components/product/AddReview.vue";
  import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  } from '@headlessui/vue'
  import { StarIcon } from '@heroicons/vue/20/solid'
  import { onMounted, ref, reactive, watchEffect } from 'vue';
  import { useProductStore } from '@/stores/product';
  import { useRoute } from "vue-router";
  import { initModals } from 'flowbite';
  import { useAppStore } from '@/stores/language.js';
  import enMessages from '@/locales/product/detail/en.js';
  import esMessages from '@/locales/product/detail/es.js';

  const messages = ref('');
  const $t = (key) => messages.value[key];
  const appStore = useAppStore();
  const currentLanguage = ref('');
  const selected = '';
  const route = useRoute();
  const productId = ref(0);
  const productStore = useProductStore();
  const product = reactive({});
  const reviews = ref([]);
  const averageRate = ref(0);

  onMounted(async () => {
      window.scrollTo({ top: 0 });
      watchEffect(() => {
        currentLanguage.value = appStore.getCurrentLanguage;
        if (currentLanguage.value === 'en') {
          messages.value = enMessages;
        } else {
          messages.value = esMessages;
        }
      });
      await productStore.fetchProductsData();
      initModals();     
  });

  const calculateAverageRate = () => {
    if (reviews.value === undefined || reviews.value.length === 0) return 0;

    const sum = reviews.value.reduce((total, review) => total + review.rate, 0);
    return sum / reviews.value.length;
  };

  watchEffect(async () => {
    productId.value = parseInt(route.params.product_id);
    if (productId.value) Object.assign(product, productStore.productById(productId.value));
    reviews.value = await product.reviews
    
    averageRate.value = calculateAverageRate();
  });

  const selectedImage = ref(null);
  const mouseX = ref(0);
  const mouseY = ref(0);
  const zoom = ref(1);

  const handleMouseEnter = (image) => {
    selectedImage.value = image;

  };

  const handleMouseLeave = () => {
    selectedImage.value = null;
    resetZoom();
  };

  const handleMouseMove = (event) => {
    if (!selectedImage.value) return;

    const img = event.target.getBoundingClientRect();
    mouseX.value = (event.clientX - img.left - (img.width/2)) * -1;
    mouseY.value = (event.clientY - img.top - (img.height/2)) * -1;
    zoom.value = 4;
  };

  const resetZoom = () => {
    mouseX.value = 0;
    mouseY.value = 0;
    zoom.value = 1;
  };
</script>
