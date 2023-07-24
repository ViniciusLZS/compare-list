import UserMapper from './mappers/UserMapper';
import HttpClient from './utils/HttpClient';
import baseURL from './utils/baseURL';

class UserService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(baseURL());
  }

  login(user: {
    email: string
    password: string
  }) {
    return this.httpClient.post('/auth/login', { body: user });
  }

  loginWithGoogle(user: {photo: string; email: string ; name: string; sub: string }) {
    return this.httpClient.post('/auth/google', { body: user });
  }

  async getUser(token: string) {
    const user = await this.httpClient.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return UserMapper.toDomain(user);
  }

  createUser(user: {
    name: string
    email: string
    password: string
  }) {
    const body = UserMapper.toPersistence(user);
    return this.httpClient.post('/user', { body });
  }

  async UpdateData(token: string, data: {name: string; email: string;}) {
    const user = await this.httpClient.put('/user/update/data', {
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return UserMapper.toDomain(user);
  }

  async UpdatePhoto(token: string, photo: string) {
    const user = await this.httpClient.put('/user/update/photo', {
      body: { photo },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return UserMapper.toDomain(user);
  }
}

export default new UserService();
