import { mount } from "@vue/test-utils";
import List from "@/views/product/List.vue";
import { createPinia, setActivePinia } from "pinia";
import { useProductStore } from "@/stores/product";
import { useAppStore } from "@/stores/language";
import productsData from "../../data_sample/products.json";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
import CategoryFilter from "@/components/product/CategoryFilter.vue";

// Mock window.scrollTo to avoid the "not implemented" error
global.scrollTo = jest.fn();

// Create an instance of AxiosMockAdapter to intercept Axios requests
const mock = new AxiosMockAdapter(axios);

async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("List.vue", () => {
  let productStore;
  let appStore;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    productStore = useProductStore();
    appStore = useAppStore();
    appStore.setCurrentLanguage('en');

    // Mock the API response for fetching products
    mock.onGet("/api/products-data/").reply(200, productsData);

    // Spy on the fetchProductsData method
    jest.spyOn(productStore, 'fetchProductsData');
  });

  /**
   * Test to ensure the component renders correctly on initial mount.
   */
  test("renders correctly on initial mount", async () => {
    const wrapper = mount(List, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: true,
          ArrowLongLeftIcon: true,
          ArrowLongRightIcon: true,
          Header: true,
          Footer: true,
          CategoryFilter: true,
        },
      },
    });

    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.findComponent(Header).exists()).toBe(true);
    expect(wrapper.findComponent(Footer).exists()).toBe(true);
    expect(wrapper.findComponent(CategoryFilter).exists()).toBe(true);
  });

  /**
   * Test to verify that the text changes correctly when the language is switched.
   */
  test("updates text correctly when language is switched", async () => {
    const wrapper = mount(List, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: true,
          ArrowLongLeftIcon: true,
          ArrowLongRightIcon: true,
          Header: true,
          Footer: true,
          CategoryFilter: true,
        },
      },
    });

    await flushPromises(); // Ensure all promises are resolved
    expect(wrapper.find(".test-filter_title").text()).toBe("Filter By Categories");
    expect(wrapper.find(".test-candles").text()).toBe("Candles");
    expect(wrapper.find(".test-previous").text()).toBe("Previous");
    expect(wrapper.find(".test-next").text()).toBe("Next");

    appStore.setCurrentLanguage('es');
    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.find(".test-filter_title").text()).toBe("Filtro Por Categorías");
    expect(wrapper.find(".test-candles").text()).toBe("Velas");
    expect(wrapper.find(".test-previous").text()).toBe("Anterior");
    expect(wrapper.find(".test-next").text()).toBe("Siguiente");
  });

  /**
   * Test to verify that fetchProductsData is called on mount.
   */
  test('fetchProductsData is called on mount', async () => {
    const wrapper = mount(List, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: true,
          ArrowLongLeftIcon: true,
          ArrowLongRightIcon: true,
          Header: true,
          Footer: true,
          CategoryFilter: true,
        },
      },
    });

    await flushPromises(); // Ensure all promises are resolved

    // Verificar que fetchProductsData fue llamado
    expect(productStore.fetchProductsData).toHaveBeenCalled();
    expect(productStore.products).toEqual(productsData);
  });
});
