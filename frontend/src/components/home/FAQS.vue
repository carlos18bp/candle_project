<template>    
    <div class="mx-auto max-w-7xl py-8">
      <div class="flex">
        <div class="w-2/5 px-32 flex flex-col space-y-2">
          <p class="pb-6 font-bold">FAQS</p>
          <button type="button" class="w-44 rounded-md bg-black_p px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-black_p">
            Product & Product
          </button>
          <button type="button" class="w-44 rounded-md bg-black_p px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-black_p">
            Delivery
          </button>
          <button type="button" class="w-44 rounded-md bg-black_p px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-black_p">
            Refunds
          </button>
        </div>
        <div class="w-3/5 flex flex-col">
          <div class="">
            <dl>
              <Disclosure as="div" v-for="faq in faqs" :key="faq.question" class="pt-6" v-slot="{ open }">
                <dt>
                  <DisclosureButton class="flex text-gray-900">
                    <div class="flex flex-col">     
                      <div class="flex pb-2">              
                        <span class="text-base font-semibold">{{ faq.question }}</span>
                        <span class="ml-6 flex h-7">
                          <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                          <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                        </span>
                      </div> 
                      <div class="w-auto h-0.5 bg-slate-200"></div>
                    </div>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" class="mt-2 pr-12">
                  <p class="text-base leading-7 text-gray-600">{{ faq.answer }}</p>
                </DisclosurePanel>
              </Disclosure>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
    import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'
    
    const faqs = [
        {
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        },
        {
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        },
        {
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        },
    ]
  </script>