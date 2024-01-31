<template>
 <header>
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex flex-1">
        <div class="hidden lg:flex lg:gap-x-12">
          <a class="text-sm uppercase font-regular leading-6 text-black_p">
            <RouterLink :to="{ name: 'products' }" 
              class="btn btn-primary btn-lg">
              Shop
            </RouterLink>
          </a>
          <a class="text-sm uppercase font-regular leading-6 text-black_p">
            <RouterLink :to="{ name: 'about_us' }" 
              class="btn btn-primary btn-lg">
              About
            </RouterLink>
          </a>
          <a class="text-sm uppercase font-regular leading-6 text-black_p">
            <RouterLink :to="{ name: 'blogs' }" 
              class="btn btn-primary btn-lg">
              Blog
            </RouterLink> 
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black_p" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <a class="-m-1.5">
        <RouterLink :to="{ name: 'home' }">
              <img src="@/assets/images/logo.png" class="w-auto h-14">
        </RouterLink>
      </a>
      <div class="flex flex-1 justify-end">
        <Menu as="div" class="relative inline-block text-left pr-4 uppercase">
            <div>
                <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm uppercase font-medium text-black_p">
                    Language 
                    <ChevronDownIcon class="-mr-1 h-5 w-5 text-black_p" aria-hidden="true" />
                </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="font-medium absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                        <MenuItem v-slot="{ active }">
                            <a href="#" :class="[active ? 'bg-gray-100 text-black_p' : 'text-gray-700', 'block px-4 py-2 text-sm']">English</a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <a href="#" :class="[active ? 'bg-gray-100 text-black_p' : 'text-gray-700', 'block px-4 py-2 text-sm']">Spanish</a>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
          <RouterLink  :to="{ name: 'contact' }" 
            type="button" class="rounded-full px-3.5 py-2 text-sm uppercase font-medium text-black_p hover:bg-black_p hover:text-second_p">
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