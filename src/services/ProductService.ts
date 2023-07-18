import ProductMapper from './mappers/ProductMapper';
import HttpClient from './utils/HttpClient';
import baseURL from './utils/baseURL';

class ProductService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(baseURL());
  }

  async listProducts({
    id, orderBy = 'ASC', token, signal,
  }: {
    id: string; orderBy?: string; token: string; signal?: any;
  }) {
    const products = await this.httpClient.get(`/product/list/${id}?orderBy=${orderBy}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    return products.map(ProductMapper.toDomain);
  }

  async getProduct({ productId, token }: {productId: string; token: string}) {
    const product = await this.httpClient.get(`/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return ProductMapper.toDomain(product);
  }

  createProduct({ product, token }: {
    product: {
      name: string;
      value?: string;
      amount?: string;
      total?: string;
      measureId?: string;
      image?: string;
      listId: string;
    };
    token: string;
}) {
    const body = ProductMapper.toPersistence(product);

    return this.httpClient.post('/product', {
      body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateProduct({ productId, product, token }
    :{
      productId: string,
      product: {
        name: string;
        value?: string;
        amount?: string;
        total?: string;
        measuresId?: string;
        image?: string;
        listId: string;
      };
      token: string;
    }) {
    const body = ProductMapper.toPersistence(product);

    return this.httpClient.put(`/product/${productId}`, {
      body,
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
