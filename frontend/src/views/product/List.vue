<template>  
    <Header></Header>

    <div class="relative px-8">
        <div>
            <main class="mx-auto xl:max-w-7xl">
                <section aria-labelledby="products-heading">

                    <div class="grid gap-x-8 gap-y-10 grid-cols-4">
                        <!-- Filters -->
                        <div class="col-span-4 md:col-span-1">
                            <h1 class="text-2xl font-bold tracking-tight text-gray-900 py-8">Filter by Categories</h1>

                            <Disclosure as="div" v-for="category in categories" class="border-b border-gray-200 py-6" v-slot="{ open }">
                                <h3 class="-my-3 flow-root">
                                    <DisclosureButton class="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500 primary_p">
                                        <span class="font-medium text-gray-900">{{ category.name }}</span>
                                        <span class="flex items-center">
                                        <PlusIcon v-if="!open" class="h-5 w-5 text-primary_p" aria-hidden="true" />
                                        <MinusIcon v-else class="h-5 w-5 text-primary_p" aria-hidden="true" />
                                        </span>
                                    </DisclosureButton>
                                </h3>
                                <DisclosurePanel class="pt-6">
                                    <div class="space-y-4">
                                        <div v-for="(subCategory, subCategoryIdx) in category.subCategories" :key="subCategoryIdx" class="flex items-center">
                                        <input :id="`filter-${subCategoryIdx}`" type="checkbox" v-model="subCategory.checked" class="h-4 w-4 rounded border-gray-300 text-primary_p focus:ring-terciary_p" />
                                        <label :for="`filter-${subCategoryIdx}`" class="ml-3 text-sm text-gray-600">{{ subCategory.name }}</label>
                                        </div>
                                    </div>
                                </DisclosurePanel>
                            </Disclosure>
                        </div>

                        <!-- Product grid -->
                        <div class="col-span-4 md:col-span-3">
                            <div class="mx-auto pt-8 pb-16 max-w-7xl">
                                <h2 class="text-2xl font-bold tracking-tight text-gray-900">Candles</h2>

                                <div class="mt-6 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
                                    <div v-for="product in paginatedProducts" :key="product.id" class="group relative">
                                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 aspect-none group-hover:opacity-75 h-80 mb-4">
                                            <img :src="`/api/${product.images[0].image_url}`" class="object-cover object-center h-full w-full" />
                                        </div>
                                        <div class="mt- flex justify-between">
                                            <div>
                                            <h3 class="text-sm text-gray-700">
                                                <RouterLink
                                                    v-if="product.id"       
                                                    :to="{ name: 'product', 
                                                    params: { product_id: product.id } }">
                                                    <span aria-hidden="true" class="absolute inset-0" />
                                                    {{ product.title }}
                                                </RouterLink>
                                            </h3>
                                            </div>
                                            <p class="text-sm font-medium text-gray-900">$ {{ product.price }}</p>
                                        </div>
                                    </div>
                                </div>

                                <nav class="flex items-center justify-between border-t border-gray-200 px-4">
                                    <!-- Previous page button -->
                                    <a
                                        href="#"
                                        class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-terciary_p hover:text-terciary_p"
                                        @click="goToPage(currentPage - 1)"
                                        :disabled="currentPage === 1"
                                    >
                                        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-primary_p" aria-hidden="true" />
                                        Previous
                                    </a>

                                    <!-- Show page numbers -->
                                    <div>
                                        <template v-for="page in totalPages" :key="page">
                                            <a
                                            href="#"                
                                            class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium"
                                            :class="{ 'border-primary_p text-primary_p': currentPage === page, 'text-gray-500 hover:text-terciary_p hover:border-terciary_p': currentPage !== page }"
                                            @click="goToPage(page)"
                                            >
                                            {{ page }}
                                            </a>
                                        </template>
                                    </div>

                                    <!-- Next page button -->
                                    <a
                                        href="#"
                                        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-terciary_p hover:text-terciary_p"
                                        @click="goToPage(currentPage + 1)"
                                        :disabled="currentPage === totalPages"
                                    >
                                        Next
                                        <ArrowLongRightIcon class="ml-3 h-5 w-5 text-primary_p" aria-hidden="true" />
                                    </a>
                                </nav>                            
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>

    <Footer></Footer>
</template>

<script setup>
    import Header from "@/components/layouts/Header.vue";
    import Footer from "@/components/layouts/Footer.vue";
    import { computed, onMounted, ref, watchEffect } from "vue";
    import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    } from '@headlessui/vue'
    import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid';
    import { useProductStore } from '@/stores/product';
    import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';

    const productStore = useProductStore();
    const products = ref([]);
    const categories = ref([]);
    const currentPage = ref(1);
    const isProductsLoaded = ref(false);
    let productsPerPage;

    if (window.innerWidth >= 1024) {
        productsPerPage = 6;
    } else if (window.innerWidth < 1024 && 760 <= window.innerWidth){
        productsPerPage = 4;
    } else if  (window.innerWidth < 760) {
        productsPerPage = 3;
    }

    onMounted(async () => {
        await productStore.fetchProductsData();
        products.value = productStore.products;

        await productStore.fetchUniqueCategoriesAndSubCategories();
        categories.value = productStore.categories;

        isProductsLoaded.value = true;
    });

    watchEffect(() => {
        if (isAnyFilterChecked()) {            
            products.value = 
                productStore.productBySubCategory.length ?  
                    productStore.productBySubCategory : productStore.products
        } else {
            products.value = productStore.products;
        }
    }); 

    /**
     * Check if any filter was applied
     */
    function isAnyFilterChecked() {
        return categories.value.some(category =>
            category.subCategories.some(subCategory => subCategory.checked)
        );
    }

    /**
     * Calculate the total number of pages
     */
    const totalPages = computed(() => {
        if (isProductsLoaded.value) {
            return Math.ceil(products.value.length / productsPerPage);
        }
        return 0;
    });

    /**
     * Calculate the Products to display on the current page
     */
    const paginatedProducts = computed(() => {
        if (isProductsLoaded.value) {
        const start = (currentPage.value - 1) * productsPerPage;
        const end = start + productsPerPage;
        return products.value.slice(start, end);
        }
        return [];
    });

    // Property to store the scroll position
    const scrollPosition = ref(0);

    /**
     * Function to go to a specific page
     */
    const goToPage = (page) => {
        if (isProductsLoaded.value && page >= 1 && page <= totalPages.value) {
            // Save current scroll position
            scrollPosition.value = window.scrollY;
            currentPage.value = page;

            setTimeout(() => {
                window.scrollTo(0, scrollPosition.value);
            }, 0);
        }
    };
</script>