<template>  
    <div class="flex flex-col">
        <img src="@/assets/images/home/banner_1.jpg" class="rounded w-96 h-72 pb-4">
        <p class="text-gray-400 uppercase pb-2">{{ blog.category }}</p>
        <p>{{ blog.title }}</p>
        <div class="flex pt-3">
            <img src="@/assets/images/home/banner_1.jpg" class="rounded-full size-14">
            <div class="pl-3">
                <p>{{ blog.owner_full_name }}</p>
                <p>{{ blog.publication_date }}</p>
            </div>                    
        </div>
    </div>
</template>

<script setup>
  const props = defineProps({
    blog: Object,
  });
</script>