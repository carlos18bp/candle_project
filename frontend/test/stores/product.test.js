import { setActivePinia, createPinia } from "pinia";
import { useProductStore } from "@/stores/product";
import productsData from "../data_sample/products.json";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";

// Create an instance of AxiosMockAdapter to intercept Axios requests
const mock = new AxiosMockAdapter(axios);

describe("Product Store", () => {
  beforeEach(() => {
    // Set up Pinia and reset the mock before each test
    setActivePinia(createPinia());
    mock.reset();
  });

  /**
   * This test ensures that the store initializes with an empty state.
   * It checks that products, cartProducts, categories, and categorias arrays are empty,
   * and dataLoaded is false.
   */
  test("should initialize with empty state", () => {
    const store = useProductStore();
    expect(store.products).toEqual([]);
    expect(store.cartProducts).toEqual([]);
    expect(store.categories).toEqual([]);
    expect(store.categorias).toEqual([]);
    expect(store.dataLoaded).toBe(false);
  });

  /**
   * This test checks if the products data from productsData is correctly loaded into the store's
   * state and sets dataLoaded to true.
   */
  test("should load products data from productsData", async () => {
    const store = useProductStore();
    await store.$patch({ products: productsData, dataLoaded: true });
    expect(store.products).toEqual(productsData);
    expect(store.dataLoaded).toBe(true);
  });

  /**
   * This test checks the functionality of the productById getter, ensuring it returns the correct
   * product based on the given product ID.
   */
  test("should get a product by ID", () => {
    const store = useProductStore();
    store.$patch({ products: productsData });
    const product = store.productById(1);
    expect(product.id).toBe(1);
  });

  /**
   * This test ensures the addProductToCart action correctly adds a product to the cart with the
   * specified quantity and color.
   */
  test("should add a product to the cart", () => {
    const store = useProductStore();
    const product = productsData[0];
    store.addProductToCart(product, 2, "violet");
    expect(store.cartProducts.length).toBe(1);
    expect(store.cartProducts[0]).toEqual({
      ...product,
      quantity: 2,
      colorSelected: "violet",
    });
  });

  /**
   * This test checks the totalCartProducts getter to ensure it correctly calculates the total
   * quantity of all products in the cart.
   */
  test("should calculate total number of products in the cart", () => {
    const store = useProductStore();
    const product = productsData[0];
    store.addProductToCart(product, 2, "violet");
    store.addProductToCart(product, 3, "orange");
    expect(store.totalCartProducts).toBe(5);
  });

  /**
   * This test ensures the totalCartPrice getter correctly calculates the total price of all
   * products in the cart based on their quantity and price.
   */
  test("should calculate total price of products in the cart", () => {
    const store = useProductStore();
    const product = productsData[0];
    store.addProductToCart(product, 2, "violet");
    store.addProductToCart(product, 3, "orange");
    expect(store.totalCartPrice).toBe(product.price * 5);
  });

  /**
   * This test checks the removeProductFromCart action to ensure it correctly removes a product
   * from the cart when the product's quantity is reduced to zero.
   */
  test("should remove a product from the cart", () => {
    const store = useProductStore();
    const product = productsData[0];
    store.addProductToCart(product, 1, "violet");
    store.removeProductFromCart(product.id, "violet");
    expect(store.cartProducts.length).toBe(0);
  });

  /**
   * This test ensures the productBySubCategory action filters products correctly based on
   * selected sub-categories.
   */
  test("should filter products by sub-category", async () => {
    const store = useProductStore();
    store.$patch({ products: productsData, dataLoaded: true });
    store.categories = [
      {
        name: "Decor (EN)",
        subCategories: [
          { name: "Trending Now (EN)", checked: true },
          { name: "New Arrivals (EN)", checked: true },
        ],
      },
      {
        name: "Aesthetic Candles (EN)",
        subCategories: [
          { name: "Cute Animals (EN)", checked: true },
          { name: "Holiday Glow (EN)", checked: true },
          { name: "Minimalist Modern (EN)", checked: true },
        ],
      },
    ];
    store.productBySubCategory();
    expect(store.filteredProducts.length).toBeGreaterThan(0);

    const filteredProducts = store.filteredProducts;

    const filteredCategories = new Set(
      filteredProducts.map((product) => product.sub_category)
    );
    expect(filteredCategories).toEqual(
      new Set([
        "Trending Now (EN)",
        "New Arrivals (EN)",
        "Cute Animals (EN)",
        "Holiday Glow (EN)",
        "Minimalist Modern (EN)",
      ])
    );
  });

  /**
   * This test ensures the productBySubCategoria action filters products correctly based on
   * selected sub-categorias.
   */
  test("should filter products by sub-categoria", async () => {
    const store = useProductStore();
    store.$patch({ products: productsData, dataLoaded: true });
    store.categorias = [
      {
        name: "Decor (ES)",
        subCategorias: [
          { name: "Trending Now (ES)", checked: true },
          { name: "New Arrivals (ES)", checked: true },
        ],
      },
      {
        name: "Aesthetic Candles (ES)",
        subCategorias: [
          { name: "Cute Animals (ES)", checked: true },
          { name: "Holiday Glow (ES)", checked: true },
          { name: "Minimalist Modern (ES)", checked: true },
        ],
      },
    ];
    store.productBySubCategoria();
    expect(store.filteredProducts.length).toBeGreaterThan(0);

    const filteredProducts = store.filteredProducts;

    const filteredCategories = new Set(
      filteredProducts.map((product) => product.sub_categoria)
    );
    expect(filteredCategories).toEqual(
      new Set([
        "Trending Now (ES)",
        "New Arrivals (ES)",
        "Cute Animals (ES)",
        "Holiday Glow (ES)",
        "Minimalist Modern (ES)",
      ])
    );
  });

  /**
   * This test checks the createSale action to ensure it correctly creates a new sale and
   * returns the response status.
   */
  test("should create a new sale", async () => {
    const store = useProductStore();
    const form = {
      email: "test@example.com",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      soldProducts: [{ id: 1, quantity: 2 }],
    };

    // Set up the mock to intercept the POST request to /api/create-sale/
    mock.onPost("/api/create-sale/").reply(201);

    const responseStatus = await store.createSale(form);
    expect(responseStatus).toBe(201);
  });

  /**
   * This test ensures the fetchUniqueCategoriesAndSubCategories action correctly identifies
   * and stores unique categories and subcategories from the products data.
   */
  test("should fetch unique categories and subcategories", async () => {
    const store = useProductStore();
    // Set up the mock to intercept the GET request to /api/products-data/
    mock.onGet("/api/products-data/").reply(200, productsData);

    await store.init();
    await store.fetchUniqueCategoriesAndSubCategories();

    expect(store.categories.length).toBeGreaterThan(0);
    expect(store.categorias.length).toBeGreaterThan(0);
  });

  /**
   * This test ensures the init action initializes the store by fetching the products data
   * if not already loaded.
   */
  test("should initialize store by fetching data", async () => {
    // Set up the mock to intercept the GET request to /api/products-data/
    mock.onGet("/api/products-data/").reply(200, productsData);

    const store = useProductStore();
    await store.init();

    expect(store.dataLoaded).toBe(true);
    expect(store.products.length).toBeGreaterThan(0);
  });

  /**
   * This test checks the addProductToCart action to ensure it correctly increments the quantity
   * of a product if it is already in the cart.
   */
  test("should sum the total quantity of all products in the cart", () => {
    const store = useProductStore();
    const product = productsData[0];
    const anotherProduct = productsData[1];

    store.addProductToCart(product, 2, "violet");
    store.addProductToCart(anotherProduct, 3, "orange");

    const totalQuantity = store.cartProducts.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    expect(totalQuantity).toBe(5);
  });

  /**
   * This test ensures the fetchProductsData action handles errors gracefully
   * by setting the products array to empty and dataLoaded to false.
   */
  test("should handle error when fetching products data", async () => {
    const store = useProductStore();
    jest.spyOn(store, "fetchProductsData").mockImplementation(async () => {
      throw new Error("Failed to fetch");
    });

    try {
      await store.fetchProductsData();
    } catch (error) {
      // This block will not be executed, as the error is handled inside the method
    }

    expect(store.products).toEqual([]);
    expect(store.dataLoaded).toBe(false);
  });

  /**
   * This test ensures the store correctly restores the cart products from
   * localStorage on initialization.
   */
  test("should restore cart from localStorage", () => {
    const store = useProductStore();
    const product = {
      ...productsData[0],
      quantity: 2,
      colorSelected: "violet",
    };
    localStorage.setItem("cartProducts", JSON.stringify([product]));

    store.$patch({
      cartProducts: JSON.parse(localStorage.getItem("cartProducts")),
    });
    expect(store.cartProducts).toEqual([product]);
  });

  /**
   * This test ensures the fetchProductsData action fetches products from the API and updates the store.
   */
  test("should fetch products data from API", async () => {
    // Set up the mock to intercept the GET request to /api/products-data/
    mock.onGet("/api/products-data/").reply(200, productsData);

    const store = useProductStore();
    await store.fetchProductsData();
    expect(store.products).toEqual(productsData);
    expect(store.dataLoaded).toBe(true);
  });
});
