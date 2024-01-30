<template>  
    <Header></Header>

    <div v-if="productStore?.products" class="relative isolate px-6 lg:px-8">
        <div class="bg-white">
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
            <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                <!-- Image gallery -->
                <TabGroup as="div" class="flex flex-col-reverse">
                    <!-- Image selector -->
                    <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                        <TabList class="grid grid-cols-4 gap-6">
                            <Tab v-for="image in product.images" :key="image.id" class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-black_p hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 transition-transform duration-300 transform hover:scale-110">
                                <span class="sr-only">{{ image.name }}</span>
                                <span class="absolute inset-0 overflow-hidden rounded-md">
                                    <img :src="image.src" alt="" class="h-full w-full object-cover object-center" />
                                </span>
                                <span :class="[selected ? 'ring-primary_p' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
                            </Tab>
                        </TabList>
                    </div>

                    <TabPanels class="aspect-h-1 aspect-w-1 w-full">
                        <TabPanel v-for="image in product.images" :key="image.id">
                            <img :src="image.src" :alt="image.alt" class="h-full w-full object-cover object-center sm:rounded-lg" @mouseenter="selectedImage = image" @mouseleave="selectedImage = ''"/>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>


                <!-- Product info -->

                <div v-if="selectedImage" class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <div class="w-full">
                    <img
                      :src="selectedImage.src"
                      :alt="selectedImage.alt"
                      class="w-full object-cover mb-4"
                    />
                  </div>
                </div>

                <div v-if="!selectedImage" class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">

                  <div class="mt-3 flex justify-between">
                      <h1 class="inline-block text-3xl font-semibold tracking-tight text-black_p">{{ product.name }}</h1>
                      <h2 class="sr-only">Product information</h2>
                      <p class="inline-block text-3xl tracking-tight font-regular text-black_p">{{ product.price }}</p>
                  </div>

                <!-- Reviews -->
                    <div class="mt-3">
                        <h3 class="sr-only">Reviews</h3>
                        <div class="flex items-center">
                          <div class="flex items-center">
                              <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[product.rating > rating ? 'text-terciary_p' : 'text-gray-300', 'h-5 w-5 flex-shrink-0', ]" aria-hidden="true" />
                          </div>
                          <p class="sr-only">{{ product.rating }} out of 5 stars</p>
                          <div class="ms-3">
                            <p class="font-medium">12 Reviews</p>
                          </div>
                    </div>

                    <div class="mt-3">
                      <p class="font-regular text-lg">Like the scent of the mountains.</p>
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
                </div>
            </div>
            </div>
        </div>
    </div>

    <!--Content-->

    <div class="container mx-auto mt-16 grid grid-cols-2 gap-4">
      <div class="grid content-center">
        <div>
          <h2 class="font-regular text-lg text-gray_p tracking-widest">OUR MISSION</h2>
          <p class="font-medium text-7xl text-black_p mt-12">Made from natural ingredients and does not harm the environment</p>
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
              <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[reviews.average > rating ? 'text-primary_p' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
            </div>
            <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
          </div>
          <p class="ml-2 text-sm text-black_p">Based on {{ reviews.totalCount }} reviews</p>
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
            <div v-for="review in reviews.featured" :key="review.id" class="py-12">
              <div class="flex items-center">
                <img :src="review.avatarSrc" :alt="`${review.author}.`" class="h-12 w-12 rounded-full" />
                <div class="ml-4">
                  <h4 class="text-sm font-bold text-black_p">{{ review.author }}</h4>
                  <div class="mt-1 flex items-center">
                    <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[review.rating > rating ? 'text-primary_p' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
                  </div>
                  <p class="sr-only">{{ review.rating }} out of 5 stars</p>
                </div>
              </div>

              <div class="mt-4 space-y-6 text-base italic text-gray-600" v-html="review.content" />
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
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    } from '@headlessui/vue'
    import { StarIcon } from '@heroicons/vue/20/solid'
    import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

    import { onMounted, onUnmounted, ref } from 'vue';
    import { useProductStore } from '@/stores/product';
  
    const productStore = useProductStore();
    

    onMounted(async () => {
      await productStore.fetchProductsData();
      console.log(productStore.products);
    });




    const reviews = {
        average: 4,
        totalCount: 1624,
        counts: [
            { rating: 5, count: 1019 },
            { rating: 4, count: 162 },
            { rating: 3, count: 97 },
            { rating: 2, count: 199 },
            { rating: 1, count: 147 },
        ],
        featured: [
            {
            id: 1,
            rating: 5,
            content: `
                <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
            `,
            author: 'Emily Selman',
            avatarSrc:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
            },
            // More reviews...
        ],
    };

    const product = {
        name: 'Zip Tote Basket',
        price: '$140',
        rating: 4,
        images: [
            {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
            },
            {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
            },
            {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
            },
            {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
            },
            
            // More images...
        ],
        colors: [
            { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
            { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
            { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
        ],
        description: `
            <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
        `,
        details: [
            {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
            },
            {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
            },
            {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
            },
            // More sections...
        ],
    }

const selectedColor = ref(product.colors[0])


const selectedImage = ref(null);



</script>