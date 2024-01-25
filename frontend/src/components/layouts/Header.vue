<template>
 <header class="bg-white z-0">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex flex-1">
        <div class="hidden lg:flex lg:gap-x-12">
          <a class="text-sm uppercase font-semibold leading-6 text-gray-900">
            <RouterLink :to="{ name: 'list_products' }" 
              class="btn btn-primary btn-lg test-list-customer-link">
              Shop
            </RouterLink>
          </a>
          <a class="text-sm uppercase font-semibold leading-6 text-gray-900">
            <RouterLink :to="{ name: 'about_us' }" 
              class="btn btn-primary btn-lg test-list-customer-link">
              About
            </RouterLink>
          </a>
          <a class="text-sm uppercase font-semibold leading-6 text-gray-900">
            <RouterLink :to="{ name: 'list_blogs' }" 
              class="btn btn-primary btn-lg test-list-customer-link">
              Blog
            </RouterLink> 
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <a class="-m-1.5 p-1.5">
        <RouterLink :to="{ name: 'home' }">
              <img src="@/assets/images/logo.jpg" class="w-full h-auto">
        </RouterLink>
      </a>
      <div class="flex flex-1 justify-end">
        <Menu as="div" class="relative inline-block text-left pr-4 uppercase">
            <div>
                <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm uppercase font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Language 
                    <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                        <MenuItem v-slot="{ active }">
                            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">English</a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Spanish</a>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
          <RouterLink  :to="{ name: 'contact' }" 
            type="button" class="rounded-full bg-white px-3.5 py-2 text-sm uppercase font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Contact
          </RouterLink>
        </div>
    </nav>
  </header>
</template>

<script setup>
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router';
    import { Dialog, DialogPanel } from '@headlessui/vue'
    import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
    import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { ChevronDownIcon } from '@heroicons/vue/20/solid'

    const mobileMenuOpen = ref(false)
</script>