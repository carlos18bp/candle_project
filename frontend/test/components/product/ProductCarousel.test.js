import { mount, RouterLinkStub } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import ProductCarousel from "@/components/product/ProductCarousel.vue";
import { useProductStore } from "@/stores/product";
import { useLanguageStore } from "@/stores/language";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import productsData from "../../data_sample/products.json"; // Assuming this file exists

// Mock Axios
const mock = new AxiosMockAdapter(axios);

// Mock window.scrollTo to avoid the "not implemented" error
global.scrollTo = jest.fn();

async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("ProductCarousel.vue", () => {
  let productStore;
  let appStore;
  let pinia;
  let router;
  let wrapper;

  const getWrapper = async (top) => {
    return mount(ProductCarousel, {
      props: {
        top,
      },
      global: {
        plugins: [router, pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);

    // Initialize stores
    productStore = useProductStore();
    appStore = useLanguageStore();
    appStore.setCurrentLanguage("en");

    // Initialize router with a valid path
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/",
          name: "home",
          component: { template: "<div>Home</div>" },
        },
        {
          path: "/product/:product_id",
          name: "product",
          component: { template: "<div>Product</div>" },
        },
      ],
    });

    // Mock the fetchProductsData method to directly set products
    mock.onGet("/api/products-data/").reply(200, productsData);
    await productStore.fetchProductsData();

    // Mount the component
    wrapper = await getWrapper(4); // Assuming we want to display top 4 products
  });

  /**
   * Test to verify that the component renders correctly on initial mount.
   */
  test("renders correctly on initial mount", async () => {
    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.exists()).toBe(true);
    const productItems = wrapper.findAll(".group.relative");
    expect(productItems.length).toBe(4);

    // Check product titles and prices
    productItems.forEach((item, index) => {
      const product = productsData[index];
      expect(item.find("h2").text()).toBe(product.title);
      expect(item.find("p").text()).toBe(`$ ${product.price}`);
    });
  });

  /**
   * Test to verify that product titles and prices are displayed correctly in English.
   */
  test("displays product titles and prices correctly in English", async () => {
    await flushPromises(); // Ensure all promises are resolved

    const productItems = wrapper.findAll(".group.relative");

    // Check product titles and prices
    productItems.forEach((item, index) => {
      const product = productsData[index];
      expect(item.find("h2").text()).toBe(product.title);
      expect(item.find("p").text()).toBe(`$ ${product.price}`);
    });
  });

  /**
   * Test to verify that product titles and prices are displayed correctly in Spanish.
   */
  test("displays product titles and prices correctly in Spanish", async () => {
    appStore.setCurrentLanguage("es");
    await flushPromises(); // Ensure all promises are resolved

    const productItems = wrapper.findAll(".group.relative");

    // Check product titles and prices in Spanish
    productItems.forEach((item, index) => {
      const product = productsData[index];
      expect(item.find("h2").text()).toBe(product.titulo);
      expect(item.find("p").text()).toBe(`$ ${product.price}`);
    });
  });
});
