import { defineStore } from "pinia";
import { create_request, get_request } from "./services/request_http";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    categories: [],
    areUpdateProducts: false,
    requestStatus: "",
  }),
  getters: {
    /**
     *
     * @param {object} state - State.
     * @returns {number} - status request.
     */
    getRequestStatus: (state) => {
      return state.requestStatus;
    },
    /**
     * Get product by id.
     * @param {object} state - State.
     * @returns {array} - Product by id occurrence.
     */
    productById: (state) => (productId) => {
      return state.products.find((product) => product.id === productId);
    },
    /**
     * Get product by sub-category.
     * @param {object} state - State.
     * @returns {array} - Product by sub-category occurrence.
     */
    productBySubCategory: (state) => {
      const isCheckedSubCategory = (subCategory) => subCategory.checked;

      return state.products.filter((product) =>
        state.categories.some((category) =>
          category.subCategories.some(
            (subCategory) =>
              isCheckedSubCategory(subCategory) &&
              product.subCategory === subCategory.name
          )
        )
      );
    },
  },
  actions: {
    /**
     * Fetch data from backend.
     */
    async init() {
      if (!this.areUpdateProducts) this.fetchProductsData();
    },
    /**
     * Fetch products from backend.
     */
    async fetchProductsData() {
      if (this.areUpdateProducts) return;

      let response = await get_request("products/");
      let jsonData = response.data;

      if (jsonData && typeof jsonData === "string") {
        try {
          jsonData = JSON.parse(jsonData);
        } catch (error) {
          console.error(error.message);
          jsonData = [];
        }
      }

      this.products = jsonData ?? [];
      console.log("Source: products, count: " + this.products.length);
      console.log(this.products);

      this.areUpdateProducts = true;
    },
    /**
     * Get unique categories and subCategories.
     */
    async fetchUniqueCategoriesAndSubCategories() {
      if (!this.areUpdateProducts) this.fetchProductsData();

      const uniqueCategories = [];

      this.products.forEach((product) => {
        const category = product.category;
        const subCategory = product.subCategory;

        if (!uniqueCategories[category]) {
          uniqueCategories[category] = [];
        }

        if (!uniqueCategories[category].includes(subCategory)) {
          uniqueCategories[category].push(subCategory);
        }
      });

      this.categories = Object.keys(uniqueCategories).map((category) => ({
        name: category,
        subCategories: uniqueCategories[category].map((subCategory) => ({
          name: subCategory,
          checked: false,
        })),

      }));

      console.log("categories");
      console.log(this.categories);
    },
    /**
     * Call creation user and review request.
     * @param {object} formData - Form data.
     */
    async createRequest(formData) {
      let response = await create_request(
        "/api/create_review/",
        JSON.stringify(formData)
      );
      this.requestStatus = response.status;
      this.areUpdateProducts = false;
      this.fetchProductsData();
    },
  },
});
