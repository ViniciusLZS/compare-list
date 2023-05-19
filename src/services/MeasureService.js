import HttpClient from './utils/HttpClient';

class MeasureService {
  constructor() {
    this.httpClient = new HttpClient();
  }

  async listMeasures() {
    return this.httpClint.get('/measures');
  }
}

export default new MeasureService();
