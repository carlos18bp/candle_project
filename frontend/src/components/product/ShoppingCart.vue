<template>
    <!-- Shopping Cart Overlay -->
    <div class="fixed inset-0 flex justify-end z-50" v-if="visible">
        <div ref="background" 
            @click="closeCart()" 
            class="absolute inset-0 bg-gray-500 bg-opacity-40 backdrop-blur-md">
        </div>
        <div ref="cart" class="relative bg-white h-full w-full lg:w-2/5 shadow-lg flex flex-col z-60">
            <!-- Cart Header -->
            <div class="flex justify-between items-center p-10">
                <h2 class="text-2xl font-semibold test-shopping_cart">{{ $t("shopping_cart") }}</h2>
                <XMarkIcon @click="closeCart()" class="text-gray-500 cursor-pointer w-6 h-6">
                </XMarkIcon>
            </div>

            <!-- Cart Items -->
            <div v-if="cartProduct.length" class="p-10 space-y-4 flex-1 overflow-y-auto">
                <CartProduct v-for="product in cartProduct" 
                    :key="product.id" 
                    :product="product"
                    @addProduct="addProduct(product)" 
                    @removeProduct="removeProduct(product.id, product.colorSelected)" />
            </div>
            <div v-else class="text-lg font-regular ps-10">
                <p class="test-no_products">{{ $t("no_products") }}</p>
                <RouterLink :to="{ name: 'catalog' }" class="cursor-pointer">
                    <span class="text-primary_p test-continue_shopping">{{ $t("continue_shopping") }}</span>
                </RouterLink>
            </div>

            <!-- Cart Footer -->
            <div v-if="cartProduct.length" class="border-t p-4">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <h3 class="text-2xl font-semibold">Subtotal</h3>
                        <p class="text-md text-gray-500 font-medium">
                            Shipping and taxes calculated at checkout.
                        </p>
                    </div>
                    <span class="text-xl font-semibold">$ {{ cartTotalPrice }}</span>
                </div>
                <router-link to="/checkout">
                    <button
                        class="bg-primary_p text-white w-full mt-4 py-2 rounded-lg hover:bg-terciary_p font-medium text-xl tracking-wide test-checkout">
                        {{ $t("checkout") }}
                    </button>
                </router-link>
                <div class="text-center mt-4 font-regular text-lg">
                    <RouterLink :to="{ name: 'catalog' }" class="cursor-pointer">
                        <span class="text-black_p test-or">{{ $t("or") }}</span> <span class="text-primary_p test-continue_shopping">{{ $t("continue_shopping") }}</span>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watchEffect } from "vue";
    import CartProduct from "./CartProduct.vue";
    import { gsap } from "gsap";
    import { XMarkIcon } from "@heroicons/vue/24/outline";
    import { useLanguageStore } from "@/stores/language.js";
    import { useProductStore } from "@/stores/product";
    import enMessages from "@/locales/product/shopping_cart/en.js";
    import esMessages from "@/locales/product/shopping_cart/es.js";

    // Create references for Background and Cart Elements
    const background = ref(null);
    const cart = ref(null);

    // Reactive references for messages and language
    const messages = ref("");
    const $t = (key) => messages.value[key];
    const appStore = useLanguageStore();
    const currentLanguage = computed(() => appStore.getCurrentLanguage);

    // Product store references
    const productStore = useProductStore();
    const cartProduct = computed(() => productStore.cartProducts);
    const cartTotalPrice = computed(() => productStore.totalCartPrice);

    // Props definition
    const props = defineProps({
        visible: {
            type: Boolean,
            required: true,
        },
    });
    const emit = defineEmits(["update:visible"]);

    // Watch for changes in the current language, and in the state of shoppingCartToggle
    watchEffect(() => {
        messages.value = currentLanguage.value === "en" ? enMessages : esMessages;
        if (props.visible) {
            document.body.style.overflow = "hidden";
            if (background.value) {
                gsap.fromTo(
                    background.value,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 1,
                        ease: "power2.inOut",
                    }
                );
            }
            if (cart.value) {
                gsap.fromTo(
                    cart.value,
                    {
                        x: cart.value.offsetWidth,
                    },
                    {
                        x: 0,
                        duration: 1,
                        ease: "power2.inOut",
                    }
                );
            }
        } else {
            document.body.style.overflow = "auto";
        }
    });

    const closeCart = () => {
        // Create the animations like a promises
        const cartAnimation = gsap
            .fromTo(
                cart.value,
                {
                    x: 0,
                },
                {
                    x: cart.value.offsetWidth,
                    duration: 1,
                    ease: "power2.inOut",
                }
            )
            .then();

        const backgroundAnimation = gsap
            .fromTo(
                background.value,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut",
                }
            )
            .then();

        // Wait while both are finished
        Promise.all([cartAnimation, backgroundAnimation]).then(() => {
            emit("update:visible", false);
        });
    };

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
    const removeProduct = (productId, colorSelected) => {
        productStore.removeProductFromCart(productId, colorSelected);
    };
</script>
