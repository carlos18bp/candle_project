<template>
    <div v-if="product" class="flex border-b pb-4 h-40 mb-4">
        <!-- Product Image -->
        <img :src="product.gallery_urls[0]" alt="Product Image" class="w-40 h-full rounded" />
        <div class="h-full relative flex-1 pl-4">

            <!-- Product Title -->
            <h3 class="font-semibold text-xl" v-if="currentLanguage === 'en'">{{ product.title }}</h3>
            <h3 class="font-semibold text-xl" v-else>{{ product.titulo }}</h3>
            <!-- Selected Color -->
            <p class="text-md font-medium text-gray-500">{{ product.colorSelected }}</p>

            <!-- Quantity -->
            <p class="text-md text-gray-500 font-medium absolute bottom-0">Qty {{ product.quantity }}</p>
        </div>
        <div class="text-right h-full grid">
            <!-- Total Price -->
            <p class="text-xl font-semibold">${{ product.price * product.quantity }}</p>
            <div class="grid grid-cols-2 items-end text-md font-medium">
                <!-- Add Product Button -->
                <button @click="$emit('addProduct', product)" class="text-terciary_p hover:underline">
                    {{ $t('add') }}
                </button>
                <!-- Remove Product Button -->
                <button @click="$emit('removeProduct', product.id)" class="text-gray-500 hover:underline">
                    {{ $t('remove') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watchEffect } from 'vue';
    import { useAppStore } from '@/stores/language.js';
    import enMessages from '@/locales/product/shopping_cart/en.js';
    import esMessages from '@/locales/product/shopping_cart/es.js';

    // Reactive reference for messages
    const messages = ref('');

    // Translation function
    const $t = (key) => messages.value[key];

    // Store
    const appStore = useAppStore();

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