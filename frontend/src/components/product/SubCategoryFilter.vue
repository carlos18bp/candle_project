<template>    
    <div class="space-y-4">
        <!-- Loop through subcategories and create checkbox inputs -->
        <div v-for="(subCategory, subCategoryIdx) in subCategories" :key="subCategoryIdx" class="flex items-center">
            <input :id="`filter-${subCategoryIdx}`" type="checkbox" v-model="subCategory.checked"
                @change="handleCategoryChange"
                class="h-4 w-4 rounded border-gray-300 text-primary_p focus:ring-terciary_p" />
            <label :for="`filter-${subCategoryIdx}`" class="ml-3 text-sm text-gray-600">
                {{ subCategory.name }}
            </label>
        </div>
    </div>
</template>

<script setup>
    import { computed } from "vue";
    import { useLanguageStore } from '@/stores/language.js';
    import { useProductStore } from "@/stores/product";

    // Store references
    const appStore = useLanguageStore();
    const productStore = useProductStore();

    // Computed property for the current language
    const currentLanguage = computed(() => appStore.getCurrentLanguage);

    // Props definition
    const props = defineProps({
        subCategories: Array,
    });

    /**
     * Handles changes in category selection.
     * Forces a re-render and filters products based on selected subcategories.
     */
    const handleCategoryChange = () => {
        if (currentLanguage.value === 'en') {
            productStore.productBySubCategory();
        } else {
            productStore.productBySubCategoria();
        }
    };
</script>