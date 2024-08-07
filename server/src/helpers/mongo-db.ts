export const getMongoDBUrl = (url: string, username: string, password: string) => {
  return url?.replace('{username}', username)?.replace('{password}', password);
};
