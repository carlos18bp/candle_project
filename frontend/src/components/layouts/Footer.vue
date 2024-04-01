<template>
  <footer class="bg-black_p " aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-8 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8">
          <img src="@/assets/images/logo.png" class="w-auto h-20">
          <p class="text-sm leading-6 text-second_p font-regular">{{ $t('text') }}</p>
          <div class="flex space-x-6">
            <a v-for="item in navigation.social" :key="item.name" :href="item.href"
              class="text-second_p hover:text-primary_p">
              <span class="sr-only">{{ item.name }}</span>
              <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">

          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-second_p">{{ $t('company').company }}</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in company" :key="item.name">
                  <a :href="item.href" class="text-sm font-regular leading-6 text-second_p hover:text-primary_p">{{
              item.name }}</a>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-second_p">{{ $t('legal').legal }}</h3>
              <ul role="list" class="mt-6 space-y-4">

                <li class="cursor-pointer" v-for="item in legal" :key="item.name">
                  <a @click="openTerms()" class="text-sm font-regular leading-6 text-second_p hover:text-primary_p">{{

                    item.name }}</a>
                </li>
              </ul>
            </div>
            <TransitionRoot as="template" :show="open">
              <Dialog as="div" class="relative z-10" @close="open = false">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div class="flex h-full w-full items-end justify-start p-8 text-center sm:items-center">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                      <DialogPanel class="relative w-full h-full overflow-y-auto transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6">
                        <div class="bg-white flex z-30 justify-end">
                          <XCircleIcon class="h-8 w-8  text-black hover:text-primary_p" @click="openTerms()" aria-hidden="true" />
                        </div>
                        <div>
                          <div class="mt-3 text-center sm:mt-5">
                            <div class="mt-2" v-html="$t('legal').text">
                             
                            </div>
                          </div>
                        </div>
                        <div class="mt-5 sm:mt-6">
                          <button type="button" class="inline-flex w-full justify-center rounded-md bg-primary_p px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-terciary_p focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="open = false">Go Back</button>
                        </div>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </TransitionRoot>
          </div>
        </div>
      </div>
      <div class="mt-16 border-t border-gray_p pt-8 sm:mt-20 lg:mt-24 grid grid-cols-2 gap-4">
        <p class="text-xs leading-5 text-second_p ">{{ $t('rights').candle }}</p>
        <div class="grid grid-cols-2 gap-2">
          <p class="text-xs leading-5 text-second_p">{{ $t('rights').design }}</p>
          <img class="w-auto h-10" src="@/assets/images/logo_pwc.png"
            alt="Logo o icono o presentación de Páginas Webs Colombia Oficial.">
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import { defineComponent, h, ref, onMounted, watchEffect } from 'vue'
  import { useAppStore } from '@/stores/language.js';
  import enMessages from '@/locales/layout/footer/en.js';
  import esMessages from '@/locales/layout/footer/es.js';

  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XCircleIcon } from '@heroicons/vue/24/outline'

  const open = ref(false)
  const messages = ref(enMessages);
  const $t = (key) => messages.value[key];
  const appStore = useAppStore();
  const currentLanguage = ref('');

  const company = ref([
      { name: $t('company').shop, href: '#' },
      { name: $t('company').about, href: '#' },
      { name: $t('company').blog, href: '#' },
      { name: $t('company').contact, href: '#' },
  ])
  const legal = ref([
      { name: $t('legal').claim, href: '#' },
      { name: $t('legal').privacity, href: '#' },
      { name: $t('legal').terms, href: '#' },
  ])



  const messages = ref(enMessages);
  const $t = (key) => messages.value[key];
  const appStore = useAppStore();
  const currentLanguage = ref('');

  const company = ref([
      { name: $t('company').shop, href: '#' },
      { name: $t('company').about, href: '#' },
      { name: $t('company').blog, href: '#' },
      { name: $t('company').contact, href: '#' },
  ])
  const legal = ref([
      { name: $t('legal').claim, href: '#' },
      { name: $t('legal').privacity, href: '#' },
      { name: $t('legal').terms, href: '#' },
  ])
  const navigation = {

    social: [
      {
        name: 'Facebook',
        href: '#',
        icon: defineComponent({
          render: () =>
            h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
              h('path', {
                'fill-rule': 'evenodd',
                d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
                'clip-rule': 'evenodd',
              }),
            ]),
        }),
      },
      {
        name: 'Instagram',
        href: '#',
        icon: defineComponent({
          render: () =>
            h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
              h('path', {
                'fill-rule': 'evenodd',
                d: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
                'clip-rule': 'evenodd',
              }),
            ]),
        }),
      },
      {
        name: 'X',
        href: '#',
        icon: defineComponent({
          render: () =>
            h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
              h('path', {
                d: 'M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z',
              }),
            ]),
        }),
      },
    ],
  }

  onMounted(() => {
    watchEffect(() => {
      currentLanguage.value = appStore.getCurrentLanguage;
      if (currentLanguage.value === 'en') {
        messages.value = enMessages;
      } else {
        messages.value = esMessages;
      }
      company.value = [
      { name: $t('company').shop, href: '#' },
      { name: $t('company').about, href: '#' },
      { name: $t('company').blog, href: '#' },
      { name: $t('company').contact, href: '#' },
      ]
      legal.value = [
      { name: $t('legal').terms, href: '#' },
      ]
    });
  });
  const openTerms = () => {
    open.value = !open.value
  }
</script>