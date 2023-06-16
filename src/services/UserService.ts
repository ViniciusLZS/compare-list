import UserMapper from './mappers/UserMapper';
import HttpClient from './utils/HttpClient';

class UserService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  login(user: {
    email: string
    password: string
  }) {
    return this.httpClient.post('/auth/login', { body: user });
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
}

export default new UserService();
