import HttpClient from './utils/HttpClient';

class UserService {
  constructor() {
    this.httpClint = new HttpClient('http://localhost:3001');
  }

  async login(user) {
    return this.httpClint.post('/auth/login', { body: user });
  }

  async getUser(token) {
    return this.httpClint.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createUser(user) {
    return this.httpClint.post('/user', { body: user });
  }
}

export default new UserService();
