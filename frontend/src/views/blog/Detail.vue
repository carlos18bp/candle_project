<template>  
    <Header></Header>
    <div v-if="blog" class="mx-auto flex flex-col max-w-7xl px-8">
        <div class="relative max-w-7xl flex pb-8">
            <img src="@/assets/images/home/banner_1.jpg" class="w-full h-96">
            <div class="bg-white absolute bottom-0 left-0 p-8 pt-4 flex flex-col">           
                <p>{{ blog.title}}</p>
                <div class="flex pt-3">
                    <img src="@/assets/images/home/banner_1.jpg" class="rounded-full size-14">
                    <div class="pl-3">
                        <p>{{ blog.owner_full_name }}</p>
                        <p>{{ blog.publication_date }}</p>
                    </div>                    
                </div>
            </div>
        </div>
        <p>{{ blog.description }}</p>
    </div>
    <BlogCarousel
        :top="3"
    >
    </BlogCarousel>
    <Footer></Footer>
</template>

<script setup>
    import { onMounted, reactive, ref } from "vue";
    import { useRoute } from "vue-router";
    import { useBlogStore } from '@/stores/blog';
    import { decodeHandler } from '@/shared/decode_handler';
    import Header from "@/components/layouts/Header.vue";
    import Footer from "@/components/layouts/Footer.vue";
    import BlogCarousel from "@/components/blog/BlogCarousel.vue";

    const route = useRoute();
    const blogStore = useBlogStore();
    const blog_id = ref(0);
    const blog = reactive({});

    onMounted(async () => {
        await blogStore.fetchBlogsData();
        blog_id.value = await decodeHandler(route.params.blog_id);
        if (blog_id.value) Object.assign(blog, blogStore.blogById(blog_id.value));
    });
</script>