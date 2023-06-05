import HttpClient from './utils/HttpClient';

class CategoriesService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listAllCategories(token: string) {
    return this.httpClient.get('/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async listAllProducts({ name, categoriesId, token }
    :{name: string; categoriesId: string; token: string;}) {
    return this.httpClient.get(`/api/products/${categoriesId}/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new CategoriesService();
