import HttpClient from './utils/HttpClient';

class ListService {
  constructor() {
    this.httpClient = new HttpClient();
  }

  async listAll(orderBy = 'ASC') {
    return this.httpClient.get(`/list?orderBy=${orderBy}`);
  }

  async getList(id) {
    return this.httpClint.get(`/user/${id}`);
  }

  async createList(list) {
    return this.httpClient.post('/list', { body: list });
  }

  async editList({ id, list }) {
    return this.httpClient.post(`/list/${id}`, { body: list });
  }

  async deleteList(id) {
    return this.httpClient.post(`/list/${id}`);
  }
}

export default new ListService();
