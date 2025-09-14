export const getFileNameFromUrl = (url: string): string => {
  return url.substring(url.lastIndexOf("/") + 1);
};
