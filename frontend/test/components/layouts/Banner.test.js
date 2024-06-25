import { mount } from "@vue/test-utils";
import Banner from "@/components/layouts/Banner.vue";
import { createPinia, setActivePinia } from "pinia";
import { useAppStore } from "@/stores/language";

// Helper function to flush promises and ensure all asynchronous operations are resolved
async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("Banner.vue", () => {
  let appStore;
  let pinia;
  let wrapper;

  // Function to mount the component with necessary global configurations
  const getWrapper = () => {
    return mount(Banner, {
      global: {
        plugins: [pinia],
        stubs: {
          VueMarqueeSlider: {
            template: '<div class="vue-marquee-slider"><slot /></div>',
          },
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
    await flushPromises(); // Ensure all promises are resolved
  });

  /**
   * Test to ensure the component renders correctly on initial mount.
   * It checks that the English text is displayed correctly.
   */
  test("renders correctly on initial mount", async () => {
    expect(wrapper.find(".test-reminder").text()).toBe(
      "Hello candle lovers! 💓 Friendly reminder that Shipping only in USA"
    );
    expect(wrapper.find(".test-shipping").text()).toBe(
      "FREE SHIPPING on orders over $100"
    );
  });

  /**
   * Test to verify that the text changes correctly when the language is switched.
   * It changes the language to Spanish and checks that the Spanish text is displayed correctly.
   */
  test("updates text correctly when language is switched", async () => {
    // Switch to Spanish
    appStore.setCurrentLanguage("es");
    await flushPromises(); // Ensure all promises are resolved

    // Verify that the text updates to Spanish
    expect(wrapper.find(".test-reminder").text()).toBe(
      "¡Hola amantes de las velas! 💓 Recordatorio amistoso de que el envío solo se realiza en EE. UU."
    );
    expect(wrapper.find(".test-shipping").text()).toBe(
      "ENVÍO GRATIS en pedidos superiores a $100"
    );
  });
});
