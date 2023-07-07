import MeasureMapper from './mappers/MeasureMapper';
import HttpClient from './utils/HttpClient';
import baseURL from './utils/baseURL';

class MeasureService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(baseURL());
  }

  async listMeasures(token: string) {
    const measures = await this.httpClient.get('/measure', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return measures.map(MeasureMapper.toDomain);
  }
}

export default new MeasureService();
