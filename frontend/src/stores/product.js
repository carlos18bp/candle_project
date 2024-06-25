import { defineStore } from "pinia";
import { create_request, get_request } from "./services/request_http";

export const useProductStore = defineStore("product", {
  /**
   * Store state.
   * @returns {object} State object.
   */
  state: () => ({
    cartProducts: [],
    categorias: [],
    categories: [],
    dataLoaded: false,
    filteredProducts: [],
    products: [],
  }),

  getters: {
    /**
     * Get product by ID.
     * @param {object} state - State.
     * @returns {function} - Function to find product by ID.
     */
    productById: (state) => (productId) =>
      state.products.find((product) => product.id === productId),

    /**
     * Calculate total number of products in the cart.
     * @param {object} state - State.
     * @returns {number} - Total number of products in the cart.
     */
    totalCartProducts: (state) =>
      state.cartProducts.reduce(
        (total, product) => total + product.quantity,
        0
      ),

    /**
     * Calculate total price of products in the cart.
     * @param {object} state - State.
     * @returns {number} - Total price of products in the cart.
     */
    totalCartPrice: (state) =>
      state.cartProducts.reduce(
        (total, product) =>
          total + parseFloat(product.price) * product.quantity,
        0
      ),
  },

  actions: {
    /**
     * Add a product to the cart.
     * @param {object} addProduct - Product to add.
     * @param {number} quantity - Quantity to add.
     * @param {string} colorSelected - Selected color of the product.
     */
    addProductToCart(addProduct, quantity, colorSelected) {
      const existingProduct = this.cartProducts.find(
        (product) => product.id == addProduct.id && product.colorSelected === colorSelected
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        this.cartProducts.push({ ...addProduct, quantity, colorSelected });
      }
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    },

    /**
     * Fetch products data from backend.
     */
    async fetchProductsData() {
    if (this.dataLoaded) return;
  
    try {
      let response = await get_request("products-data/");
      let jsonData = response.data;
  
      if (jsonData && typeof jsonData === "string") {
        try {
          jsonData = JSON.parse(jsonData);
        } catch (error) {
          console.error("JSON parse error:", error.message);
          jsonData = [];
        }
      }
  
      this.products = jsonData ?? [];
      this.dataLoaded = true;
      this.filteredProducts = this.products;
      this.fetchUniqueCategoriesAndSubCategories();
    } catch (error) {
      console.error("Error fetching products data:", error.message);
      this.products = [];
      this.dataLoaded = false;
    }
  },
  
    /**
     * Fetch unique categories and subCategories from products.
     */
    async fetchUniqueCategoriesAndSubCategories() {
      if (!this.dataLoaded) await this.fetchProductsData();

      const categoryMap = new Map();
      const categoriaMap = new Map();

      this.products.forEach((product) => {
        // Process English categories and sub-categories
        if (!categoryMap.has(product.category)) {
          categoryMap.set(product.category, {
            name: product.category,
            subCategories: [],
          });
        }
        categoryMap
          .get(product.category)
          .subCategories.push({ name: product.sub_category, checked: false });

        // Process Spanish categories and sub-categories
        if (!categoriaMap.has(product.categoria)) {
          categoriaMap.set(product.categoria, {
            name: product.categoria,
            subCategorias: [],
          });
        }
        categoriaMap
          .get(product.categoria)
          .subCategorias.push({ name: product.sub_categoria, checked: false });
      });

      // Convert maps to arrays and remove duplicates
      this.categories = Array.from(categoryMap.values()).map((category) => ({
        ...category,
        subCategories: Array.from(
          new Set(category.subCategories.map((sub) => JSON.stringify(sub)))
        ).map((sub) => JSON.parse(sub)),
      }));

      this.categorias = Array.from(categoriaMap.values()).map((categoria) => ({
        ...categoria,
        subCategorias: Array.from(
          new Set(categoria.subCategorias.map((sub) => JSON.stringify(sub)))
        ).map((sub) => JSON.parse(sub)),
      }));
    },

    /**
     * Initialize store by fetching data if not already loaded.
     */
    async init() {
      if (!this.dataLoaded) await this.fetchProductsData();
    },

    /**
     * Filter products by sub-category.
     */
    productBySubCategory() {
      const isChecked = (subCategory) => subCategory.checked;

      this.filteredProducts = this.products.filter((product) => {
        return this.categories.some((category) =>
          category.subCategories.some(
            (subCategory) =>
              isChecked(subCategory) &&
              product.sub_category === subCategory.name
          )
        );
      });

      if (this.filteredProducts.length === 0) this.filteredProducts = this.products;
    },

    /**
     * Filter products by sub-categoria.
     */
    productBySubCategoria() {
      const isChecked = (subCategoria) => subCategoria.checked;

      this.filteredProducts = this.products.filter((product) => {
        return this.categorias.some((categoria) =>
          categoria.subCategorias.some(
            (subCategoria) =>
              isChecked(subCategoria) &&
              product.sub_categoria === subCategoria.name
          )
        );
      });

      if (this.filteredProducts.length === 0)
        this.filteredProducts = this.products;
    },

    /**
     * Remove a product from the cart.
     * @param {number} removeProduct - the product to remove.
     */
    removeProductFromCart(removeProductId, colorSelected) {
      const removeProductFound = this.cartProducts.find(
        (product) => product.id === removeProductId && product.colorSelected === colorSelected
      );

      if (removeProductFound.quantity > 1) {
        removeProductFound.quantity -= 1;
      } else {
        this.cartProducts = this.cartProducts.filter(
          (product) => product !== removeProductFound
        );
      }
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    },
    /**
     * Create a new sale
     * @param {Object} form - The form data for the sale
     * @returns {Number} - The response status of the sale creation request
     */
    async createSale(form) {
        try {
          const response = await create_request('create-sale/', {
            email: form.email,
            address: form.address,
            city: form.city,
            state: form.state,
            postal_code: form.postalCode,
            sold_products: form.soldProducts,
          });

          return response.status;
        } catch (error) {
          console.error('Error creating sale:', error);
        }
      },
  },
});
