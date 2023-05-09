class StoreService {
  async listsStore() {
    const response = await fetch('https://64530c54bce0b0a0f7547089.mockapi.io/comparelist/v1/newlist', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  }

  async listStore(params) {
    const response = await fetch(`https://64530c54bce0b0a0f7547089.mockapi.io/comparelist/v1/newlist/${params.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  }

  async createStore(formData) {
    const response = await fetch('https://64530c54bce0b0a0f7547089.mockapi.io/comparelist/v1/newlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return response.json();
  }
}

export default new StoreService();
