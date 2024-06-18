<template>
    <!-- Banner Component -->
    <Banner></Banner>
    <!-- Header Component -->
    <Header></Header>
    <!-- Main Blog Section -->
    <div class="md:mx-auto flex flex-col mx-8 md:px-16">
        <div class="flex pb-12">
            <div class="w-full md:w-1/2 mt-4 -m-8 md:-m-0 md:mt-0">
                <img v-if="firstBlog && firstBlog.image" :src="firstBlog.image" class="w-full md:h-96 object-cover"
                    alt="Blog Image" />
            </div>
            <div class="w-full md:w-1/2 flex flex-col justify-center pl-10 md:px-8">
                <!-- Blog Category -->
                <p v-if="currentLanguage === 'en'"
                    class="font-regular tracking-widest text-lg md:text-xl text-gray_p uppercase pb-2">
                    {{ firstBlog.category }}
                </p>
                <p v-else class="font-regular tracking-widest text-lg md:text-xl text-gray_p uppercase pb-2">
                    {{ firstBlog.categoria }}
                </p>
                <!-- Blog Title -->
                <h1 v-if="currentLanguage === 'en'" class="py-3">
                    <RouterLink v-if="firstBlog.id" :to="{ name: 'blog', params: { blog_id: firstBlog.id } }"
                        class="font-bold text-3xl md:text-5xl tracking-wider break-all">
                        {{ firstBlog.title }}
                    </RouterLink>
                </h1>
                <h1 v-else class="py-3">
                    <RouterLink v-if="firstBlog.id" :to="{ name: 'blog', params: { blog_id: firstBlog.id } }"
                        class="font-bold text-3xl md:text-5xl tracking-wider break-all">
                        {{ firstBlog.titulo }}
                    </RouterLink>
                </h1>
                <!-- Blog Description -->
                <p v-if="currentLanguage === 'en'" class="font-regular text-2xl line-clamp-3 tracking-wider pt-4">
                    {{ firstBlog.description }}
                </p>
                <p v-else class="font-regular text-2xl line-clamp-3 tracking-wider pt-4">
                    {{ firstBlog.descripcion }}
                </p>
            </div>
        </div>

        <!-- Blog List Section -->
        <div class="mb-16">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 pb-8">
                <BlogPresentation v-for="blog in paginatedBlogs" :key="blog.id" :blog="blog"></BlogPresentation>
            </div>
            <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                <!-- Previous page button -->
                <a href="#"
                    class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-terciary_p hover:text-terciary_p"
                    @click.prevent="goToPage(currentPage - 1)" :disabled="currentPage === 1">
                    <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-terciary_p" aria-hidden="true" />
                    {{ $t('previous') }}
                </a>

                <!-- Show page numbers -->
                <div class="hidden md:block">
                    <template v-for="page in totalPages" :key="page">
                        <a href="#"
                            class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium"
                            :class="{
                    'border-primary_p text-primary_p': currentPage === page,
                    'text-gray-500 hover:text-terciary_p hover:border-terciary_p': currentPage !== page,
                }" @click.prevent="goToPage(page)">
                            {{ page }}
                        </a>
                    </template>
                </div>

                <!-- Next page button -->
                <a href="#"
                    class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-terciary_p hover:text-terciary_p"
                    @click.prevent="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
                    {{ $t('next') }}
                    <ArrowLongRightIcon class="ml-3 h-5 w-5 text-terciary_p" aria-hidden="true" />
                </a>
            </nav>
        </div>
    </div>
    <!-- Footer Component -->
    <Footer></Footer>
</template>

<script setup>
    import { computed, onMounted, reactive, ref, watchEffect } from "vue";
    import { RouterLink } from "vue-router";
    import { useAppStore } from '@/stores/language.js';
    import { useBlogStore } from "@/stores/blog";
    import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/vue/20/solid";
    import Banner from "@/components/layouts/Banner.vue";
    import BlogPresentation from "@/components/blog/BlogPresentation.vue";
    import Footer from "@/components/layouts/Footer.vue";
    import Header from "@/components/layouts/Header.vue";
    import enMessages from '@/locales/product/list/en.js';
    import esMessages from '@/locales/product/list/es.js';

    // Reactive references
    const appStore = useAppStore();
    const blogStore = useBlogStore();
    const currentLanguage = computed(() => appStore.getCurrentLanguage);
    const currentPage = ref(1);
    const blogs = ref([]);
    const firstBlog = reactive({});
    const isBlogsLoaded = ref(false);
    const messages = ref('');
    let blogsPerPage;

    // Determine the number of blogs per page based on window width
    if (window.innerWidth >= 1024) {
        blogsPerPage = 6;
    } else if (window.innerWidth < 1024 && window.innerWidth >= 760) {
        blogsPerPage = 4;
    } else {
        blogsPerPage = 2;
    }

    // On mounted lifecycle hook
    onMounted(async () => {
        window.scrollTo({ top: 0 });

        await fetchBlogs();
    });

    watchEffect(() => {
        messages.value = currentLanguage.value === 'en' ? enMessages : esMessages;
    });

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
            return blogs.value.slice(start, start + blogsPerPage);
        }
        return [];
    });

    // Property to store the scroll position
    const scrollPosition = ref(0);

    /**
     * Function to go to a specific page.
     * @param {number} page - Page number to go to.
     */
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