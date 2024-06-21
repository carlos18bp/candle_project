<template>
    <Header></Header>

    <!-- Blog Detail content -->
    <div v-if="blog" class="mx-auto flex flex-col px-16">
        <div class="relative flex pb-8">
            <div class="w-full max-h-96 flex items-center justify-center">
                <img :src="blog.image" class="object-cover w-full h-full" />
            </div>

            <div class="bg-background_p absolute bottom-0 -left-px p-8 pt-4 flex flex-col">
                <h1 v-if="currentLanguage === 'en'" class="font-bold text-4xl tracking-wider">{{ blog.title }}</h1>
                <h1 v-else class="font-bold text-4xl tracking-wider">{{ blog.titulo }}</h1>
            </div>
        </div>
        <div class="flex justify-center">
            <p v-if="currentLanguage === 'en'" class="max-w-7xl font-regular text-xl tracking-wider">
                {{ blog.description }}
            </p>
            <p v-else class="max-w-7xl font-regular text-xl tracking-wider">
                {{ blog.descripcion }}
            </p>
        </div>
    </div>

    <!-- Blog Carousel Component -->
    <BlogCarousel :top="{ top_blog }" class="mb-16"> </BlogCarousel>

    <!-- Footer Component -->
    <Footer></Footer>
</template>

<script setup>
    import { onMounted, reactive, ref, watchEffect } from "vue";
    import { useRoute } from "vue-router";
    import { useBlogStore } from "@/stores/blog";
    import Header from "@/components/layouts/Header.vue";
    import Footer from "@/components/layouts/Footer.vue";
    import BlogCarousel from "@/components/blog/BlogCarousel.vue";
    import { useAppStore } from '@/stores/language.js';

    const route = useRoute();
    const appStore = useAppStore();
    const currentLanguage = ref('');
    
    const blogStore = useBlogStore();
    const blog_id = ref(0);
    const blog = reactive({});
    const top_blog = ref(null);

    if (window.innerWidth >= 1024) {
        top_blog.value = 3;
    } else if (window.innerWidth < 1024 && 760 <= window.innerWidth) {
        top_blog.value = 2;
    } else if (window.innerWidth < 760) {
        top_blog.value = 1;
    }

    onMounted(async () => {
        window.scrollTo({ top: 0 });
        watchEffect(() => {
            currentLanguage.value = appStore.getCurrentLanguage;
        });
        await blogStore.fetchBlogsData();
    });

    watchEffect(async () => {
        blog_id.value = parseInt(route.params.blog_id);
        if (blog_id.value) Object.assign(blog, blogStore.blogById(blog_id.value));
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
</script>