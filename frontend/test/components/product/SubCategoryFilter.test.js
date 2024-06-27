import { mount } from '@vue/test-utils';
import SubCategoryFilter from '@/components/product/SubCategoryFilter.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useLanguageStore } from '@/stores/language';
import { useProductStore } from '@/stores/product';

describe('SubCategoryFilter.vue', () => {
  let appStore;
  let productStore;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    appStore = useLanguageStore();
    productStore = useProductStore();

    // Set initial state for testing
    appStore.setCurrentLanguage('en');
  });

  /**
   * Test to verify that `productBySubCategory` is called when the current language is "en".
   */
  test('calls productBySubCategory when currentLanguage is "en"', async () => {
    jest.spyOn(productStore, 'productBySubCategory').mockImplementation(() => {});
    
    const wrapper = mount(SubCategoryFilter, {
      global: {
        plugins: [pinia],
      },
      props: {
        subCategories: [{ name: 'Test Category', checked: false }],
      },
    });

    // Ensure input is rendered
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.exists()).toBe(true);

    // Simulate changing the checkbox
    await input.setChecked(true);

    // Verify that productBySubCategory was called
    expect(productStore.productBySubCategory).toHaveBeenCalled();
  });

  /**
   * Test to verify that `productBySubCategoria` is called when the current language is not "en".
   */
  test('calls productBySubCategoria when currentLanguage is not "en"', async () => {
    appStore.setCurrentLanguage('es');
    jest.spyOn(productStore, 'productBySubCategoria').mockImplementation(() => {});

    const wrapper = mount(SubCategoryFilter, {
      global: {
        plugins: [pinia],
      },
      props: {
        subCategories: [{ name: 'Test Category', checked: false }],
      },
    });

    // Ensure input is rendered
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.exists()).toBe(true);

    // Simulate changing the checkbox
    await input.setChecked(true);

    // Verify that productBySubCategoria was called
    expect(productStore.productBySubCategoria).toHaveBeenCalled();
  });
});
