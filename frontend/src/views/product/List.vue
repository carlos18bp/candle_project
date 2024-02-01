<template>  
    <Header></Header>
    <div class="relative isolate px-6 lg:px-8">

        <div class="bg-white">
            <div>
            <!-- Mobile filter dialog -->
            <TransitionRoot as="template" :show="mobileFiltersOpen">
                <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full">
                    <DialogPanel class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div class="flex items-center justify-between px-4">
                        <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                        <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400" @click="mobileFiltersOpen = false">
                            <span class="sr-only">Close menu</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                        </div>

                        <!-- Filters -->
                        <form class="mt-4 border-t border-gray-200">
                        <h3 class="sr-only">Categories</h3>

                        <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                            <h3 class="-mx-2 -my-3 flow-root">
                            <DisclosureButton class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span class="font-medium text-gray-900">{{ section.name }}</span>
                                <span class="ml-6 flex items-center">
                                <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                                <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </DisclosureButton>
                            </h3>
                            <DisclosurePanel class="pt-6">
                            <div class="space-y-6">
                                <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                                <input :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-500">{{ option.label }}</label>
                                </div>
                            </div>
                            </DisclosurePanel>
                        </Disclosure>
                        </form>
                    </DialogPanel>
                    </TransitionChild>
                </div>
                </Dialog>
            </TransitionRoot>

            <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">Filters</h1>

                <div class="flex items-center">
                    <Menu as="div" class="relative inline-block text-left">
                    <div>
                        <MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                        </MenuButton>
                    </div>

                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <MenuItems class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                            <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                            <a :href="option.href" :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">{{ option.name }}</a>
                            </MenuItem>
                        </div>
                        </MenuItems>
                    </transition>
                    </Menu>

                    <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" @click="mobileFiltersOpen = true">
                    <span class="sr-only">Filters</span>
                    <FunnelIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
                </div>

                <section aria-labelledby="products-heading">
                <h2 id="products-heading" class="sr-only">Products</h2>

                <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    <!-- Filters -->
                    <form class="hidden lg:block">
                    <h3 class="sr-only">Categories</h3>

                    <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-b border-gray-200 py-6" v-slot="{ open }">
                        <h3 class="-my-3 flow-root">
                        <DisclosureButton class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span class="font-medium text-gray-900">{{ section.name }}</span>
                            <span class="ml-6 flex items-center">
                            <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                            <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </DisclosureButton>
                        </h3>
                        <DisclosurePanel class="pt-6">
                        <div class="space-y-4">
                            <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                            <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.label }}</label>
                            </div>
                        </div>
                        </DisclosurePanel>
                    </Disclosure>
                    </form>

                    <!-- Product grid -->
                    <div class="lg:col-span-3">
                        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Candles</h2>

                            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                                <div v-for="product in paginatedProducts" :key="product.id" class="group relative">
                                    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 mb-4">
                                        <img :src="`/api/${product.images[0].image_url}`" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
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

                            <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                                <!-- Previous page button -->
                                <a
                                    href="#"
                                    class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    @click="goToPage(currentPage - 1)"
                                    :disabled="currentPage === 1"
                                >
                                    <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Previous
                                </a>

                                <!-- Show page numbers -->
                                <div>
                                    <template v-for="page in totalPages" :key="page">
                                        <a
                                        href="#"                
                                        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium"
                                        :class="{ 'border-indigo-500 text-indigo-600': currentPage === page, 'text-gray-500 hover:text-gray-700 hover:border-gray-300': currentPage !== page }"
                                        @click="goToPage(page)"
                                        >
                                        {{ page }}
                                        </a>
                                    </template>
                                </div>

                                <!-- Next page button -->
                                <a
                                    href="#"
                                    class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    @click="goToPage(currentPage + 1)"
                                    :disabled="currentPage === totalPages"
                                >
                                    Next
                                    <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </a>
                            </nav>                            
                        </div>
                    </div>
                </div>
                </section>
            </main>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
    import Header from "@/components/layouts/Header.vue";
    import Footer from "@/components/layouts/Footer.vue";
    import { computed, onMounted, ref } from "vue";
    import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    } from '@headlessui/vue'
    import { XMarkIcon } from '@heroicons/vue/24/outline';
    import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/vue/20/solid';
    import { useProductStore } from '@/stores/product';
    import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';

    const productStore = useProductStore();
    const products = ref([]);
    const currentPage = ref(1);
    const productsPerPage = 6;
    const isProductsLoaded = ref(false);

    onMounted(async () => {
        await productStore.fetchProductsData();
        products.value = productStore.products;

        isProductsLoaded.value = true;
    });

    // Calculate the total number of pages
    const totalPages = computed(() => {
        if (isProductsLoaded.value) {
            return Math.ceil(products.value.length / productsPerPage);
        }
        return 0;
    });

    // Calculate the Products to display on the current page
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

    // Function to go to a specific page
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

    const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
    ]

    const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
        { value: 'white', label: 'White', checked: false },
        { value: 'beige', label: 'Beige', checked: false },
        { value: 'blue', label: 'Blue', checked: true },
        { value: 'brown', label: 'Brown', checked: false },
        { value: 'green', label: 'Green', checked: false },
        { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
        { value: 'new-arrivals', label: 'New Arrivals', checked: false },
        { value: 'sale', label: 'Sale', checked: false },
        { value: 'travel', label: 'Travel', checked: true },
        { value: 'organization', label: 'Organization', checked: false },
        { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
        { value: '2l', label: '2L', checked: false },
        { value: '6l', label: '6L', checked: false },
        { value: '12l', label: '12L', checked: false },
        { value: '18l', label: '18L', checked: false },
        { value: '20l', label: '20L', checked: false },
        { value: '40l', label: '40L', checked: true },
        ],
    },
    ]

    const mobileFiltersOpen = ref(false)
</script>