import HttpClient from './utils/HttpClient';

class UserService {
  constructor() {
    this.httpClint = new HttpClient('https://64530c54bce0b0a0f7547089.mockapi.io');
  }

  async getUser(id) {
    return this.httpClint.get(`/user/${id}`);
  }

  async createUser(user) {
    return this.httpClint.post('/user', { body: user });
  }
}

export default new UserService();
