import validUrl from 'valid-url';

export const isUrlValid = (url: string): boolean => {
  if (validUrl.isUri(url)) {
    return true;
  }
  return false;
};
