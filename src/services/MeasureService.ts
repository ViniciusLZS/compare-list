import MeasureMapper from './mappers/MeasureMapper';
import HttpClient from './utils/HttpClient';
import baseURL from './utils/baseURL';

class MeasureService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(baseURL());
  }

  async listMeasures(token: string, signal?: any) {
    const measures = await this.httpClient.get('/measure', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    return measures.map(MeasureMapper.toDomain);
  }
}

export default new MeasureService();
