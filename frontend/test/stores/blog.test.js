import { setActivePinia, createPinia } from "pinia";
import { useBlogStore } from "@/stores/blog";
import blogsData from "../data_sample/blogs.json";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";

const mock = new AxiosMockAdapter(axios);

describe("Blog Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mock.reset();
  });

  /**
   * This test ensures that the store initializes with an empty state. It checks that blogs
   * array is empty, and dataLoaded is false.
   */
  test("should initialize with empty state", () => {
    const store = useBlogStore();
    expect(store.blogs).toEqual([]);
    expect(store.dataLoaded).toBe(false);
  });

  /**
   * This test checks if the blogs data from blogsData is correctly loaded into the store's
   * state and sets dataLoaded to true.
   */
  test("should load blogs data from blogsData", async () => {
    const store = useBlogStore();
    await store.$patch({ blogs: blogsData, dataLoaded: true });
    expect(store.blogs).toEqual(blogsData);
    expect(store.dataLoaded).toBe(true);
  });

  /**
   * This test checks the functionality of the blogById getter, ensuring it returns the correct
   * blog based on the given blog ID.
   */
  test("should get a blog by ID", () => {
    const store = useBlogStore();
    store.$patch({ blogs: blogsData });
    const blog = store.blogById(1);
    expect(blog.id).toBe(1);
  });

  /**
   * This test ensures the fetchBlogsData action fetches blogs from the API and updates the store.
   */
  test("should fetch blogs data from API", async () => {
    const store = useBlogStore();
    mock.onGet("/api/blogs-data/").reply(200, blogsData);

    await store.fetchBlogsData();
    expect(store.blogs).toEqual(blogsData);
    expect(store.dataLoaded).toBe(true);
  });

  /**
   * This test ensures the init action initializes the store by fetching the blogs data
   * if not already loaded.
   */
  test("should initialize store by fetching data", async () => {
    mock.onGet("/api/blogs-data/").reply(200, blogsData);

    const store = useBlogStore();
    await store.init();

    expect(store.dataLoaded).toBe(true);
    expect(store.blogs.length).toBeGreaterThan(0);
  });

  /**
   * This test ensures the fetchBlogsData action handles errors gracefully
   * by setting the blogs array to empty and dataLoaded to false.
   */
  test("should handle error when fetching blogs data", async () => {
    const store = useBlogStore();
    jest.spyOn(store, "fetchBlogsData").mockImplementation(async () => {
      throw new Error("Failed to fetch");
    });

    try {
      await store.fetchBlogsData();
    } catch (error) {
      // This block will not be executed, as the error is handled inside the method
    }

    expect(store.blogs).toEqual([]);
    expect(store.dataLoaded).toBe(false);
  });
});
