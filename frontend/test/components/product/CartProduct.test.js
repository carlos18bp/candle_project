import { mount } from "@vue/test-utils";
import CartProduct from "@/components/product/CartProduct.vue";
import { createPinia, setActivePinia } from "pinia";
import { useAppStore } from "@/stores/language";

async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("CartProduct.vue", () => {
  let appStore;
  let pinia;
  let wrapper;

  const product = {
    id: 1,
    title: "Product 1",
    titulo: "Producto 1",
    price: 100,
    quantity: 1,
    colorSelected: "red",
    gallery_urls: ["http://example.com/product1.jpg"]
  };

  const getWrapper = () => {
    return mount(CartProduct, {
      global: {
        plugins: [pinia],
      },
      props: {
        product: product,
      },
    });
  };

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);
    appStore = useAppStore();

    // Set initial state for testing
    appStore.setCurrentLanguage("en");

    wrapper = getWrapper();
  });

  /**
   * Test to verify that the text changes correctly when the language is switched.
   */
  test("updates text correctly when language is switched", async () => {
    await flushPromises(); // Ensure all promises are resolved

    // Check initial English texts
    expect(wrapper.find(".test-title-en").text()).toBe("Product 1");
    expect(wrapper.find(".test-color").text()).toBe("red");
    expect(wrapper.find(".test-price").text()).toBe("$100");
    expect(wrapper.find(".test-add").text()).toBe("Add");
    expect(wrapper.find(".test-remove").text()).toBe("Remove");

    // Switch to Spanish
    appStore.setCurrentLanguage("es");
    await flushPromises(); // Ensure all promises are resolved

    // Check Spanish texts
    expect(wrapper.find(".test-title-es").text()).toBe("Producto 1");
    expect(wrapper.find(".test-color").text()).toBe("red");
    expect(wrapper.find(".test-price").text()).toBe("$100");
    expect(wrapper.find(".test-add").text()).toBe("Agregar");
    expect(wrapper.find(".test-remove").text()).toBe("Eliminar");
  });

  /**
   * Test to ensure the addProduct event is emitted with the correct product data.
   */
  test("emits addProduct event with correct product data", async () => {
    await flushPromises(); // Ensure all promises are resolved

    await wrapper.find(".test-add").trigger("click");
    expect(wrapper.emitted().addProduct).toBeTruthy();
    expect(wrapper.emitted().addProduct[0]).toEqual([product]);
  });

  /**
   * Test to ensure the removeProduct event is emitted with the correct product id.
   */
  test("emits removeProduct event with correct product id", async () => {
    await flushPromises(); // Ensure all promises are resolved

    await wrapper.find(".test-remove").trigger("click");
    expect(wrapper.emitted().removeProduct).toBeTruthy();
    expect(wrapper.emitted().removeProduct[0]).toEqual([product.id]);
  });
});
