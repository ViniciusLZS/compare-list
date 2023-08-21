export default function baseURL() {
  const { DATABASE_URL } = process.env;
  const baseURLs = DATABASE_URL;

  return baseURLs;
}
