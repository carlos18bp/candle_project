<template>
  <header>
    <!-- Navbar para pantallas grandes -->
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex flex-1">
        <div class="hidden lg:flex lg:gap-x-12">
          <!-- Tus enlaces para escritorio -->
          <a class="text-sm uppercase font-regular leading-6 text-black_p">
            <RouterLink :to="{ name: 'products' }" class="btn btn-primary btn-lg">
              Shop
            </RouterLink>
          </a>
          <a class="text-sm uppercase font-regular leading-6 text-black_p">
            <RouterLink :to="{ name: 'about_us' }" class="btn btn-primary btn-lg">
              About
            </RouterLink>
          </a>
          <a class="text-sm uppercase font-regular leading-6 text-black_p">
            <RouterLink :to="{ name: 'blogs' }" class="btn btn-primary btn-lg">
              Blog
            </RouterLink>
          </a>
        </div>
        <div class="flex lg:hidden">
          <!-- Botón para abrir menú en dispositivos móviles -->
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black_p" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <a class="-m-1.5">
        <!-- Logo -->
        <RouterLink :to="{ name: 'home' }">
          <img src="@/assets/images/logo.png" class="w-auto h-14">
        </RouterLink>
      </a>
      <div class="hidden lg:flex lg:flex-1 justify-end">
        <!-- Menú de idiomas -->
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
        <!-- Enlace de contacto -->
        <RouterLink :to="{ name: 'contact' }" type="button" class="rounded-full px-3.5 py-2 text-sm uppercase font-medium text-black_p ring-1 ring-black_p hover:bg-black_p hover:text-second_p">
          Contact
        </RouterLink>
      </div>
    </nav>

    <!-- Navbar para dispositivos móviles -->
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <Transition enter-active-class="transition ease-out duration-300" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <DialogPanel class="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Senses Candles By Kate </span>
              <img class="h-8 w-auto" src="@/assets/images/logo.png" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <!-- Tus enlaces para dispositivos móviles -->
              <a v-for="item in mobileLinks" :key="item.name" :href="item.href" :class="{ 'bg-gray-100 text-black_p': isActive(item.name), 'text-gray-900': !isActive(item.name) }" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50">{{ item.name }}</a>
              <Menu as="div" class="-mx-3 px-3 block text-left rounded-lg">
                  <div>
                    <MenuButton class="inline-flex w-full justify-start items-center rounded-md py-2 text-base font-semibold text-gray-900">
                      <span>Language</span>
                      <ChevronDownIcon class="ml-1 h-4 w-4 text-black" aria-hidden="true" />
                    </MenuButton>

                  </div>
                  <transition enter-active-class="transition ease-out duration-300" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                      <MenuItems class="font-medium absolute left-6 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
            </div>
            
            <!-- Enlace de inicio de sesión para dispositivos móviles -->
            
          </div>
        </DialogPanel>
      </Transition>
    </Dialog>
  </header>
</template>

<script setup>
import { ref} from 'vue'
import { RouterLink } from 'vue-router';
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const mobileMenuOpen = ref(false)

// Enlaces para dispositivos móviles
const mobileLinks = [
  { name: 'Home', href: '/'},
  { name: 'Shop', href: 'products' },
  { name: 'About', href: 'about_us' },
  { name: 'Blog', href: 'blogs' },
  { name: 'Contact', href: 'contact' }
]

// Función para determinar si un enlace está activo
const isActive = (name) => {
  // Aquí puedes implementar la lógica para determinar si el enlace está activo
  // Por ejemplo, podrías comparar el nombre del enlace con el nombre de la ruta actual
  return false // Cambia esto según tu lógica
}
</script>
