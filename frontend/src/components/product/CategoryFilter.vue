<template>
  <Disclosure
    as="div"
    v-for="category in categories"
    class="border-b border-gray-200 py-6"
    v-slot="{ open }"
  >
    <h3 class="-my-3 flow-root">
    <DisclosureButton
    class="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500 primary_p"
    >
      <span class="font-medium text-gray-900">
        {{ category.name }}
      </span>
      <span class="flex items-center">
        <PlusIcon
          v-if="!open"
          class="h-5 w-5 text-primary_p"
          aria-hidden="true"
        />
        <MinusIcon
          v-else
          class="h-5 w-5 text-primary_p"
          aria-hidden="true"
        />
      </span>
      </DisclosureButton>
      </h3>

      <SubCategoryFilter
        v-if="currentLanguage === 'en'"
        :subCategories="category.subCategories"
      >    
      </SubCategoryFilter>
      <SubCategoryFilter
      v-else
        :subCategories="category.subCategorias"
      >    
      </SubCategoryFilter>
  </Disclosure>
</template>

<script setup>
  import { MinusIcon, PlusIcon } from "@heroicons/vue/20/solid";
  import { Disclosure, DisclosureButton} from "@headlessui/vue";
  import SubCategoryFilter from "@/components/product/SubCategoryFilter.vue";

  const props = defineProps({
    categories: Object,
    currentLanguage: String
  });
</script>