import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
history: createWebHistory(),
routes: [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/detail_blog/:blog',
        name: 'detail_blog',
        component: () => import('@/views/blog/Detail.vue')
    },
    {
        path: '/list_blogs',
        name: 'list_blogs',
        component: () => import('@/views/blog/List.vue')
    },
    {
        path: '/detail_product/:product',
        name: 'detail_product',
        component: () => import('@/views/product/Detail.vue')
    },
    {
        path: '/list_products',
        name: 'list_products',
        component: () => import('@/views/product/List.vue')
    },
    {
        path: '/about_us',
        name: 'about_us',
        component: () => import('@/views/AboutUs.vue')
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('@/views/Contact.vue')
    }
]
});

export default router
export const routes = router.options.routes;