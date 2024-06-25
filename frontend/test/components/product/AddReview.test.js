import { mount } from '@vue/test-utils';
import AddReview from '@/components/product/AddReview.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useAppStore } from '@/stores/language';
import { useReviewStore } from '@/stores/review';
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import reviewsData from '../../data_sample/reviews.json';

// Mock the initGeetest4 function
global.initGeetest4 = jest.fn((config, callback) => {
  const captchaObj = {
    showBox: jest.fn(),
    onReady: jest.fn().mockImplementation(callback => callback()),
    onSuccess: jest.fn().mockImplementation(callback => callback()),
    onError: jest.fn().mockImplementation(callback => callback())
  };
  callback(captchaObj);
});

// Create an instance of AxiosMockAdapter to intercept Axios requests
const mock = new AxiosMockAdapter(axios);

describe('AddReview.vue', () => {
  let appStore;
  let reviewStore;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    appStore = useAppStore();
    reviewStore = useReviewStore();

    // Set initial state for testing
    appStore.setCurrentLanguage('en');

    // Reset the mock before each test
    mock.reset();

    // Mock the responses for Axios requests
    mock.onPost("/api/create-review/").reply(201);
    mock.onGet("/api/reviews-data/").reply(200, reviewsData);
  });

  /**
   * Test to ensure the component renders correctly on initial mount.
   */
  test('renders correctly on initial mount', async () => {
    const wrapper = mount(AddReview, {
      global: {
        plugins: [pinia],
      },
      props: {
        product_id: 1,
      },
    });

    // Ensure all elements are rendered
    expect(wrapper.find('.test-create_new_review').text()).toBe('Create New Review');
    expect(wrapper.find('.test-name').text()).toContain('Name');
    expect(wrapper.find('.test-email').text()).toContain('Email');
    expect(wrapper.find('.test-rate').text()).toContain('Rate');
    expect(wrapper.find('.test-description').text()).toContain('Description');
    expect(wrapper.find('.test-add_new_review').text()).toBe('Add new review');
  });

  /**
   * Test to verify that the text changes correctly when the language is switched.
   */
  test('updates text correctly when language is switched', async () => {
    const wrapper = mount(AddReview, {
      global: {
        plugins: [pinia],
      },
      props: {
        product_id: 1,
      },
    });

    // Switch to Spanish
    appStore.setCurrentLanguage('es');
    await wrapper.vm.$nextTick();

    // Ensure all elements are rendered in Spanish
    expect(wrapper.find('.test-create_new_review').text()).toBe('Crear nueva reseña');
    expect(wrapper.find('.test-name').text()).toContain('Nombre');
    expect(wrapper.find('.test-email').text()).toContain('Correo Electronico');
    expect(wrapper.find('.test-rate').text()).toContain('Puntuación');
    expect(wrapper.find('.test-description').text()).toContain('Descripción');
    expect(wrapper.find('.test-add_new_review').text()).toBe('Agregar nueva reseña');
  });

  /**
   * Test to verify that the form submission triggers the Geetest captcha.
   */
  test('triggers Geetest captcha on form submission', async () => {
    const wrapper = mount(AddReview, {
      global: {
        plugins: [pinia],
      },
      props: {
        product_id: 1,
      },
    });

    // Mock the Geetest showBox method
    const geetestMock = {
      showBox: jest.fn(),
    };
    wrapper.vm.geetest = geetestMock;

    // Simulate form submission
    await wrapper.find('form').trigger('submit.prevent');

    // Ensure Geetest showBox is called
    expect(geetestMock.showBox).toHaveBeenCalled();
  });
});
