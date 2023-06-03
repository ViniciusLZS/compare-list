import HttpClient from './utils/HttpClient';

class CategoriesService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listAll(token: string) {
    return this.httpClient.get('/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // async getList({ id, token }: {id: string; token: string;}) {
  //   return this.httpClient.get(`/list/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }
}

export default new CategoriesService();
