<template>
  <div class="mx-auto px-16 py-16">
    <h2 class="pb-6 px-32 font-bold text-4xl">FAQS</h2>
    <div class="flex">
      <div class="w-2/5 px-32 flex flex-col space-y-6">
        <button type="button"
          class="w-full rounded-3xl bg-black_p px-16 py-8 text-start text-2xl font-semibold tracking-wide text-second_p shadow-sm hover:bg-white hover:text-black_p">
          Product & Promos
        </button>
        <button type="button"
          class="w-full rounded-3xl bg-transparent px-16 py-8 text-start text-2xl font-semibold tracking-wide text-black_p ring-1 ring-primary_p shadow-sm hover:bg-white hover:text-black_p">
          Delivery
        </button>
        <button type="button"
          class="w-full rounded-3xl bg-transparent px-16 py-8 text-start text-2xl font-semibold tracking-wide text-black_p ring-1 ring-primary_p shadow-sm hover:bg-white hover:text-black_p">
          Refunds
        </button>
      </div>

      <div class="w-3/5 flex flex-col">
        <dl>
          <Disclosure as="div" v-for="faq in faqs" :key="faq.question" class="pb-6" v-slot="{ open }">
            <dt>
              <DisclosureButton class="flex w-full text-black_p">
                <div class="flex flex-col w-full">
                  <div class="flex justify-between pb-2">
                    <span class="text-2xl font-medium">{{ faq.question }}</span>
                    <span class="ml-6 flex h-7">
                      <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                      <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div class="w-auto h-px bg-primary_p"></div>
                </div>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <p class="font-regular tracking-wide text-xl leading-7 text-gray_p">{{ faq.answer }}</p>
            </DisclosurePanel>
          </Disclosure>
        </dl>

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