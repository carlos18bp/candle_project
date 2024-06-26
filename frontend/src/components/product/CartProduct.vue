<template>
    <div v-if="product" class="flex border-b pb-4 h-40 mb-4">
        <!-- Product Image -->
        <img :src="product.gallery_urls[0]" alt="Product Image" class="w-20 h-20 lg:w-40 lg:h-full rounded" />
        <div class="grid h-full relative flex-1 pl-4">
            <div class="flex justify-between">
                <div>
                    <!-- Product Title -->
                    <h3 class="font-semibold text-xl test-title-en" v-if="currentLanguage === 'en'">
                        {{ product.title }}
                    </h3>
                    <h3 class="font-semibold text-xl test-title-es" v-else>{{ product.titulo }}</h3>
                    <!-- Selected Color -->
                    <p class="text-md font-medium text-gray-500 test-color">
                        {{ product.colorSelected }}
                    </p>
                </div>
                <!-- Total Price -->
                <p class="text-xl font-semibold test-price">${{ product.price * product.quantity }}</p>
            </div>
            <div class="flex justify-between items-end">
                <!-- Quantity -->
                <p class="text-md text-gray-500 font-medium">
                    Qty {{ product.quantity }}
                </p>
                <div class="flex gap-2">
                    <!-- Add Product Button -->
                    <a @click="$emit('addProduct', product)" 
                        class="text-terciary_p font-medium text-md cursor-pointer test-add">
                        {{ $t('add') }}
                    </a>
                    <!-- Remove Product Button -->
                    <a @click="$emit('removeProduct', product.id)" 
                        class="text-gray-500 font-medium text-md cursor-pointer test-remove">
                        {{ $t('remove') }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watchEffect } from 'vue';
    import { useLanguageStore } from '@/stores/language.js';
    import enMessages from '@/locales/product/shopping_cart/en.js';
    import esMessages from '@/locales/product/shopping_cart/es.js';

    // Reactive reference for messages
    const messages = ref('');

    // Translation function
    const $t = (key) => messages.value[key];

    // Store
    const appStore = useLanguageStore();

    // Computed property for the current language
    const currentLanguage = computed(() => appStore.getCurrentLanguage);

    // Props definition
    const props = defineProps({
        product: Object,
    });

    // Watch for changes in the current language
    watchEffect(() => {
        messages.value = currentLanguage.value === 'en' ? enMessages : esMessages;
    });
</script>
