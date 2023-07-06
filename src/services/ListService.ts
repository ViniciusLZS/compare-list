import ListMapper from './mappers/ListMapper';
import HttpClient from './utils/HttpClient';

class ListService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listAll({ token, orderBy = 'created_at' }: {token: string; orderBy: string;}) {
    const lists = await this.httpClient.get(`/list/user?orderBy=${orderBy}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return lists.map(ListMapper.toDomain);
  }

  async getList({ id, token }: {id: string; token: string;}) {
    const list = await this.httpClient.get(`/list/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return ListMapper.toDomain(list);
  }

  createList({ list, token }:
    {
      list: {
        name: string;
        estimated: string;
      };
      token: string;
    }) {
    const body = ListMapper.toPersistence(list);
    return this.httpClient.post('/list', {
      body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  editList({ formData, token, id }:
    {
      formData: {
        name: string;
        estimated: string;
      };
      token: string;
      id: string;
    }) {
    const body = ListMapper.toPersistence(formData);
    return this.httpClient.put(`/list/${id}`, {
      body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteList({ id, token }:{id: string; token: string }) {
    return this.httpClient.delete(`/list/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ListService();
