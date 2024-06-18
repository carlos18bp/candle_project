<template>
    <div class="flex flex-col pt-16">
        <div>
            <img v-if="blog && blog.image" :src="blog.image" class="object-cover w-full h-96 pb-4">
        </div>
        <h2 v-if="currentLanguage === 'en'" class="font-regular text-gray_p tracking-widest text-xl uppercase pb-2">
            {{ blog.category }}
        </h2>
        <h2 v-else class="font-regular text-gray_p tracking-widest text-xl uppercase pb-2">
            {{ blog.categoria }}
        </h2>
        <div v-if="currentLanguage === 'en'">
            <RouterLink v-if="blog.id" :to="{ name: 'blog', params: { blog_id: blog.id } }" class="font-bold text-3xl tracking-wider pb-3">
                {{ blog.title }}
            </RouterLink>
        </div>
        <div v-else>
            <RouterLink v-if="blog.id" :to="{ name: 'blog', params: { blog_id: blog.id } }" class="font-bold text-3xl tracking-wider pb-3">
                {{ blog.titulo }}
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
    import { computed } from "vue";
    import { RouterLink } from 'vue-router';
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
