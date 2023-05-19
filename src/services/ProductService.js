import HttpClient from './utils/HttpClient';

class ProductService {
  constructor() {
    this.httpClient = new HttpClient();
  }

  async listProducts(orderBy = 'ASC') {
    return this.httpClient.get(`/product?orderBy=${orderBy}`);
  }

  async getProduct(id) {
    return this.httpClint.get(`/product/${id}`);
  }

  async createProduct(product) {
    return this.httpClient.post('/product', { body: product });
  }

  async editProduct({ id, product }) {
    return this.httpClient.post(`/product/${id}`, { body: product });
  }

  async deleteProduct(id) {
    return this.httpClient.post(`/product/${id}`);
  }
}

export default new ProductService();
