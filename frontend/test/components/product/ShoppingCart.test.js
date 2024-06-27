import { mount, RouterLinkStub } from "@vue/test-utils";
import ShoppingCart from "@/components/product/ShoppingCart.vue";
import CartProduct from "@/components/product/CartProduct.vue";
import { createPinia, setActivePinia } from "pinia";
import { useLanguageStore } from "@/stores/language";
import { useProductStore } from "@/stores/product";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";

const mock = new AxiosMockAdapter(axios);

async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("ShoppingCart.vue", () => {
  let appStore;
  let productStore;
  let pinia;
  let wrapper;

  const cartProducts = [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      quantity: 1,
      colorSelected: "red",
      gallery_urls: ["http://example.com/product1.jpg"]
    },
    {
      id: 2,
      title: "Product 2",
      price: 150,
      quantity: 2,
      colorSelected: "blue",
      gallery_urls: ["http://example.com/product2.jpg"]
    }
  ];

  const getWrapper = () => {
    return mount(ShoppingCart, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: {
        visible: true
      }
    });
  };

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);
    appStore = useLanguageStore();
    productStore = useProductStore();

    // Set initial state for testing
    appStore.setCurrentLanguage("en");

    // Reset the mock before each test
    mock.reset();

    // Mock the responses for Axios requests
    mock.onGet("/api/products-data/").reply(200, cartProducts);

    wrapper = getWrapper();
  });

  /**
   * Test to ensure the component renders correctly when cart is visible.
   */
  test("renders correctly when cart is visible", async () => {
    productStore.$patch({ cartProducts: cartProducts, dataLoaded: true });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".test-shopping_cart").text()).toBe("Shopping cart");
    expect(wrapper.findAllComponents(CartProduct).length).toBe(cartProducts.length);
  });

  /**
   * Test to ensure the component renders correctly when cart is empty.
   */
  test("renders correctly when cart is empty", async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".test-no_products").text()).toBe("No products on the cart");
    expect(wrapper.find(".test-continue_shopping").text()).toBe("Continue Shopping");
  });

  /**
   * Test to verify that the text changes correctly when the language is switched.
   */
  test("updates text correctly when language is switched", async () => {
    productStore.$patch({ cartProducts: cartProducts, dataLoaded: true });

    await flushPromises(); // Ensure all promises are resolved

    // Check initial English texts
    expect(wrapper.find(".test-shopping_cart").text()).toBe("Shopping cart");
    expect(wrapper.find(".test-continue_shopping").text()).toBe("Continue Shopping");
    expect(wrapper.find(".test-checkout").text()).toBe("Checkout");
    expect(wrapper.find(".test-or").text()).toBe("or");

    // Switch to Spanish
    appStore.setCurrentLanguage("es");
    await flushPromises(); // Ensure all promises are resolved

    // Check Spanish texts
    expect(wrapper.find(".test-shopping_cart").text()).toBe("Carrito de Compra");
    expect(wrapper.find(".test-continue_shopping").text()).toBe("Continue comprando");
    expect(wrapper.find(".test-checkout").text()).toBe("Comprar");
    expect(wrapper.find(".test-or").text()).toBe("o");
  });

  /**
   * Test to ensure addProduct method works correctly.
   */
  test("adds product to cart", async () => {
    const addProductSpy = jest.spyOn(productStore, "addProductToCart");

    wrapper.vm.addProduct(cartProducts[0]);
    expect(addProductSpy).toHaveBeenCalledWith(cartProducts[0], 1, cartProducts[0].colorSelected);
    expect(productStore.cartProducts[0].quantity).toBe(1);
  });

  /**
   * Test to ensure removeProduct method works correctly.
   */
  test("removes product from cart", async () => {
    productStore.$patch({
      cartProducts: [{ ...cartProducts[0], quantity: 1, colorSelected: "red" }],
      dataLoaded: true
    });

    const removeProductSpy = jest.spyOn(productStore, "removeProductFromCart");

    wrapper.vm.removeProduct(cartProducts[0].id, "red");
    expect(removeProductSpy).toHaveBeenCalledWith(cartProducts[0].id, "red");
    expect(productStore.cartProducts.length).toBe(0);
  });
});
