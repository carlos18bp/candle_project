<template>  
    <Header></Header>
    <div class="mx-auto flex flex-col px-16">
        <div class="flex pb-12">
            <div class="w-1/2">
                <img       
                    v-if="firstBlog && firstBlog.image_url"
                    :src="`/api/${firstBlog.image_url}`" 
                    class="w-full h-96 object-cover">
            </div>
            <div class="w-1/2 flex flex-col justify-center px-8">
                <p class="font-regular tracking-widest text-xl text-gray_p uppercase pb-2">{{ firstBlog.category }}</p>
                <h1 class="py-3">
                    <RouterLink
                        v-if="firstBlog.id"       
                        :to="{ name: 'blog', 
                        params: { blog_id: firstBlog.id } }" 
                        class="font-bold text-5xl tracking-wider btn-lg">
                            {{ firstBlog.title }}
                    </RouterLink> 
                </h1>
                <p class="font-regular text-2xl line-clamp-3 tracking-wider pt-4">{{firstBlog.brief_description }}</p>
            </div>
        </div>

        <div class="mb-16">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 pb-8">
                <BlogPresentation
                    v-for="blog in paginatedBlogs"
                    :blog="blog"
                ></BlogPresentation>
            </div>
            <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                <!-- Previous page button -->
                <a
                    class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                >
                    <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Previous
                </a>

                <!-- Show page numbers -->
                <div class="hidden md:block">
                    <template v-for="page in totalPages" :key="page">
                        <a             
                        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium"
                        :class="{ 'border-indigo-500 text-indigo-600': currentPage === page, 'text-gray-500 hover:text-gray-700 hover:border-gray-300': currentPage !== page }"
                        @click="goToPage(page)"
                        >
                        {{ page }}
                        </a>
                    </template>
                </div>

                <!-- Next page button -->
                <a
                    href="#"
                    class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                >
                    Next
                    <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                </a>
            </nav>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
    import { computed, reactive, ref, onMounted,  } from 'vue';
    import Header from "@/components/layouts/Header.vue";
    import Footer from "@/components/layouts/Footer.vue";
    import { RouterLink } from 'vue-router';
    import { useBlogStore } from '@/stores/blog';
    import BlogPresentation from "@/components/blog/BlogPresentation.vue";
    import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';

    const blogStore = useBlogStore();
    const blogs = ref([]);
    const firstBlog = reactive({}); 
    const currentPage = ref(1);
    const isBlogsLoaded = ref(false);
    let blogsPerPage;

    onMounted(async () => fetchBlogs());

    if (window.innerWidth >= 1024) {
        blogsPerPage = 6;
    } else if (window.innerWidth < 1024 && 760 <= window.innerWidth){
        blogsPerPage = 4;
    } else if  (window.innerWidth < 760) {
        blogsPerPage = 2;
    }

    /**
     * Fetch and update blogs data.
     */
    async function fetchBlogs() {
        await blogStore.fetchBlogsData();
        blogs.value = blogStore.blogs;
        
        isBlogsLoaded.value = true;

        if (blogStore.blogs.length > 0) {
            Object.assign(firstBlog, blogStore.blogs[0]);
        }
    }

    // Calculate the total number of pages
    const totalPages = computed(() => {
        if (isBlogsLoaded.value) {
        return Math.ceil(blogs.value.length / blogsPerPage);
        }
        return 0;
    });

    // Calculate the blogs to display on the current page
    const paginatedBlogs = computed(() => {
        if (isBlogsLoaded.value) {
        const start = (currentPage.value - 1) * blogsPerPage;
        const end = start + blogsPerPage;
        return blogs.value.slice(start, end);
        }
        return [];
    });

    // Property to store the scroll position
    const scrollPosition = ref(0);

    // Function to go to a specific page
    const goToPage = (page) => {
        if (isBlogsLoaded.value && page >= 1 && page <= totalPages.value) {
            // Save current scroll position
            scrollPosition.value = window.scrollY;
            currentPage.value = page;

            setTimeout(() => {
                window.scrollTo(0, scrollPosition.value);
            }, 0);
        }
    };
</script>