export default function baseURL() {
  const DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

  const baseURLs = String(DATABASE_URL);

  return baseURLs;
}
