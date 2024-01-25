import { defineStore } from "pinia";
import { get_request } from "./services/request_http";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    areUpdateProducts: false,
  }),
  getters: {
    /**
     * Get product by id.
     * @param {object} state - State. 
     * @returns {array} - product by id occurrence.
     */
    productById: (state) => (productId) => {
      return state.products.find(product => product.id === productId);
    },
  },
  actions: { 
    /**
     * Fetch data from backend.
     */
    async init() {
      if(!this.areUpdateProducts) this.fetchProductsData();
    },
    /**
     * Fetch products from backend.
     */
    async fetchProductsData() {
      if(this.areUpdateProducts) return;

      let jsonData = await get_request('list_products/');
      if (jsonData && typeof jsonData === 'string') {
        try {
          jsonData = JSON.parse(jsonData)
        } catch (error) {
          console.error(error.message);
          jsonData = [];
        }
      }

      this.products = jsonData ?? [];
      
      this.areUpdateProducts = true;
    },
  }
});