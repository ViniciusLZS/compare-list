import HttpClient from './utils/HttpClient';

class ListService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listAll({ token, orderBy = 'created_at' }: {token: string; orderBy: string;}) {
    return this.httpClient.get(`/list/user?orderBy=${orderBy}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getList({ id, token }: {id: string; token: string;}) {
    return this.httpClient.get(`/list/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createList({ formData, token }:
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

  editList({ id, formData }: {id: string; formData: {
    name: string;
    estimated: number;
  };}) {
    return this.httpClient.post(`/list/${id}`, { body: formData });
  }

  deleteList({ id, token }:{id: string; token: string }) {
    return this.httpClient.post(`/list/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ListService();
