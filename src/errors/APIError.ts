interface APIErrorResponse {
  status: number;
  statusText: string;
}

export default class APIError extends Error {
  response: APIErrorResponse;

  constructor(response: APIErrorResponse, body: any) {
    super();

    this.name = 'APIError';
    this.response = response;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}
