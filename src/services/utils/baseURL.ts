export default function baseURL() {
  const local = window.location.origin;
  let baseURLs = 'http://localhost:3001';
  if (local === 'http://localhost:3001') {
    baseURLs = 'http://localhost:3001';
  } else {
    baseURLs = 'http://192.168.18.7:3001';
  }

  return baseURLs;
}
