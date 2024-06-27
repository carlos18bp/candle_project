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

      try {
        let response = await get_request("reviews-data/");
        let jsonData = response.data;

        if (jsonData && typeof jsonData === "string") {
          try {
            jsonData = JSON.parse(jsonData);
          } catch (error) {
            console.error("JSON parse error:", error.message);
            jsonData = [];
          }
        }

        this.reviews = jsonData ?? [];
        this.dataLoaded = true;
      } catch (error) {
        console.error("Error fetching reviews data:", error.message);
        this.reviews = [];
        this.dataLoaded = false;
      }
    },
    /**
     * Call creation user and review request.
     * @param {object} formData - Form data.
     */
    async createReview(formData) {
      try {
        let response = await create_request(
          "create-review/",
          JSON.stringify(formData)
        );

        this.dataLoaded = false;
        await this.fetchReviewsData();

        return response.status;
      } catch (error) {
        console.error("Error creating review:", error.message);
        return null;
      }
    },
  },
});
