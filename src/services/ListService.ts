import HttpClient from './utils/HttpClient';

class ListService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listAll({ token, orderBy = 'ASC' }: {token: string; orderBy: string;}) {
    return this.httpClient.get(`/list/user?orderBy=${orderBy}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getList({ id, token }: {id: string; token: string;}) {
    return this.httpClient.get(`/list/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createList({ formData, token }:
    {
      formData: {
        name: string;
        estimated: string;
      };
      token: string;
    }) {
    return this.httpClient.post('/list', {
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async editList({ id, formData }: {id: string; formData: {
    name: string;
    estimated: number;
  };}) {
    return this.httpClient.post(`/list/${id}`, { body: formData });
  }

  async deleteList({ id, token }:{id: string; token: string }) {
    return this.httpClient.post(`/list/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ListService();
