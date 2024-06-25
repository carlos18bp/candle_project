import { mount, RouterLinkStub } from "@vue/test-utils";
import Header from "@/components/layouts/Header.vue";
import Banner from "@/components/layouts/Banner.vue";
import ShoppingCart from "@/components/product/ShoppingCart.vue";
import { createPinia, setActivePinia } from "pinia";
import { useAppStore } from "@/stores/language";

// Helper function to flush promises and ensure all asynchronous operations are resolved
async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("Header.vue", () => {
  let appStore;
  let pinia;
  let wrapper;

  // Function to mount the component with necessary global configurations
  const getWrapper = () => {
    return mount(Header, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
          Banner: true, // Stubbing the Banner component
          ShoppingCart: true, // Stubbing the ShoppingCart component
        },
      },
    });
  };

  // Setup before each test
  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);
    appStore = useAppStore();

    // Set initial state for testing
    appStore.setCurrentLanguage("en");

    // Mount the component
    wrapper = getWrapper();
  });

  /**
   * Test to ensure the component renders correctly on initial mount.
   * It checks that the Banner and ShoppingCart components are rendered.
   */
  test("renders correctly on initial mount", async () => {
    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.findComponent(Banner).exists()).toBe(true); // Check if Banner component exists
    expect(wrapper.findComponent(ShoppingCart).exists()).toBe(true); // Check if ShoppingCart component exists
  });

  /**
   * Test to verify that the text changes correctly when the language is switched.
   * It changes the language to Spanish and checks that the Spanish text is displayed correctly.
   */
  test("updates text correctly when language is switched", async () => {
    await flushPromises(); // Ensure all promises are resolved

    // Check initial English texts
    expect(wrapper.find(".test-shop").text()).toBe("SHOP");
    expect(wrapper.find(".test-about").text()).toBe("ABOUT");
    expect(wrapper.find(".test-blog").text()).toBe("BLOG");
    expect(wrapper.find(".test-contact").text()).toBe("CONTACT");

    // Open the language menu
    await wrapper.findComponent({ name: "MenuButton" }).trigger("click");

    // Check initial English texts in the menu
    expect(wrapper.find(".test-english").text()).toBe("ENGLISH");
    expect(wrapper.find(".test-spanish").text()).toBe("SPANISH");

    // Switch to Spanish
    await wrapper.find(".test-spanish").trigger("click");
    await flushPromises(); // Ensure all promises are resolved

    // Check Spanish texts
    expect(wrapper.find(".test-shop").text()).toBe("CATÁLOGO");
    expect(wrapper.find(".test-about").text()).toBe("CONÓCENOS");
    expect(wrapper.find(".test-blog").text()).toBe("BLOG");
    expect(wrapper.find(".test-contact").text()).toBe("CONTACTO");

    // Open the language menu again to check Spanish texts
    await wrapper.findComponent({ name: "MenuButton" }).trigger("click");
    expect(wrapper.find(".test-english").text()).toBe("INGLES");
    expect(wrapper.find(".test-spanish").text()).toBe("ESPAÑOL");
  });
});
