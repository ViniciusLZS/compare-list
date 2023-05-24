import HttpClient from './utils/HttpClient';

class ProductService {
  constructor() {
    this.httpClient = new HttpClient();
  }

  async listProducts({ params, orderBy = 'ASC' }) {
    return this.httpClient.get(`/product/${params}?orderBy=${orderBy}`);
  }

  async getProduct(params) {
    return this.httpClint.get(`/product/${params}`);
  }

  async createProduct(product) {
    return this.httpClient.post('/product', { body: product });
  }

  async editProduct({ params, product }) {
    return this.httpClient.post(`/product/${params}`, { body: product });
  }

  async deleteProduct(params) {
    return this.httpClient.post(`/product/${params}`);
  }
}

export default new ProductService();
