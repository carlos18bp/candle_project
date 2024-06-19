<template>
    <div class="mx-auto px-16 py-16">
      <h2 class="pb-6 font-bold text-4xl">{{ $t('title') }}</h2>
      <div class="flex">
        <div class="w-full flex flex-col">
          <dl>
            <Disclosure as="div" v-for="faq in $t('questions')" :key="faq.question" class="pb-6" v-slot="{ open }">
              <dt>
                <DisclosureButton class="flex w-full text-black_p">
                  <div class="flex flex-col w-full">
                    <div class="flex justify-between pb-2">
                      <span class="text-2xl font-medium">{{ faq.question }}</span>
                      <span class="ml-6 flex h-7">
                        <PlusSmallIcon v-if="!open" class="h-6 w-6 text-primary_p" aria-hidden="true" />
                        <MinusSmallIcon v-else class="h-6 w-6 text-primary_p" aria-hidden="true" />
                      </span>
                    </div>
                    <div class="w-auto h-px bg-primary_p"></div>
                  </div>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" class="mt-2 pr-12">
                <p class="font-regular tracking-wide text-xl leading-7 text-gray_p" v-html="faq.answer"></p>
              </DisclosurePanel>
            </Disclosure>
          </dl>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { computed, ref, watchEffect } from 'vue';
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
    import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline';
    import { useAppStore } from '@/stores/language.js';
    import enMessages from '@/locales/fqas/en.js';
    import esMessages from '@/locales/fqas/es.js';

    const appStore = useAppStore();
    const currentLanguage = computed(() => appStore.getCurrentLanguage);

    // Reactive reference for messages
    const messages = ref(enMessages);
  
    // Translation function
    const $t = (key) => messages.value[key];

    // Watch for changes in the current language
    watchEffect(() => {
        messages.value = currentLanguage.value === 'en' ? enMessages : esMessages;
    });
  </script>
  