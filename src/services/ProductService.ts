import HttpClient from './utils/HttpClient';

class ProductService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listProducts({ id, orderBy = 'ASC', token }: {
    id: string; orderBy: string; token: string;
  }) {
    return this.httpClient.get(`/product/list/${id}?orderBy=${orderBy}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // async getProduct(params) {
  //   return this.httpClint.get(`/product/${params}`);
  // }

  async createProduct({ formDatas, token }: {
    formDatas: {
      name: string;
      value?: string;
      amount?: string
      measuresId?: string;
      image?: string;
      listId: string;
    };
    token: string;
}) {
    return this.httpClient.post('/product', {
      body: formDatas,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // async editProduct({ params, product }) {
  //   return this.httpClient.post(`/product/${params}`, { body: product });
  // }

  // async deleteProduct(params) {
  //   return this.httpClient.post(`/product/${params}`);
  // }
}

export default new ProductService();
