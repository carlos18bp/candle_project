<template>  
    <div v-if="topBlogs" class="mx-auto flex flex-col px-16 pt-12">
        <h2 class="font-bold text-4xl uppercase">Latest blogs</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-between">
            <BlogPresentation
                v-for="blog in topBlogs"
                :blog="blog"
            ></BlogPresentation>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { useBlogStore } from '@/stores/blog';
    import BlogPresentation from "@/components/blog/BlogPresentation.vue";

    const props = defineProps({
        top: Object,
    });

    const blogStore = useBlogStore();
    const topBlogs = ref([]);  
    console.log(props.top)

    onMounted(async () => {
        await blogStore.fetchBlogsData();
        topBlogs.value = blogStore.blogs.slice(0, props.top.top_blog);;
    });
</script>