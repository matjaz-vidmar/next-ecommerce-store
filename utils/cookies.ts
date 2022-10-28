import Cookies from 'js-cookie';

export function getParsedCookie(key: string): ProductCookieItem[] | undefined {
  const cookieValue = Cookies.get(key);

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue);
  } catch (err) {
    return undefined;
  }
}
type ProductCookieItem = {
  id: number;
  amount: number;
};
export function setStringifiedCookie(key: string, value: ProductCookieItem[]) {
  Cookies.set(key, JSON.stringify(value));
}
export function stringifyCookieValue(value: ProductCookieItem[]) {
  Cookies.set(key, JSON.stringify(value));
}
