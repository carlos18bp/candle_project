import { mount, RouterLinkStub } from "@vue/test-utils";
import Detail from "@/views/blog/Detail.vue";
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
import BlogCarousel from "@/components/blog/BlogCarousel.vue";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useBlogStore } from "@/stores/blog";
import { useAppStore } from "@/stores/language";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import blogsData from "../../data_sample/blogs.json";

// Mock Axios
const mock = new AxiosMockAdapter(axios);

// Mock Swal
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

// Mock window.scrollTo to avoid the "not implemented" error
global.scrollTo = jest.fn();

async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("Detail.vue", () => {
  let blogStore;
  let appStore;
  let pinia;
  let router;
  let wrapper;

  const getWrapper = async () => {
    router.push({ name: "blog", params: { blog_id: "1" } });
    await router.isReady();

    return mount(Detail, {
      global: {
        plugins: [router, pinia],
        stubs: {
          Header: true,
          Footer: true,
          BlogCarousel: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);

    // Initialize stores
    blogStore = useBlogStore();
    jest.spyOn(blogStore, "fetchBlogsData");

    appStore = useAppStore();
    appStore.setCurrentLanguage("en");

    // Initialize router
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/blog/:blog_id",
          name: "blog",
          component: Detail,
        },
        // otras rutas...
      ],
    });

    // Mock the fetchBlogsData method to directly set blogs
    mock.onGet("/api/blogs-data/").reply(200, blogsData);
    await blogStore.fetchBlogsData();

    // Mount the component
    wrapper = await getWrapper();
  });

  /**
   * Test to verify that the component renders correctly on initial mount.
   */
  test("renders correctly on initial mount", async () => {
    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.findComponent(Header).exists()).toBe(true);
    expect(wrapper.findComponent(Footer).exists()).toBe(true);
    expect(wrapper.findComponent(BlogCarousel).exists()).toBe(true);

    // Ensure the blog data is rendered correctly
    expect(wrapper.find("h1").text()).toBe(blogsData[0].title);
    expect(wrapper.find("p").text()).toContain(blogsData[0].description);
  });

  /**
   * Test to verify that text updates correctly when the language is switched.
   */
  test("updates text correctly when language is switched", async () => {
    await flushPromises(); // Ensure all promises are resolved

    // Check initial English texts
    expect(wrapper.find("h1").text()).toBe(blogsData[0].title);
    expect(wrapper.find("p").text()).toContain(blogsData[0].description);

    // Switch to Spanish
    appStore.setCurrentLanguage("es");
    await flushPromises(); // Ensure all promises are resolved

    // Check Spanish texts
    expect(wrapper.find("h1").text()).toBe(blogsData[0].titulo);
    expect(wrapper.find("p").text()).toContain(blogsData[0].descripcion);
  });

  /**
   * Test to verify that fetchBlogsData is called on mount.
   */
  test("fetchBlogsData is called on mount", async () => {
    await flushPromises(); // Ensure all promises are resolved
    expect(blogStore.fetchBlogsData).toHaveBeenCalled();
  });
});
