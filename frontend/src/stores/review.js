import { defineStore } from "pinia";
import { get_request } from "./services/request_http";

export const useReviewStore = defineStore("review", {
  state: () => ({
    reviews: [],
    areUpdateReviews: false,
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
  },
  actions: {
    /**
     * Fetch data from backend.
     */
    async init() {
      if (!this.areUpdateReviews) this.fetchReviewsData();
    },
    /**
     * Fetch reviews from backend.
     */
    async fetchReviewsData() {
      if (this.areUpdateReviews) return;

      let response = await get_request("reviews/");
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
      console.log("Source: reviews, count: " + this.reviews.length);
      console.log(this.reviews);

      this.areUpdateReviews = true;
    },
  },
});
