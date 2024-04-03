<template>
  <DisclosurePanel class="pt-6">
    <div class="space-y-4">
      <div
        v-for="(
        subCategory, subCategoryIdx
        ) in subCategories"
        :key="subCategoryIdx"
        class="flex items-center"
      >
        <input
          :id="`filter-${subCategoryIdx}`"
          type="checkbox"
          v-model="subCategory.checked"
          class="h-4 w-4 rounded border-gray-300 text-primary_p focus:ring-terciary_p"
        />
        <label
          :for="`filter-${subCategoryIdx}`"
          class="ml-3 text-sm text-gray-600">
          {{ subCategory.name }}
        </label
        >
      </div>
    </div>
  </DisclosurePanel>
</template>
  
<script setup>
  import { DisclosurePanel } from "@headlessui/vue";

  const props = defineProps({
    subCategories: Object,
  });
</script>