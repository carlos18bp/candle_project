<template>
    <div v-if="topBlogs" class="mx-auto flex flex-col px-16 pt-12">
        <h2 class="font-bold text-4xl uppercase">{{ $t("latest_blogs") }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-between">
            <BlogPresentation v-for="blog in topBlogs" :key="blog.id" :blog="blog" />
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, watchEffect } from "vue";
    import BlogPresentation from "@/components/blog/BlogPresentation.vue";
    import enMessages from "@/locales/blog/detail/en.js";
    import esMessages from "@/locales/blog/detail/es.js";
    import { useAppStore } from "@/stores/language.js";
    import { useBlogStore } from "@/stores/blog";

    /**
     * Props definition.
     * @typedef {Object} Props
     * @property {Object} top - Object containing the top blog settings.
     */
    const props = defineProps({
        top: Object,
    });

    // Stores
    const appStore = useAppStore();
    const blogStore = useBlogStore();

    // Reactive references    
    const currentLanguage = computed(() => appStore.getCurrentLanguage);
    const messages = ref("");
    const topBlogs = ref([]);

    /**
     * Translate function.
     * @param {string} key - The key to translate.
     * @returns {string} - Translated string.
     */
    const $t = (key) => messages.value[key];

    // onMounted lifecycle hook
    onMounted(async () => {        
        // Fetch blog data
        await blogStore.fetchBlogsData();
        topBlogs.value = blogStore.blogs.slice(0, props.top.top_blog);
    });

    // Watch for changes in the current language
    watchEffect(() => {
        messages.value = currentLanguage.value === "en" ? enMessages : esMessages;
    });
</script>
