import HttpClient from './utils/HttpClient';

class UserService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async login(user: {
    email: string
    password: string
  }) {
    return this.httpClient.post('/auth/login', { body: user });
  }

  async getUser(token: string) {
    return this.httpClient.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createUser(user: {
    name: string
    email: string
    password: string
  }) {
    return this.httpClient.post('/user', { body: user });
  }
}

export default new UserService();