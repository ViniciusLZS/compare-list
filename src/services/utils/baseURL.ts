export default function baseURL() {
  const DATABASE_URL = process.env.REACT_APP_NOT_SECRET_CODE;

  const baseURLs = DATABASE_URL!.toString();

  return baseURLs;
}
