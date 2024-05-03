<template>
  <div
    id="add-review-modal"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
        >
          <h3 class="text-lg font-semibold text-gray-90">
            Create New Review
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-toggle="add-review-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <form class="p-4 md:p-5" @submit.prevent="onSubmit">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label
                for="full_name"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Full Name</label
              >
              <input
                v-model="reviewFormData.fullName"
                type="text"
                name="full_name"
                id="full_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type your full name"
                required
              />
            </div>
            <div class="col-span-2">
              <label
                for="date"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Birthdate</label
              >
              <input
                v-model="reviewFormData.birthday"
                type="date"
                name="date"
                id="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type your birthdate"
                required
              />
            </div>
            <div class="col-span-2">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Email</label
              >
              <input
                v-model="reviewFormData.email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type your email"
                required
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="rate"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Rate</label
              >
              <select
                v-model="reviewFormData.rate"
                id="rate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                required
              >
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>
            <div class="col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Description</label
              >
              <textarea
                v-model="reviewFormData.description"
                id="description"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write review description here"
                required
              ></textarea>
            </div>
          </div>
          
          <button
            data-modal-hide="add-review-modal"
            type="submit"
            class="text-white inline-flex items-center bg-primary_p hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add new review
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { submitHandler } from "@/shared/submit_handler";
  import { reactive, onMounted } from "vue";
  
  let geetest = '';

  const props = defineProps({
    productId: Number,
  });
  
  const reviewFormData = reactive({
    fullName: "",
    birthday: "",
    email: "",
    rate: "",
    description: "",
    productId: props.productId,
  });
  
  /**
   * Submit event.
   */
  const onSubmit = () => {
    geetest.showBox()
  };
  
  /**
   * Clean review form
   */
  const cleanForm = () => {
  reviewFormData.fullName = "";
  reviewFormData.birthday = "";
  reviewFormData.email = "";
  reviewFormData.rate = "";
  reviewFormData.description = "";
};

onMounted ( () => {
  initGeetest4(
{

  product: "bind",
  captchaId: "8b442b4da2d1abbb82c72549543bfc4d",
    },
    function (captchaObj) {
      geetest = captchaObj;
      captchaObj
        .onReady(function () {
        })
        .onSuccess(function () {
          submitHandler(reviewFormData, "New review was created!");
          cleanForm();
        })
        .onError(function () {
        });
    }
  );
})
</script>



