import HttpClient from './utils/HttpClient';

class ListService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listAll({ token, orderBy = 'ASC' }) {
    return this.httpClient.get(`/list/user?orderBy=${orderBy}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getList(id) {
    return this.httpClint.get(`/user/${id}`);
  }

  async createList({ formData, token }) {
    return this.httpClient.post('/list', {
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async editList({ id, list }) {
    return this.httpClient.post(`/list/${id}`, { body: list });
  }

  async deleteList(id) {
    return this.httpClient.post(`/list/${id}`);
  }
}

export default new ListService();
