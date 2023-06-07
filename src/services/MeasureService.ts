import HttpClient from './utils/HttpClient';

class MeasureService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listMeasures(token: string) {
    return this.httpClient.get('/measure', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new MeasureService();
