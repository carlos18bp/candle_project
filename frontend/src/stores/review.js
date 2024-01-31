import { defineStore } from "pinia";
import { get_request } from "./services/request_http";

export const useReviewStore = defineStore("review", {
  state: () => ({
    reviews: [],
    areUpdatereviews: false,
  }),
  getters: {
    /**
     * Get review by id.
     * @param {object} state - State. 
     * @returns {array} - review by id occurrence.
     */
    reviewById: (state) => (reviewId) => {
      return state.reviews.find(review => review.id === reviewId);
    },
  },
  actions: { 
    /**
     * Fetch data from backend.
     */
    async init() {
      if(!this.areUpdatereviews) this.fetchreviewsData();
    },
    /**
     * Fetch reviews from backend.
     */
    async fetchReviewsData() {
      if(this.areUpdatereviews) return;

      let jsonData = await get_request('reviews/');

      if (jsonData && typeof jsonData === 'string') {
        try {
          jsonData = JSON.parse(jsonData)
        } catch (error) {
          console.error(error.message);
          jsonData = [];
        }
      }
      
      this.reviews = jsonData ?? [];
      
      this.areUpdatereviews = true;
    },
  }
});