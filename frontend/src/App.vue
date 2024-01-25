<template>
  <RouterView/>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { RouterView } from "vue-router";
  import { useBlogStore } from '@/stores/blog';
  import { useProductStore } from '@/stores/product';
  
  const blogStore = useBlogStore();
  const productStore = useProductStore();

  onMounted(async () => {
    await blogStore.init();
    await productStore.init();
  });
</script>