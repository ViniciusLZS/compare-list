import HttpClient from './utils/HttpClient';

class ProductService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listProducts({ id, orderBy = 'ASC', token }: {
    id: string; orderBy: string; token: string;
  }) {
    return this.httpClient.get(`/product/list/${id}?orderBy=${orderBy}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getProduct({ productId, token }: {productId: string; token: string}) {
    return this.httpClient.get(`/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createProduct({ formDatas, token }: {
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

  updateProduct({ productId, formDatas, token }
    :{
      productId: string,
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
    return this.httpClient.put(`/product/${productId}`, {
      body: formDatas,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteProduct(id: string, token: string) {
    return this.httpClient.delete(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ProductService();
