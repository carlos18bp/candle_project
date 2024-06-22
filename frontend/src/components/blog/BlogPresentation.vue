<template>
    <div class="flex flex-col pt-16">
        <RouterLink v-if="blog.id" :to="{ name: 'blog', params: { blog_id: blog.id } }" >
            <div>
                <img v-if="blog" :src="blog.image_url" class="object-cover w-full h-96 pb-4">
            </div>
            <h2 v-if="currentLanguage === 'en'" class="font-regular text-gray_p tracking-widest text-xl uppercase pb-2">
                {{ blog.category }}
            </h2>
            <h2 v-else class="font-regular text-gray_p tracking-widest text-xl uppercase pb-2">
                {{ blog.categoria }}
            </h2>
            <div v-if="currentLanguage === 'en'" class="font-bold text-3xl tracking-wider pb-3">
                {{ blog.title }}           
            </div>
            <div v-else class="font-bold text-3xl tracking-wider pb-3">
                {{ blog.titulo }}
            </div>
        </RouterLink>
    </div>
</template>

<script setup>
    import { computed } from "vue";
    import { useAppStore } from '@/stores/language.js';

    /**
     * Props definition.
     * @typedef {Object} Props
     * @property {Object} blog - Object containing blog details.
     */
    const props = defineProps({
        blog: Object,
    });

    const appStore = useAppStore();
    const currentLanguage = computed(() => appStore.getCurrentLanguage);
</script>
