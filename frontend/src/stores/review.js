import { defineStore } from "pinia";
import { create_request, get_request } from "./services/request_http";

export const useReviewStore = defineStore("review", {
  state: () => ({
    reviews: [],
    dataLoaded: false,
  }),
  getters: {
    /**
     * Get review by id.
     * @param {object} state - State.
     * @returns {array} - review by id occurrence.
     */
    reviewById: (state) => (reviewId) => {
      return state.reviews.find((review) => review.id === reviewId);
    },
    /**
     * Get reviews by product id.
     * @param {object} state - State.
     * @returns {array} - Reviews by product id occurrence.
     */
    reviewsByProductId: (state) => (productId) => {
      return state.reviews.filter((review) => review.product === productId);
    },
  },
  actions: {
    /**
     * Fetch data from backend.
     */
    async init() {
      if (!this.dataLoaded) this.fetchReviewsData();
    },
    /**
     * Fetch reviews from backend.
     */
    async fetchReviewsData() {
      if (this.dataLoaded) return;

      let response = await get_request("reviews-data/");
      let jsonData = response.data;

      if (jsonData && typeof jsonData === "string") {
        try {
          jsonData = JSON.parse(jsonData);
        } catch (error) {
          console.error(error.message);
          jsonData = [];
        }
      }

      this.reviews = jsonData ?? [];
      this.dataLoaded = true;
    },
    /**
     * Call creation user and review request.
     * @param {object} formData - Form data.
     */
    async createReview(formData) {
      let response = await create_request(
        "create-review/",
        JSON.stringify(formData)
      );

      this.dataLoaded = false;
      this.fetchReviewsData();
      return response.status;
    },
  },
});
