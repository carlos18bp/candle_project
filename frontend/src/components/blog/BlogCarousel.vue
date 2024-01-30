<template>  
    <div v-if="topBlogs" class="mx-auto flex flex-col max-w-7xl px-8 pt-12">
        <p class="font-bold uppercase pb-6">Latest blogs</p>
        <div class="flex justify-between">
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
        top: Number,
    });

    const blogStore = useBlogStore();
    const topBlogs = ref([]);    

    onMounted(async () => {
        await blogStore.fetchBlogsData();
        topBlogs.value = blogStore.blogs.slice(0, props.top);;
    });
</script>