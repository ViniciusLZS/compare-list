class ListService {
  async listProducts(params) {
    const response = await fetch(`https://64530c54bce0b0a0f7547089.mockapi.io/comparelist/v1/newlist/${params.id}/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  }
}

export default new ListService();
