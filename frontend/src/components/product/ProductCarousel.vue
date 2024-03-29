<template> 
  <div class=" xl:mx-auto w-full px-4 lg:max-w-7xl lg:px-8">
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="product in topProducts" :key="product.id" class="group relative">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img :src="`/api/${product.images[0].image_url}`" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h2 v-if="currentLanguage === 'en'" class="text-lg font-semibold text-black_p">
                <RouterLink
                    v-if="product.id"       
                    :to="{ name: 'product', 
                    params: { product_id: product.id } }">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ product.title }}
                </RouterLink>
              </h2>
              <h2 v-else class="text-lg font-semibold text-black_p">
                <RouterLink
                    v-if="product.id"       
                    :to="{ name: 'product', 
                    params: { product_id: product.id } }">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ product.titulo }}
                </RouterLink>
              </h2>
            </div>
            <p class="text-sm font-medium text-black_p">$ {{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
  import { onMounted, ref, watchEffect } from "vue";
  import { useProductStore } from '@/stores/product';
  import { useAppStore } from '@/stores/language.js';

  const appStore = useAppStore();
  const currentLanguage = ref('');
  const props = defineProps({
      top: Number,
  });

  const productStore = useProductStore();
  const topProducts = ref([]); 

  onMounted(async () => {
      watchEffect(() => {
        currentLanguage.value = appStore.getCurrentLanguage;
      })
      await productStore.fetchProductsData();
      topProducts.value = productStore.products.slice(0, props.top);
  });
</script>