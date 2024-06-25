import { mount, RouterLinkStub } from "@vue/test-utils";
import Detail from "@/views/product/Detail.vue";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useProductStore } from "@/stores/product";
import { useAppStore } from "@/stores/language";
import Swal from "sweetalert2";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import productsData from "../../data_sample/products.json";

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
  let productStore;
  let appStore;
  let pinia;
  let router;
  let wrapper;

  const getWrapper = async () => {
    router.push({ name: "product", params: { product_id: "1" } });
    await router.isReady();

    return mount(Detail, {
      global: {
        plugins: [router, pinia],
        stubs: {
          Header: true,
          Footer: true,
          ProductCarousel: true,
          AddReview: true,
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
    appStore = useAppStore();
    appStore.setCurrentLanguage("en");

    // Initialize router
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/product/:product_id",
          name: "product",
          component: Detail,
        },
        // otras rutas...
      ],
    });

    // Mock the fetchProductsData method to directly set products
    mock.onGet("/api/products-data/").reply(200, productsData);
    await productStore.fetchProductsData();

    // Mount the component
    wrapper = await getWrapper();
  });

  /**
   * Test to verify that the component renders correctly on initial mount.
   */
  test("renders correctly on initial mount", async () => {
    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.findComponent({ name: "Header" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "Footer" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "ProductCarousel" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "AddReview" }).exists()).toBe(true);
  });

  /**
   * Test to verify that text updates correctly when the language is switched.
   */
  test("updates text correctly when language is switched", async () => {
    await flushPromises(); // Ensure all promises are resolved

    // Check initial English texts
    expect(wrapper.find(".test-reviews_length").text()).toContain("0 Reviews.");
    expect(wrapper.find(".test-write_review").text()).toContain("Write a review");
    expect(wrapper.find(".test-add_to_cart").text()).toContain("Add to cart");
    expect(wrapper.find(".test-description").text()).toContain("Description");
    expect(wrapper.find(".test-ingredients").text()).toContain("Ingredients");
    expect(wrapper.find(".test-how_to_use").text()).toContain("How To Use?");
    expect(wrapper.find(".test-how_to_feel").text()).toContain("How To Feel?");
    expect(wrapper.find(".test-trending_tag").text()).toContain("Trending");
    expect(wrapper.find(".test-carousel_subtitle").text()).toContain("Shop our popular candle products");

    // Switch to Spanish
    appStore.setCurrentLanguage("es");
    await flushPromises(); // Ensure all promises are resolved

    // Check Spanish texts
    expect(wrapper.find(".test-reviews_length").text()).toContain("0 Reseñas.");
    expect(wrapper.find(".test-write_review").text()).toContain("Dejanos una reseña");
    expect(wrapper.find(".test-add_to_cart").text()).toContain("Agregar al carrito");
    expect(wrapper.find(".test-description").text()).toContain("Descripción");
    expect(wrapper.find(".test-ingredients").text()).toContain("Ingredientes");
    expect(wrapper.find(".test-how_to_use").text()).toContain("Como usarlo?");
    expect(wrapper.find(".test-how_to_feel").text()).toContain("Como te hace sentir?");
    expect(wrapper.find(".test-trending_tag").text()).toContain("Tendencia");
    expect(wrapper.find(".test-carousel_subtitle").text()).toContain("Nuestras velas populares");
  });

  /**
   * Test to verify that addProductToCart is called when the add to cart button is clicked.
   */
  test("calls addProductToCart when add to cart button is clicked", async () => {
    await flushPromises(); // Ensure all promises are resolved

    const addToCartButton = wrapper.find(".test-add_to_cart");
    expect(addToCartButton.exists()).toBe(true);

    jest.spyOn(productStore, "addProductToCart");

    await addToCartButton.trigger("click");
    expect(productStore.addProductToCart).toHaveBeenCalledWith(
      productStore.products[0],
      1,
      "violet"
    );
    expect(Swal.fire).toHaveBeenCalledWith({
      title: "Product added to Shopping Cart successfully",
      icon: "success",
    });
  });
});
