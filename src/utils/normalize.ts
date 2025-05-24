import { removeAccents } from './utils';
export function normalize(text: string) {
  return removeAccents(text.toLowerCase());
}
