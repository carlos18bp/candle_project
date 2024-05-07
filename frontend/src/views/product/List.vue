<template>
  <Banner></Banner>
  <Header></Header>

  <div class="relative px-8">
    <div>
      <main class="mx-auto xl:max-w-7xl">
        <section aria-labelledby="products-heading">
          <div class="grid gap-x-8 gap-y-10 grid-cols-4">
            <!-- Filters -->
            <div class="col-span-4 md:col-span-1">
              <h1 class="text-2xl font-bold tracking-tight text-gray-900 py-8">
                {{ $t('filter_title') }}
              </h1>

              <CategoryFilter
                v-if="currentLanguage === 'en'"
                :categories="categories"
                :currentLanguage="currentLanguage"
              >
              </CategoryFilter>
              <CategoryFilter
                v-else
                :categories="categorias"
                :currentLanguage="currentLanguage"
              >
              </CategoryFilter>
            </div>

            <!-- Product grid -->
            <div class="col-span-4 md:col-span-3">
              <div class="mx-auto pt-8 pb-16 max-w-7xl">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                  {{ $t('candles') }}
                </h2>

                <div
                  class="mt-6 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3"
                >
                  <div
                    v-for="product in paginatedProducts"
                    :key="product.id"
                    class="group relative"
                  >
                    <div
                      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 aspect-none group-hover:opacity-75 h-80 mb-4"
                    >
                      <img
                        v-if="product.images[0].image_url"
                        :src="`/api/${product.images[0].image_url}`"
                        class="object-cover object-center h-full w-full"
                      />
                    </div>
                    <div class="mt- flex justify-between">
                      <div>
                        <h3 v-if="currentLanguage === 'en' " class="text-sm text-gray-700">
                          <RouterLink
                            v-if="product.id"
                            :to="{
                              name: 'product',
                              params: { product_id: product.id },
                            }"
                          >
                            <span aria-hidden="true" class="absolute inset-0" />
                            {{ product.title }}
                          </RouterLink>
                        </h3>

                        <h3 v-else class="text-sm text-gray-700">
                          <RouterLink
                            v-if="product.id"
                            :to="{
                              name: 'product',
                              params: { product_id: product.id },
                            }"
                          >
                            <span aria-hidden="true" class="absolute inset-0" />
                            {{ product.titulo }}
                          </RouterLink>
                        </h3>
                      </div>
                      <p class="text-sm font-medium text-gray-900">
                        $ {{ product.price }}
                      </p>
                    </div>
                  </div>
                </div>

                <nav
                  class="flex items-center justify-between border-t border-gray-200 px-4 mt-8"
                >
                  <!-- Previous page button -->
                  <a
                    href="#"
                    class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-terciary_p hover:text-terciary_p"
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                  >
                    <ArrowLongLeftIcon
                      class="mr-3 h-5 w-5 text-primary_p"
                      aria-hidden="true"
                    />
                    {{ $t('previous') }}
                  </a>

                  <!-- Show page numbers -->
                  <div>
                    <template v-for="page in totalPages" :key="page">
                      <a
                        href="#"
                        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium"
                        :class="{
                          'border-primary_p text-primary_p':
                            currentPage === page,
                          'text-gray-500 hover:text-terciary_p hover:border-terciary_p':
                            currentPage !== page,
                        }"
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
                    {{ $t('next') }}
                    <ArrowLongRightIcon
                      class="ml-3 h-5 w-5 text-primary_p"
                      aria-hidden="true"
                    />
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
  import Banner from "@/components/layouts/Banner.vue";
  import Header from "@/components/layouts/Header.vue";
  import Footer from "@/components/layouts/Footer.vue";
  import CategoryFilter from "@/components/product/CategoryFilter.vue";
  import { computed, onMounted, ref, watchEffect } from "vue";
  import { useProductStore } from "@/stores/product";
  import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/vue/20/solid";
  import { useAppStore } from '@/stores/language.js';
  import enMessages from '@/locales/product/list/en.js';
  import esMessages from '@/locales/product/list/es.js';

  const messages = ref('');
  const $t = (key) => messages.value[key];
  const appStore = useAppStore();
  const currentLanguage = ref('');
  const productStore = useProductStore();
  const products = ref([]);
  const categories = ref([]);
  const categorias = ref([]);
  const currentPage = ref(1);
  const isProductsLoaded = ref(false);
  let productsPerPage;

  if (window.innerWidth >= 1024) {
    productsPerPage = 6;
  } else if (window.innerWidth < 1024 && 760 <= window.innerWidth) {
    productsPerPage = 4;
  } else if (window.innerWidth < 760) {
    productsPerPage = 3;
  }

  onMounted(async () => {
    window.scrollTo({ top: 0 });
    
    await productStore.fetchProductsData();
    products.value = productStore.products;

    await productStore.fetchUniqueCategoriesAndSubCategories();
    categories.value = productStore.categories;
    categorias.value = productStore.categorias;

    isProductsLoaded.value = true;
    watchEffect(() => {
        currentLanguage.value = appStore.getCurrentLanguage;
        if (currentLanguage.value === 'en') {
          messages.value = enMessages;
        } else {
          messages.value = esMessages;
        }
    });

  });

  watchEffect(() => {
    products.value = productStore.products;
    if (isAnyFilterChecked()) {
      if (currentLanguage.value === 'en') {
        if (productStore.productBySubCategory.length) {
          products.value = productStore.productBySubCategory;
        }
      } else {
        if (productStore.productBySubCategoria.length) {
          products.value = productStore.productBySubCategoria;
        }
      }
    }
  });

  /**
   * Check if any filter was applied
   */
  function isAnyFilterChecked() {
    if (currentLanguage.value === 'en') {
      return categories.value.some((category) =>
          category.subCategories.some((subCategory) => subCategory.checked)
      );
    } else {
      return categorias.value.some((categoria) =>
          categoria.subCategorias.some((subCategoria) => subCategoria.checked)
      );
    }
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
