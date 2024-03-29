<template>
  <div class="bg-background_p">
    <RouterView/>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { RouterView } from "vue-router";
  import { useBlogStore } from '@/stores/blog';
  import { useProductStore } from '@/stores/product';
  import { useReviewStore } from '@/stores/review';
  
  const blogStore = useBlogStore();
  const productStore = useProductStore();
  const reviewtStore = useReviewStore();

  onMounted(async () => {
    await blogStore.init();
    await productStore.init();
    await reviewtStore.init();
  });
</script>

