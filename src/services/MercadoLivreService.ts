import HttpClient from './utils/HttpClient';
import baseURL from './utils/baseURL';

class CategoriesService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(baseURL());
  }

  listAllCategories(token: string) {
    return this.httpClient.get('/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  listAllProducts({ name, categoriesId, token }
    :{name: string; categoriesId: string; token: string;}) {
    return this.httpClient.get(`/api/products/${categoriesId}/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new CategoriesService();
