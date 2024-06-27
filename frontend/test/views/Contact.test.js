import { mount, RouterLinkStub } from "@vue/test-utils";
import Contact from "@/views/Contact.vue";
import { createPinia, setActivePinia } from "pinia";
import { useLanguageStore } from "@/stores/language";

// Helper function to flush promises and ensure all asynchronous operations are resolved
async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

// Mock window.scrollTo to avoid the "not implemented" error during testing
global.scrollTo = jest.fn();

describe("Contact.vue", () => {
  let appStore;
  let pinia;
  let wrapper;

  // Function to mount the component with necessary global configurations
  const getWrapper = () => {
    return mount(Contact, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
          Header: true, // Stubbing Header component
          Footer: true, // Stubbing Footer component
          GoogleMap: true, // Stubbing GoogleMap component
          Marker: true, // Stubbing Marker component
        },
      },
    });
  };

  // Setup before each test
  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);
    appStore = useLanguageStore();

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
    expect(wrapper.find(".test-contact_title").text()).toBe("Get In Touch");
    expect(wrapper.find(".test-contact").text()).toBe("Contact");
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
    expect(wrapper.find(".test-contact_title").text()).toBe("Contactanos");
    expect(wrapper.find(".test-contact").text()).toBe("Contacto");
  });
});
