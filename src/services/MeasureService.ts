import HttpClient from './utils/HttpClient';

class MeasureService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('');
  }

  // async listMeasures() {
  //   return this.httpClient.get('/measures');
  // }
}

export default new MeasureService();
