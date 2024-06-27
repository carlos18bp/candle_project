import { mount, RouterLinkStub } from '@vue/test-utils';
import List from '@/views/blog/List.vue';
import Header from '@/components/layouts/Header.vue';
import Footer from '@/components/layouts/Footer.vue';
import BlogPresentation from '@/components/blog/BlogPresentation.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useLanguageStore } from '@/stores/language';
import { useBlogStore } from '@/stores/blog';
import blogsData from '../../data_sample/blogs.json';
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new AxiosMockAdapter(axios);
global.scrollTo = jest.fn();

describe('List.vue', () => {
  let appStore;
  let blogStore;
  let pinia;
  let wrapper;

  const getWrapper = () => {
    return mount(List, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
          Header: true,
          Footer: true,
          BlogPresentation: true,
        },
      },
    });
  };

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);
    appStore = useLanguageStore();
    blogStore = useBlogStore();

    jest.spyOn(blogStore, 'fetchBlogsData');

    // Set initial state for testing
    appStore.setCurrentLanguage('en');

    // Mock API response
    mock.reset();
    mock.onGet('/api/blogs-data/').reply(200, blogsData);

    wrapper = getWrapper();
    await wrapper.vm.$nextTick();
  });

  /**
   * Test to ensure the component renders correctly on initial mount.
   */
  test('renders correctly on initial mount', async () => {
    expect(wrapper.findComponent(Header).exists()).toBe(true);
    expect(wrapper.findComponent(Footer).exists()).toBe(true);
  });

  /**
   * Test to verify that fetchBlogsData is called on mount.
   */
  test('fetchBlogsData is called on mount', async () => {
    await wrapper.vm.$nextTick();
    expect(blogStore.fetchBlogsData).toHaveBeenCalled();
    expect(blogStore.blogs).toEqual(blogsData);
  });
});
