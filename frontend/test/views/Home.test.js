import { mount, RouterLinkStub } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router";
import { useAppStore } from "@/stores/language";
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
import ProductCarousel from "@/components/product/ProductCarousel.vue";
import FAQS from "@/components/home/FAQS.vue";

// Mock window.scrollTo to avoid the "not implemented" error
global.scrollTo = jest.fn();

async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("Home.vue", () => {
  let appStore;
  let pinia;
  let router;
  let wrapper;

  const getWrapper = () => {
    return mount(Home, {
      global: {
        plugins: [router, pinia],
        stubs: {
          Header: true,
          Footer: true,
          ProductCarousel: true,
          FAQS: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);
    appStore = useAppStore();
    appStore.setCurrentLanguage("en");

    router = createRouter({
      history: createWebHistory(),
      routes,
    });

    router.push("/");
    await router.isReady();

    wrapper = getWrapper();
  }, 10000);

  /**
   * Test to ensure the component renders correctly on initial mount.
   */
  test("renders correctly on initial mount", async () => {
    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.findComponent(Header).exists()).toBe(true);
    expect(wrapper.findComponent(Footer).exists()).toBe(true);
    expect(wrapper.findComponent(ProductCarousel).exists()).toBe(true);
    expect(wrapper.findComponent(FAQS).exists()).toBe(true);
  });

  /**
   * Test to verify that the text changes correctly when the language is switched.
   */
  test("updates text correctly when language is switched", async () => {
    await flushPromises(); // Ensure all promises are resolved

    // Check initial English texts
    expect(wrapper.find(".test-candle_tag").text()).toContain("#Candle Experience");

    expect(wrapper.find(".test-candle_title_first").text()).toContain("Always");
    expect(wrapper.find(".test-candle_title_second").text()).toContain("cool and soothe");
    expect(wrapper.find(".test-candle_title_therciary").text()).toContain("your feelings available in a variety of");
    expect(wrapper.find(".test-candle_title_fourth").text()).toContain("candle");

    // Check RouterLink button text
    expect(wrapper.find(".test-candle_button").text()).toContain("Discover Products");
    expect(wrapper.find(".test-show_more_button").text()).toContain("Show More");
    expect(wrapper.find(".test-find_button").text()).toContain("Find Product");

    expect(wrapper.find(".test-trending_tag").text()).toContain("Trending");
    expect(wrapper.find(".test-carousel_subtitle").text()).toContain("Shop our popular candle products");

    // Check specific section texts
    expect(wrapper.find(".test-nature_subtitle").text()).toContain("Nature");
    expect(wrapper.find(".test-nature_description").text()).toContain(
      "Handmade, all natural cosmetic grade beeswax & all natural soy wax, 100% cotton wick, Eco-Friendly & Sustainable Wax."
    );

    expect(wrapper.find(".test-durable_subtitle").text()).toContain("Durable");
    expect(wrapper.find(".test-durable_description").text()).toContain(
      "The life of the candle reaches 6 months since it is used and still feels the smell"
    );

    expect(wrapper.find(".test-calm_subtitle").text()).toContain("Calm");
    expect(wrapper.find(".test-calm_description").text()).toContain(
      "The aroma emitted by the candles soothes the feeling and the room is of course very durable"
    );

    expect(wrapper.find(".test-fragance_room").text()).toContain("Fragrance Room");

    // Switch to Spanish
    appStore.setCurrentLanguage("es");
    await flushPromises(); // Ensure all promises are resolved

    // Check Spanish texts
    expect(wrapper.find(".test-candle_tag").text()).toContain("#Experiencia Relajante");

    expect(wrapper.find(".test-candle_title_first").text()).toContain("Siempre");
    expect(wrapper.find(".test-candle_title_second").text()).toContain("refresca y calma");
    expect(wrapper.find(".test-candle_title_therciary").text()).toContain("tus sentiemientos disponibles en una variedad de");
    expect(wrapper.find(".test-candle_title_fourth").text()).toContain("velas");

    // Check RouterLink button text in Spanish
    expect(wrapper.find(".test-candle_button").text()).toContain("Descubrir Productos");
    expect(wrapper.find(".test-show_more_button").text()).toContain("Tienda");
    expect(wrapper.find(".test-find_button").text()).toContain("Encuentralo");

    expect(wrapper.find(".test-trending_tag").text()).toContain("Tendencia");
    expect(wrapper.find(".test-carousel_subtitle").text()).toContain("Nuestras velas populares");

    // Check specific section texts in Spanish
    expect(wrapper.find(".test-nature_subtitle").text()).toContain("Natural");
    expect(wrapper.find(".test-nature_description").text()).toContain(
      "Hecho a mano, cera de abejas totalmente natural de grado cosmético y cera de soja totalmente natural, mecha 100% algodón, cera ecológica y sostenible."
    );

    expect(wrapper.find(".test-durable_subtitle").text()).toContain("Duradero");
    expect(wrapper.find(".test-durable_description").text()).toContain(
      "La vida de la vela llega a los 6 meses desde que se usa y aún se siente el olor."
    );

    expect(wrapper.find(".test-calm_subtitle").text()).toContain("Calma");
    expect(wrapper.find(".test-calm_description").text()).toContain(
      "El aroma que emiten las velas calma la sensación y, por supuesto, la habitación es muy duradera."
    );

    expect(wrapper.find(".test-fragance_room").text()).toContain("Escencia Natural");
  });

  /**
   * Test to verify that the navigation links work correctly.
   */
  test("navigates to the correct route when buttons are clicked", async () => {
    await flushPromises(); // Ensure all promises are resolved

    const catalogLinks = wrapper
      .findAllComponents(RouterLinkStub)
      .filter((link) => link.props().to.name === "catalog");
    expect(catalogLinks.length).toBeGreaterThan(0);

    catalogLinks.forEach((link) => {
      expect(link.props().to.name).toBe("catalog");
    });
  });
});
