import { defineStore } from "pinia";
import { get_request } from "./services/request_http";

export const useBlogStore = defineStore("blog", {
  /**
   * Store state.
   * @returns {object} State object.
   */
  state: () => ({
    blogs: [],
    dataLoaded: false,
  }),

  getters: {
    /**
     * Get blog by ID.
     * @param {object} state - State.
     * @returns {function} - Function to find blog by ID.
     */
    blogById: (state) => (blogId) => {
      return state.blogs.find((blog) => blog.id === blogId);
    },
  },

  actions: {
    /**
     * Initialize store by fetching data if not already loaded.
     */
    async init() {
      if (!this.dataLoaded) await this.fetchBlogsData();
    },

    /**
     * Fetch blogs data from backend.
     */
    async fetchBlogsData() {
      if (this.dataLoaded) return;

      let response = await get_request("blogs-data/");
      let jsonData = response.data;

      if (jsonData && typeof jsonData === "string") {
        try {
          jsonData = JSON.parse(jsonData);
        } catch (error) {
          console.error(error.message);
          jsonData = [];
        }
      }

      this.blogs = jsonData ?? [];
      this.dataLoaded = true;
    },
  },
});
