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
                                    <img :src="`/api${image.image_url}`" alt="" class="h-full w-full object-cover object-center" />
                                </span>
                                <span :class="[selected ? 'ring-primary_p' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
                            </Tab>
                        </TabList>
                    </div>

                    <TabPanels class="aspect-h-1 aspect-w-1 w-full">
                        <TabPanel v-for="image in product.images" :key="image.id">
                            <img :src="`/api${image.image_url}`" alt=" ----- " class="h-full w-full object-cover object-center sm:rounded-lg" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter(image)" @mouseleave="handleMouseLeave"/>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>


                <!-- Product info -->

                <div v-if="selectedImage" class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                    <img
                              :src="`/api${selectedImage ? selectedImage.image_url : image.image_url}`"
                              alt=" ---- "
                              class="h-full w-full object-cover"
                              :style="{ transform: `scale(${4}) translate(${mouseX}px, ${mouseY}px)` }"
                    />
                  </div>
                </div>

                <div v-if="!selectedImage" class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">

                  <div class="mt-3 flex justify-between">
                      <h1 class="inline-block text-3xl font-semibold tracking-tight text-black_p">{{ product.title }}</h1>
                      <h2 class="sr-only">Product information</h2>
                      <p class="inline-block text-3xl tracking-tight font-regular text-black_p">$ {{ product.price }}</p>
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
                            <p class="font-medium">12 Reviews</p>
                          </div>
                    </div>

                    <div class="mt-3">
                      <p class="font-regular text-lg">{{ product.description }}</p>
                    </div>
                </div>


                <form class="mt-6">
                    <div class="mt-5 flex">
                    <button type="submit" class="flex justify-center max-w-xs flex-1 items-center rounded-md border border-transparent bg-primary_p px-2 py-3 text-base font-medium text-white hover:bg-terciary_p focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terciary_p sm:w-full">
                      <div>
                        <i class="bi bi-whatsapp text-2xl me-2.5"></i>
                        <a class="text-2xl ms-2.5">Get In Touch</a>
                      </div>
                    </button>
                    </div>
                </form>
                <!--

                  <section aria-labelledby="details-heading" class="mt-12">
                      <h2 id="details-heading" class="sr-only">Additional details</h2>
  
                      <div class="divide-y divide-primary_p border-b border-primary_p">
                      <Disclosure class="" as="div" v-for="detail in product.details" :key="detail.name" v-slot="{ open }">
                          <h3>
                          <DisclosureButton class="group relative flex w-full items-center justify-between py-6 text-left">
                              <span :class="[open ? 'text-primary_p' : 'text-black_p', 'text-sm font-semibol']">{{ detail.name }}</span>
                              <span class="ml-6 flex items-center">
                              <PlusIcon v-if="!open" class="block h-6 w-6 text-primary_p group-hover:text-primary_p" aria-hidden="true" />
                              <MinusIcon v-else class="block h-6 w-6 text-primary_p group-hover:text-primary_p" aria-hidden="true" />
                              </span>
                          </DisclosureButton>
                          </h3>
                          <DisclosurePanel as="div" class="prose prose-sm pb-6">
                          <ul role="list">
                              <li v-for="item in detail.items" :key="item">{{ item }}</li>
                          </ul>
                          </DisclosurePanel>
                      </Disclosure>
                      </div>
                  </section>

                -->
                </div>
            </div>
            </div>
        </div>
    </div>

    <!--Content-->

    <div class="container mx-auto mt-16 grid text-center xl:text-start xl:grid-cols-2 gap-4">
      <div class="grid content-center">
        <div>
          <h2 class="font-regular text-2xl text-gray_p tracking-widest">OUR MISSION</h2>
          <p class="font-medium text-5xl xl:text-7xl text-black_p mt-12">Made from natural ingredients and does not harm the environment</p>
        </div>
      </div>
      <div class="relative">
        <img src="@/assets/images/general/hazelnuts.avif" alt="..." class="h-full w-full object-cover object-center sm:rounded-lg">
      </div>
    </div>

    <!--Reviews-->

          <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
            <div class="lg:col-span-4">
              <h2 class="text-2xl font-bold tracking-tight text-black_p">Customer Reviews</h2>




          <div class="mt-3 flex items-center">
            <div>
              <div class="flex items-center">
                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[averageRate > rating ? 'text-primary_p' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
              </div>
              <p class="sr-only">out of 5 stars</p>
            </div>
            <p class="ml-2 text-sm text-black_p">Based on {{ reviews.length }} reviews</p>
          </div>


          <div class="mt-6">
            <h3 class="sr-only">Review data</h3>
  
            <dl class="space-y-3">
              <div v-for="count in reviews.counts" :key="count.rating" class="flex items-center text-sm">
                <dt class="flex flex-1 items-center">
                  <p class="w-3 font-medium text-black_p">{{ count.rating }}<span class="sr-only"> star reviews</span></p>
                  <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                    <StarIcon :class="[count.count > 0 ? 'text-primary_p' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
  
                    <div class="relative ml-3 flex-1">
                      <div class="h-3 rounded-full border border-gray-200 bg-gray-100" />
                      <div v-if="count.count > 0" class="absolute inset-y-0 rounded-full border border-primary_p bg-terciary_p" :style="{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }" />
                    </div>
                  </div>
                </dt>
                <dd class="ml-3 w-10 text-right text-sm tabular-nums text-black_p">{{ Math.round((count.count / reviews.totalCount) * 100) }}%</dd>
              </div>
            </dl>
          </div>
          
                  <div class="mt-10">
                    <h3 class="text-lg font-medium text-black_p">Share your thoughts</h3>
                    <p class="mt-1 text-sm text-gray-600">If you’ve used this product, share your thoughts with other customers</p>
          
                    <a href="#" class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-black_p hover:bg-gray-50 sm:w-auto lg:w-full">Write a review</a>
                  </div>
                </div>
          
                <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                  <h3 class="sr-only">Recent reviews</h3>
          
                  <div class="flow-root">
                    <div class="-my-12 divide-y divide-gray-200">
                      <div v-for="review in reviews" key="" class="py-12">
                        <div class="flex items-center">
                          <img :src="`/api${review.user_image_url}`" :alt="`...`" class="h-12 w-12 rounded-full" />
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
    import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    } from '@headlessui/vue'
    import { StarIcon } from '@heroicons/vue/20/solid'
    import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
    import { onMounted, ref, reactive, watchEffect } from 'vue';
    import { useProductStore } from '@/stores/product';
    import { useRoute } from "vue-router";
    
    const selected = '';
    const route = useRoute();
    const productId = ref(0);
    const productStore = useProductStore();
    const product = reactive({});
    const reviews = ref([]);
    const averageRate = ref();

    onMounted(async () => {
        await productStore.fetchProductsData();        
    });

    const calculateAverageRate = () => {
      if (reviews.value.length === 0) {
        return 0;
      }

      const sum = reviews.value.reduce((total, review) => total + review.rate, 0);
      return sum / reviews.value.length;
    };

    watchEffect(async () => {
      productId.value = parseInt(route.params.product_id);
      if (productId.value) Object.assign(product, productStore.productById(productId.value));
      reviews.value = product.reviews
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
