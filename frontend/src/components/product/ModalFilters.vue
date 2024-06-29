<template>
    <!-- Modal overlay -->
    <div v-if="visible" class="fixed inset-0 flex items-center z-50 py-16">
        <div 
            ref="background"
            @click="closeModal()" 
            class="absolute inset-0 bg-gray-500 bg-opacity-40 backdrop-blur-md">
        </div>
        <div ref="filters" class="relative w-3/4 max-h-full h-fit px-4 mx-auto bg-white rounded-lg">
            <div class="h-8 pt-2 flex items-center justify-end">
                <XMarkIcon @click="closeModal()" class="w-5 h-5 text-primary_p cursor-pointer"></XMarkIcon>
            </div>
            <div class="overflow-auto max-h-[50vh]">
                <CategoryFilter v-if="currentLanguage === 'en'" :categories="categories"
                                :currentLanguage="currentLanguage"></CategoryFilter>
                <CategoryFilter v-else :categories="categorias" :currentLanguage="currentLanguage">
                </CategoryFilter>
            </div>
        </div>
    </div>
</template>

<script setup>
    // Import necessary components and libraries
    import CategoryFilter from "@/components/product/CategoryFilter.vue";
    import { XMarkIcon } from "@heroicons/vue/20/solid";
    import { ref, watchEffect } from "vue";
    import gsap from 'gsap';

    // Define reactive references for background and filters elements
    const background = ref(null);
    const filters = ref(null);

    // Define component props with type annotations
    const props = defineProps({
        visible: Boolean,      // Visibility state of the modal
        currentLanguage: String, // Current language setting
        categories: Array,     // Categories in English
        categorias: Array,     // Categories in another language
    });

    // Define emitted events
    const emit = defineEmits(["update:visible"]);

    // Watch for changes in visibility and apply animations when modal becomes visible
    watchEffect(() => {
        if (props.visible && background.value && filters.value) {
            gsap.fromTo(background.value, 
                        { opacity: 0 },  // Initial state
                        { opacity: 1,    // Final state
                          duration: 1, 
                          ease: "power2.inOut" 
                        }
            );
            gsap.fromTo(filters.value, 
                        { opacity: 0 },  // Initial state
                        { opacity: 1,    // Final state
                          duration: 1, 
                          ease: "power2.inOut" 
                        }
            );
        }
    });

    /**
     * Close the modal with an animation
     */
    const closeModal = () => {
        // Animate background to fade out
        const backgroundAnimation = gsap.fromTo(
            background.value,
            { opacity: 1 },  // Initial state
            { opacity: 0,    // Final state
              duration: 1,
              ease: "power2.inOut" 
            }
        ).then();

        // Animate filters to fade out
        const filtersAnimation = gsap.fromTo(
            filters.value,
            { opacity: 1 },  // Initial state
            { opacity: 0,    // Final state
              duration: 1,
              ease: "power2.inOut" 
            }
        ).then();

        // Wait for both animations to finish, then emit event to update visibility
        Promise.all([backgroundAnimation, filtersAnimation]).then(() => {
            emit("update:visible", false);
        });
    };
</script>
