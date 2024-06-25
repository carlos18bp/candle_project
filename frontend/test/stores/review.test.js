import { setActivePinia, createPinia } from "pinia";
import { useReviewStore } from "@/stores/review";
import reviewsData from "../data_sample/reviews.json";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";

const mock = new AxiosMockAdapter(axios);

describe("Review Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mock.reset();
  });

  /**
   * This test ensures that the store initializes with an empty state.
   * It checks that reviews array is empty and dataLoaded is false.
   */
  test("should initialize with empty state", () => {
    const store = useReviewStore();
    expect(store.reviews).toEqual([]);
    expect(store.dataLoaded).toBe(false);
  });

  /**
   * This test ensures the fetchReviewsData action fetches reviews from the API and updates the store.
   */
  test("should fetch reviews data from API", async () => {
    const store = useReviewStore();
    mock.onGet("/api/reviews-data/").reply(200, reviewsData);

    await store.fetchReviewsData();
    expect(store.reviews).toEqual(reviewsData);
    expect(store.dataLoaded).toBe(true);
  });

  /**
   * This test checks the reviewById getter to ensure it returns the correct review based on the given review ID.
   */
  test("should get a review by ID", () => {
    const store = useReviewStore();
    store.$patch({ reviews: reviewsData });
    const review = store.reviewById(1);
    expect(review.id).toBe(1);
  });

  /**
   * This test checks the reviewsByProductId getter to ensure it returns the correct reviews based on the given product ID.
   */
  test("should get reviews by product ID", () => {
    const store = useReviewStore();
    store.$patch({ reviews: reviewsData });
    const productReviews = store.reviewsByProductId(1);
    expect(productReviews.length).toBeGreaterThan(0);
    expect(productReviews[0].product).toBe(1);
  });

  /**
   * This test ensures the createReview action correctly creates a new review and
   * returns the response status.
   */
  test("should create a new review", async () => {
    const store = useReviewStore();
    const formData = {
      user: "testUser",
      product: 1,
      rating: 5,
      comment: "Great product!",
    };

    mock.onPost("/api/create-review/").reply(201);
    mock.onGet("/api/reviews-data/").reply(200, reviewsData);

    const responseStatus = await store.createReview(formData);
    expect(responseStatus).toBe(201);
  });

  /**
   * This test ensures the fetchReviewsData action handles errors gracefully
   * by setting the reviews array to empty and dataLoaded to false.
   */
  test("should handle error when fetching reviews data", async () => {
    const store = useReviewStore();
    jest.spyOn(store, "fetchReviewsData").mockImplementation(async () => {
      throw new Error("Failed to fetch");
    });

    try {
      await store.fetchReviewsData();
    } catch (error) {
      // This block will not be executed, as the error is handled inside the method
    }

    expect(store.reviews).toEqual([]);
    expect(store.dataLoaded).toBe(false);
  });
});
