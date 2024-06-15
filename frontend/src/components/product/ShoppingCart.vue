<template>
    <!-- Shopping Cart Overlay -->
    <div class="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50" v-show="shoppingCartToggle">
        <div class="bg-white h-full w-full max-w-md shadow-lg flex flex-col">

            <!-- Cart Header -->
            <div class="flex justify-between items-center border-b p-4">
                <h2 class="text-xl font-semibold">{{ $t('shopping_cart') }}</h2>
                <button @click="$emit('toggle-cart')" class="text-gray-500 hover:text-gray-700">
                    <span class="text-xl">&times;</span>
                </button>
            </div>

            <!-- Cart Items -->
            <div v-if="cartProduct.length" class="p-4 space-y-4 flex-1 overflow-y-auto">
                <CartProduct v-for="product in cartProduct" :key="product.id" :product="product"
                    @addProduct="addProduct(product)" @removeProduct="removeProduct(product.id)" />
            </div>
            <div v-else>
                <p class="p-4">{{ $t('no_products') }}</p>
            </div>

            <!-- Cart Footer -->
            <div class="border-t p-4">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-lg font-semibold">Total</span>
                    <span class="text-lg font-semibold">$ {{ cartTotalPrice }}</span>
                </div>
                <button class="bg-primary_p text-white w-full py-2 rounded hover:bg-yellow-600">
                    {{ $t('checkout') }}
                </button>
                <div class="text-center mt-4">
                    <RouterLink :to="{ name: 'catalog' }" class="cursor-pointer text-primary_p hover:underline">
                        {{ $t('continue_shopping') }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watchEffect } from 'vue';
    import CartProduct from './CartProduct.vue';
    import { useAppStore } from '@/stores/language.js';
    import { useProductStore } from "@/stores/product";
    import enMessages from '@/locales/product/shopping_cart/en.js';
    import esMessages from '@/locales/product/shopping_cart/es.js';

    // Reactive references for messages and language
    const messages = ref('');
    const $t = (key) => messages.value[key];
    const appStore = useAppStore();
    const currentLanguage = computed(() => appStore.getCurrentLanguage);

    // Product store references
    const productStore = useProductStore();
    const cartProduct = computed(() => productStore.cartProducts);
    const cartTotalPrice = computed(() => productStore.totalCartPrice);

    // Props definition
    const props = defineProps({
        shoppingCartToggle: {
            type: Boolean,
            required: true
        }
    });

    // Watch for changes in the current language
    watchEffect(() => {
        messages.value = currentLanguage.value === 'en' ? enMessages : esMessages;
    });

    /**
     * Add product to cart
     * @param {Object} product - The product to add
     */
    const addProduct = (product) => {
        productStore.addProductToCart(product, 1, product.colorSelected);
    };

    /**
     * Remove product from cart
     * @param {Number} productId - The ID of the product to remove
     */
    const removeProduct = (productId) => {
        productStore.removeProductFromCart(productId);
    };
</script>