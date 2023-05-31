import { promises } from 'dns';

export default function delay(ms = 1000): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(), ms);
    } catch (error) {
      reject();
    }
  });
}
