import ProductMapper from './mappers/ProductMapper';
import HttpClient from './utils/HttpClient';

class ProductService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listProducts({ id, orderBy = 'ASC', token }: {
    id: string; orderBy: string; token: string;
  }) {
    const products = await this.httpClient.get(`/product/list/${id}?orderBy=${orderBy}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
