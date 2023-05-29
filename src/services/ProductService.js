import HttpClient from './utils/HttpClient';

class ProductService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listProducts({ id, orderBy = 'ASC', token }) {
    return this.httpClient.get(`/product/list/${id}?orderBy=${orderBy}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
