<template>
    <header>
      <!-- Navbar for large screens -->
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex flex-1">
          <div class="hidden lg:flex lg:gap-x-12">
            <!-- Desktop links -->
            <RouterLink :to="{ name: 'catalog' }" class="text-sm uppercase font-regular leading-6 text-black_p">
              {{ $t('shop') }}
            </RouterLink>
            <RouterLink :to="{ name: 'about_us' }" class="text-sm uppercase font-regular leading-6 text-black_p">
              {{ $t('about') }}
            </RouterLink>
            <RouterLink :to="{ name: 'blogs' }" class="text-sm uppercase font-regular leading-6 text-black_p">
              {{ $t('blog') }}
            </RouterLink>
          </div>
          <div class="flex lg:hidden">
            <!-- Button to open mobile menu -->
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black_p" @click="mobileMenuOpen = true">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <!-- Logo -->
        <RouterLink :to="{ name: 'home' }" class="-m-1.5">
          <img src="@/assets/images/logo.png" class="w-auto h-14">
        </RouterLink>
        <div class="hidden lg:flex lg:flex-1 justify-end">
          <div class="relative cursor-pointer">
            <ShoppingBagIcon class="size-5 text-black m-2" @click="showShoppingCart = true" />
            <span @click="showShoppingCart = true" v-if="totalCartProducts > 0" class="absolute top-0 left-1/2 bg-primary_p text-white rounded-full text-xs size-5 flex items-center justify-center shadow-lg m-2 ml-0">
              {{ totalCartProducts }}
            </span>
          </div>
          <ShoppingCart :visible="showShoppingCart" @update:visible="showShoppingCart = $event" />
          <!-- Language menu -->
          <Menu as="div" class="relative inline-block text-left pr-4 uppercase">
            <div>
              <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm uppercase font-medium text-black_p">
                {{ $t('language').language }}
                <ChevronDownIcon class="-mr-1 h-5 w-5 text-black_p" aria-hidden="true" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="font-medium absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a @click="handleLanguage('en')" :class="[active ? 'bg-gray-100 text-black_p' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">{{ $t('language').english }}</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a @click="handleLanguage('es')" :class="[active ? 'bg-gray-100 text-black_p' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">{{ $t('language').spanish }}</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
          <!-- Contact link -->
          <RouterLink :to="{ name: 'contact' }" class="rounded-full px-3.5 py-2 text-sm uppercase font-medium text-black_p ring-1 ring-black_p hover:bg-black_p hover:text-second_p">
            {{ $t('contact') }}
          </RouterLink>
        </div>
      </nav>
  
      <!-- Navbar for mobile screens -->
      <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <Transition enter-active-class="transition ease-out duration-300" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <DialogPanel class="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
              <RouterLink :to="{ name: 'home' }" class="-m-1.5 p-1.5">
                <span class="sr-only">Senses Candles By Kate</span>
                <img class="h-8 w-auto" src="@/assets/images/logo.png" alt="Senses Candles By Kate" />
              </RouterLink>
              <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <!-- Mobile links -->
                <a v-for="item in mobileLinks" :key="item.name" :href="item.href" :class="{ 'bg-gray-100 text-black_p': isActive(item.name), 'text-gray-900': !isActive(item.name) }" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50">
                  {{ $t(item.name) }}
                </a>
                <!-- Mobile language menu -->
                <Menu as="div" class="-mx-3 px-3 block text-left rounded-lg">
                  <div>
                    <MenuButton class="inline-flex w-full justify-start items-center rounded-md py-2 text-base font-semibold text-gray-900">
                      <span>{{ $t('language').language }}</span>
                      <ChevronDownIcon class="ml-1 h-4 w-4 text-black" aria-hidden="true" />
                    </MenuButton>
                  </div>
                  <transition enter-active-class="transition ease-out duration-300" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="font-medium absolute left-6 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <a @click="handleLanguage('en')" :class="[active ? 'bg-gray-100 text-black_p' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">{{ $t('language').english }}</a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a @click="handleLanguage('es')" :class="[active ? 'bg-gray-100 text-black_p' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">{{ $t('language').spanish }}</a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </DialogPanel>
        </Transition>
      </Dialog>
    </header>
  </template>
  
  <script setup>
    import { computed, ref, watchEffect } from 'vue';
    import { Dialog, DialogPanel } from '@headlessui/vue';
    import { Bars3Icon, ChevronDownIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/vue/24/outline';
    import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
    import { RouterLink } from 'vue-router';
    import ShoppingCart from "@/components/product/ShoppingCart.vue";
    import { useAppStore } from '@/stores/language.js';
    import { useProductStore } from '@/stores/product';
    import enMessages from '@/locales/layout/header/en.js';
    import esMessages from '@/locales/layout/header/es.js';
  
    // Reactive references
    const appStore = useAppStore();
    const currentLanguage = computed(() => appStore.getCurrentLanguage);
    const messages = ref(enMessages);
    const mobileMenuOpen = ref(false);
    const showShoppingCart = ref(false);
    const productStore = useProductStore();
    const totalCartProducts = computed(() => productStore.totalCartProducts);
  
    // Translation function
    const $t = (key) => messages.value[key];
  
    // Handle language change
    const handleLanguage = (key) => {
      appStore.setCurrentLanguage(key);
      messages.value = currentLanguage.value === 'en' ? enMessages : esMessages;
    }
  
    watchEffect(() => {
      messages.value = currentLanguage.value === 'en' ? enMessages : esMessages;
    });
  
    // Mobile links
    const mobileLinks = [
      { name: 'home', href: '/' },
      { name: 'shop', href: '/catalog' },
      { name: 'about', href: '/about_us' },
      { name: 'blog', href: '/blog' },
      { name: 'contact', href: '/contact' }
    ]
  
    // Function to determine if a link is active
    const isActive = (name) => {
      // Implement your logic here to determine if the link is active
      // For example, you could compare the link name with the current route name
      return false // Change this according to your logic
    }
  </script>
  