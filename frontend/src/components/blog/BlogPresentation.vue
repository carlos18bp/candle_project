<template>  
    <div class="flex flex-col">
        <img       
          v-if="blog && blog.image_url"
          :src="`/api/${blog.image_url}`" 
          class="rounded w-96 h-72 pb-4">
        <p class="text-gray-400 uppercase pb-2">{{ blog.category }}</p>
        <RouterLink
          v-if="blog.id"       
          :to="{ name: 'blog', 
          params: { blog_id: blog.id } }" 
          class="btn btn-primary btn-lg pb-3">
              {{ blog.title }}
        </RouterLink> 
        <div class="flex pt-3">
            <img       
              v-if="blog && blog.owner_image_url"
              :src="`/api/${blog.image_url}`"
              class="object-cover rounded-full size-14">
            <div class="pl-3">
                <p>{{ blog.owner_full_name }}</p>
                <p>{{ blog.publication_date }}</p>
            </div>                    
        </div>
    </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router';

  const props = defineProps({
    blog: Object,
  });
</script>