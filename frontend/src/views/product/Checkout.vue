<template>
    <div class="flex flex-col bg-white">
        <Banner></Banner>
        <!-- Header -->
        <header class="flex justify-between items-center px-8 py-2">
            <router-link :to="{ name: 'home' }">
                <img src="@/assets/images/logo.png" alt="Caropa Couture Logo" class="h-20 cursor-pointer" />
            </router-link>

            <div class="hidden lg:flex items-center space-x-4">
                <LockClosedIcon class="text-black_p w-6 h-6"></LockClosedIcon>
                <div class="flex items-center space-x-2">
                    <span class="text-black_p text-lg font-bold test-purchase_safety">{{
                        $t("purchase_safety")
                    }}</span>
                </div>
                <div class="flex items-center space-x-2 text-lg">
                    <span class="cursor-pointer font-bold" @click="handleLanguage('en')">
                        EN
                    </span>
                    <span class="font-bold">|</span>
                    <span class="cursor-pointer font-bold" @click="handleLanguage('es')">
                        ES 
                    </span>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <div class="w-full grid lg:grid-cols-2 min-h-screen">
            <!-- Left Column -->
            <div class="relative w-full order-2 lg:order-1">
                <form @submit.prevent="handleSubmit" class="sticky top-0 py-8 px-8">
                    <h2 class="text-3xl font-semibold test-contact_information">
                        {{ $t("contact_information") }}
                    </h2>
                    <div class="mt-4">
                        <label class="block text-gray-500 mb-2 font-semibold text-lg test-email_address">{{
                        $t("email_address")
                    }}</label>
                        <input type="email" v-model="form.email"
                            class="w-full p-3 font-regular border border-gray-500 rounded-lg bg-transparent focus:ring-0 focus:ring-transparent focus:outline-none focus:border-black_p"
                            required />
                    </div>

                    <h2 class="text-3xl font-semibold mt-6 test-payment_details">
                        {{ $t("payment_details") }}
                    </h2>
                    <div class="mt-4">
                        <label class="block text-gray-500 mb-2 font-semibold text-lg test-card_number">{{
                        $t("card_number")
                    }}</label>
                        <input type="text" v-model="form.cardNumber"
                            class="w-full p-3 font-regular border border-gray-500 rounded-lg bg-transparent focus:ring-0 focus:ring-transparent focus:outline-none focus:border-black_p"
                            required />
                    </div>
                    <div class="mt-4 grid grid-cols-4 gap-4">
                        <div class="col-span-3">
                            <label class="block text-gray-500 mb-2 font-semibold text-lg test-expiration_date">{{
                        $t("expiration_date")
                    }}</label>
                            <input type="text" v-model="form.expirationDate"
                                class="w-full p-3 font-regular border border-gray-500 rounded-lg bg-transparent focus:ring-0 focus:ring-transparent focus:outline-none focus:border-black_p"
                                required />
                        </div>
                        <div class="col-span-1">
                            <label class="block text-gray-500 mb-2 font-semibold text-lg">CVC</label>
                            <input type="text" v-model="form.cvc"
                                class="w-full p-3 font-regular border border-gray-500 rounded-lg bg-transparent focus:ring-0 focus:ring-transparent focus:outline-none focus:border-black_p"
                                required />
                        </div>
                    </div>

                    <h2 class="text-3xl font-semibold mt-6 test-shipping_address">
                        {{ $t("shipping_address") }}
                    </h2>
                    <div class="mt-4">
                        <label class="block text-gray-500 mb-2 font-semibold text-lg test-address">{{
                        $t("address")
                    }}</label>
                        <input type="text" v-model="form.address"
                            class="w-full p-3 font-regular border border-gray-500 rounded-lg bg-transparent focus:ring-0 focus:ring-transparent focus:outline-none focus:border-black_p"
                            required />
                    </div>
                    <div class="mt-4 grid grid-cols-2 lg:flex gap-4">
                        <div class="col-span-2">
                            <label class="block text-gray-500 mb-2 font-semibold text-lg test-city">{{
                        $t("city")
                    }}</label>
                            <input type="text" v-model="form.city"
                                class="w-full p-3 font-regular border border-gray-500 rounded-lg bg-transparent focus:ring-0 focus:ring-transparent focus:outline-none focus:border-black_p"
                                required />
                        </div>
                        <div>
                            <label class="block text-gray-500 mb-2 font-semibold text-lg test-state_province">{{
                        $t("state_province")
                    }}</label>
                            <input type="text" v-model="form.state"
                                class="w-full p-3 font-regular border border-gray-500 rounded-lg bg-transparent focus:ring-0 focus:ring-transparent focus:outline-none focus:border-black_p"
                                required />
                        </div>
                        <div>
                            <label class="block text-gray-500 mb-2 font-semibold text-lg test-postal_code">{{
                        $t("postal_code")
                    }}</label>
                            <input type="text" v-model="form.postalCode"
                                class="w-full p-3 font-regular border border-gray-500 rounded-lg bg-transparent focus:ring-0 focus:ring-transparent focus:outline-none focus:border-black_p"
                                required />
                        </div>
                    </div>

                    <div class="flex justify-end mt-6">
                        <button type="submit"
                            class="w-36 bg-terciary_p text-white p-3 rounded-lg hover:bg-primary_p font-semibold text-lg tracking-wider test-pay_now">
                            {{ $t("pay_now") }}
                        </button>
                    </div>
                </form>
            </div>

            <!-- Right Column -->
            <div class="w-full bg-terciary_p px-8 lg:px-16 py-8 order-1 lg:order-2">
                <h2 class="text-2xl font-semibold text-brown test-amount_due">
                    {{ $t("amount_due") }}
                </h2>
                <h2 class="font-semibold text-4xl text-white -mt-2">
                    $ {{ productStore.totalCartPrice }}
                </h2>
                <div class="mt-8 lg:ps-12 divide-y-2 divide-brown overflow-auto">
                    <div v-for="product in cartProducts" :key="product.id"
                        class="flex items-center justify-between h-40 py-4 box-content">
                        <!-- Product Image -->
                        <img :src="product.gallery_urls[0]" alt="Product Image" class="w-28 lg:w-40 lg:h-full rounded" />
                        <div class="h-full relative flex-1 pl-4">
                            <div>
                                <!-- Product Title -->
                                <h3 class="font-semibold text-xl text-white" v-if="currentLanguage === 'en'">
                                    {{ product.title }}
                                </h3>
                                <h3 class="font-semibold text-xl text-white" v-else>
                                    {{ product.titulo }}
                                </h3>
                                <!-- Selected Color -->
                                <p class="text-md font-semibold text-brown">
                                    {{ product.colorSelected }}
                                </p>
                            </div>
                            <!-- Quantity -->
                            <p class="absolute bottom-0 text-md font-semibold text-brown">
                                Qty {{ product.quantity }}
                            </p>
                        </div>
                        <div class="text-right relative h-full grid">
                            <!-- Total Price -->
                            <p class="text-xl font-semibold text-white">
                                ${{ product.price * product.quantity }}
                            </p>
                            <!-- Remove Product Button -->
                            <div class="flex items-end">
                                <a @click="removeProduct(product.id, product.colorSelected)" class="text-white font-semibold text-lg test-remove">
                                    {{ $t("remove") }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-10 border-t-2 border-t-brown">
                    <div class="flex justify-between mt-4">
                        <span class="text-brown font-semibold text-2xl">Subtotal</span>
                        <span class="text-brown font-semibold text-2xl">$ {{ productStore.totalCartPrice }}</span>
                    </div>
                    <div class="flex justify-between mt-4">
                        <span class="text-brown font-semibold text-2xl test-shipping">
                            {{ $t("shipping") }}
                        </span>
                        <span class="text-brown font-semibold text-2xl">$ {{ shippingCost }}</span>
                    </div>
                </div>

                <div class="mt-4 border-t-2 border-brown">
                    <div class="mt-4 flex justify-between font-semibold text-2xl">
                        <span class="text-white test-total">Total</span>
                        <span class="text-white">$ {{ total }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="bg-black_p text-white p-4 text-start text-lg font-medium">
            © 2024 Senses Candles By Kate. All rights reserved.
        </div>
    </div>
</template>

<script setup>
    import { computed, reactive, ref, watchEffect, onMounted } from "vue";
    import Banner from "@/components/layouts/Banner.vue";
    import { LockClosedIcon } from "@heroicons/vue/24/outline";
    import { useAppStore } from "@/stores/language.js";
    import { useProductStore } from "@/stores/product";
    import enMessages from "@/locales/product/checkout/en.js";
    import esMessages from "@/locales/product/checkout/es.js";
    import Swal from 'sweetalert2';
    import { useRouter } from 'vue-router';

    // Product store references
    const productStore = useProductStore();
    const cartProducts = computed(() => productStore.cartProducts);
    const shippingCost = ref(25.0);
    const total = computed(() => productStore.totalCartPrice + shippingCost.value);

    // Reactive references for language
    const appStore = useAppStore();
    const currentLanguage = computed(() => appStore.getCurrentLanguage);
    const messages = ref(enMessages);

    const router = useRouter();

    // Translation function
    const $t = (key) => messages.value[key];

    // Form reference
    const form = reactive({
        email: "",
        cardNumber: "",
        expirationDate: "",
        cvc: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        soldProducts: "",
    });

    watchEffect(() => {
        messages.value = currentLanguage.value === "en" ? enMessages : esMessages;
    });

    // It's necesary to activate overflow after Shopping Cart component
    onMounted(() => {
        document.body.style.overflow = 'auto'
    })

    /**
     * Handle form submission
     */
    const handleSubmit = () => {
        form.soldProducts = extractProductInfo(cartProducts.value);
        productStore.createSale(form);

        localStorage.removeItem("cartProducts");
        productStore.cartProducts = [];

        Swal.fire({
            title: "The payment has been processed successfully",
            icon: "success"
        });

        router.push({ name: "home" });
    };

    /**
     * Handle language change
     * @param {string} lang - Language to set
     */
    const handleLanguage = (lang) => {
        appStore.setCurrentLanguage(lang);
    };

    /**
     * Extract specific fields from a list of products.
     *
     * @param {Array} products - The list of products to process.
     * @returns {Array} A new array of objects, where each object contains only the properties of each product.
     */
    const extractProductInfo = (products) => {
        return products.map((product) => ({
            product_id: product.id,
            color_selected: product.colorSelected,
            quantity: product.quantity,
        }));
    };

    /**
     * Remove product from cart
     * @param {Number} productId - The ID of the product to remove
     */
    const removeProduct = (productId, colorSelected) => {
        productStore.removeProductFromCart(productId, colorSelected);
    };
</script>

<style scoped>
    body {
        font-family: "Arial", sans-serif;
    }
</style>
