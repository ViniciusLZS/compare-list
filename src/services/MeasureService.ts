import MeasureMapper from './mappers/MeasureMapper';
import HttpClient from './utils/HttpClient';

class MeasureService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
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
