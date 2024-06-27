import { mount, RouterLinkStub } from "@vue/test-utils";
import BlogPresentation from "@/components/blog/BlogPresentation.vue";
import { createPinia, setActivePinia } from "pinia";
import { useLanguageStore } from "@/stores/language";

async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("BlogPresentation.vue", () => {
  let appStore;
  let pinia;

  const blog = {
    id: 1,
    image_url: "http://example.com/image.jpg",
    category: "Lifestyle",
    categoria: "Estilo de vida",
    title: "An Amazing Blog Post",
    titulo: "Un Post de Blog Increíble"
  };

  const getWrapper = () => {
    return mount(BlogPresentation, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: {
        blog
      }
    });
  };

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);
    appStore = useLanguageStore();

    // Set initial state for testing
    appStore.setCurrentLanguage("en");
  });

  /**
   * Test to ensure the component renders correctly with English language.
   */
  test("renders correctly with English language", async () => {
    const wrapper = getWrapper();
    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.find("img").attributes("src")).toBe(blog.image_url);
    expect(wrapper.find("h2").text()).toBe(blog.category);
    expect(wrapper.find(".font-bold").text()).toBe(blog.title);
  });

  /**
   * Test to ensure the component renders correctly with Spanish language.
   */
  test("renders correctly with Spanish language", async () => {
    const wrapper = getWrapper();
    appStore.setCurrentLanguage("es");
    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.find("img").attributes("src")).toBe(blog.image_url);
    expect(wrapper.find("h2").text()).toBe(blog.categoria);
    expect(wrapper.find(".font-bold").text()).toBe(blog.titulo);
  });
});
