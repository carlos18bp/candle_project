<template>
    <div v-if="product" class="flex justify-between items-center border-b pb-4 mb-4">
        <!-- Product Image -->
        <img :src="product.gallery_urls[0]" alt="Product Image" class="w-20 h-20 rounded" />
        <div class="flex-1 ml-4">
            <!-- Product Title -->
            <h3 class="font-semibold">{{ product.title }}</h3>
            <!-- Selected Color -->
            <p class="text-sm text-gray-500">{{ product.colorSelected }}</p>
            <!-- Quantity -->
            <p class="text-sm">Qty {{ product.quantity }}</p>
        </div>
        <div class="text-right">
            <!-- Total Price -->
            <p class="text-lg font-semibold">${{ product.price * product.quantity }}</p>
            <div class="space-x-8">
                <!-- Add Product Button -->
                <button @click="$emit('addProduct', product)" class="text-yellow-400 hover:underline">
                    {{ $t('add') }}
                </button>
                <!-- Remove Product Button -->
                <button @click="$emit('removeProduct', product.id)" class="text-red-500 hover:underline">
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