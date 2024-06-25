import { mount } from "@vue/test-utils";
import Checkout from "@/views/product/Checkout.vue";
import Banner from "@/components/layouts/Banner.vue";
import { createPinia, setActivePinia } from "pinia";
import { useAppStore } from "@/stores/language";
import { useProductStore } from "@/stores/product";
import Swal from "sweetalert2";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router";

// Mocks
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

global.scrollTo = jest.fn();

async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("Checkout.vue", () => {
  let appStore;
  let productStore;
  let pinia;
  let router;
  let wrapper;

  const getWrapper = () => {
    return mount(Checkout, {
      global: {
        plugins: [router, pinia],
        stubs: {
          Banner: true,
        },
      },
    });
  };

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);
    appStore = useAppStore();
    productStore = useProductStore();

    appStore.setCurrentLanguage("en");

    router = createRouter({
      history: createWebHistory(),
      routes,
    });

    router.push("/");
    await router.isReady();

    // Set up cartProducts in productStore
    productStore.cartProducts = [
      {
        id: 1,
        gallery_urls: [
          "http://127.0.0.1:8000/media/attachments/0b/11/b66bde53-fc98-4db7-a805-00e913530fa5.webp",
        ],
        title: "Modern (EN)",
        titulo: "Modern (ES)",
        price: 139,
        quantity: 1,
        colorSelected: "violet",
      },
    ];

    wrapper = getWrapper();
  });

  /**
   * Test to ensure the component renders correctly on initial mount.
   */
  test("renders correctly on initial mount", () => {
    expect(wrapper.findComponent(Banner).exists()).toBe(true);
  });

  /**
   * Test to verify that text updates correctly when the language is switched.
   */
  test("updates text correctly when language is switched", async () => {
    // Check initial English texts
    expect(wrapper.find(".test-purchase_safety").text()).toContain("Purchase 100% Safety");
    expect(wrapper.find(".test-contact_information").text()).toContain("Contact information");
    expect(wrapper.find(".test-email_address").text()).toContain("Email address");
    expect(wrapper.find(".test-payment_details").text()).toContain("Payment details");
    expect(wrapper.find(".test-card_number").text()).toContain("Card number");
    expect(wrapper.find(".test-expiration_date").text()).toContain("Expiration date");
    expect(wrapper.find(".test-shipping_address").text()).toContain("Shipping address");
    expect(wrapper.find(".test-address").text()).toContain("Address");
    expect(wrapper.find(".test-city").text()).toContain("City");
    expect(wrapper.find(".test-state_province").text()).toContain("State / Province");
    expect(wrapper.find(".test-postal_code").text()).toContain("Postal code");
    expect(wrapper.find(".test-pay_now").text()).toContain("Pay now");
    expect(wrapper.find(".test-amount_due").text()).toContain("Amount due");
    expect(wrapper.find(".test-remove").text()).toContain("Remove");
    expect(wrapper.find(".test-shipping").text()).toContain("Shipping");
    expect(wrapper.find(".test-total").text()).toContain("Total");

    // Switch to Spanish
    appStore.setCurrentLanguage("es");
    await flushPromises(); // Ensure all promises are resolved

    // Check Spanish texts
    expect(wrapper.find(".test-purchase_safety").text()).toContain("Compra 100% Segura");
    expect(wrapper.find(".test-contact_information").text()).toContain("Información de contacto");
    expect(wrapper.find(".test-email_address").text()).toContain("Correo electrónico");
    expect(wrapper.find(".test-payment_details").text()).toContain("Detalles del pago");
    expect(wrapper.find(".test-card_number").text()).toContain("Número de tarjeta");
    expect(wrapper.find(".test-expiration_date").text()).toContain("Fecha de expiración");
    expect(wrapper.find(".test-shipping_address").text()).toContain("Dirección de envío");
    expect(wrapper.find(".test-address").text()).toContain("Dirección");
    expect(wrapper.find(".test-city").text()).toContain("Ciudad");
    expect(wrapper.find(".test-state_province").text()).toContain("Estado / Provincia");
    expect(wrapper.find(".test-postal_code").text()).toContain("Código postal");
    expect(wrapper.find(".test-pay_now").text()).toContain("Pagar ahora");
    expect(wrapper.find(".test-amount_due").text()).toContain("Importe a pagar");
    expect(wrapper.find(".test-remove").text()).toContain("Eliminar");
    expect(wrapper.find(".test-shipping").text()).toContain("Envío");
    expect(wrapper.find(".test-total").text()).toContain("Total");
  });

  /**
   * Test to verify that removeProductFromCart is called when the remove link is clicked.
   */
  test("calls removeProduct when remove link is clicked", async () => {
    const removeLink = wrapper.find(".test-remove");
    expect(removeLink.exists()).toBe(true);

    jest.spyOn(productStore, "removeProductFromCart");

    await removeLink.trigger("click");
    expect(productStore.removeProductFromCart).toHaveBeenCalledWith(1, "violet");
  });

  /**
   * Test to verify that createSale is called when the form is submitted.
   */
  test("calls createSale when form is submitted", async () => {
    wrapper.find('input[type="email"]').setValue("test@example.com");
    wrapper.findAll('input[type="text"]').at(0).setValue("4242424242424242");
    wrapper.findAll('input[type="text"]').at(1).setValue("12/24");
    wrapper.findAll('input[type="text"]').at(2).setValue("123");
    wrapper.findAll('input[type="text"]').at(3).setValue("123 Main St");
    wrapper.findAll('input[type="text"]').at(4).setValue("City");
    wrapper.findAll('input[type="text"]').at(5).setValue("State");
    wrapper.findAll('input[type="text"]').at(6).setValue("12345");

    jest.spyOn(productStore, "createSale");
    const routerPushMock = jest.spyOn(router, "push").mockImplementation(() => Promise.resolve());

    await wrapper.find("form").trigger("submit.prevent");

    await flushPromises(); // Ensure all promises are resolved

    expect(productStore.createSale).toHaveBeenCalled();
    expect(productStore.createSale).toHaveBeenCalledWith(expect.objectContaining({
      email: "test@example.com",
      cardNumber: "4242424242424242",
      expirationDate: "12/24",
      cvc: "123",
      address: "123 Main St",
      city: "City",
      state: "State",
      postalCode: "12345",
      soldProducts: expect.any(Array),
    }));
    expect(Swal.fire).toHaveBeenCalledWith({
      title: "The payment has been processed successfully",
      icon: "success",
    });
    expect(routerPushMock).toHaveBeenCalledWith({ name: "home" });
  });
});
