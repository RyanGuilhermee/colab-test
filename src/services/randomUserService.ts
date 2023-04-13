const baseUrl = 'https://randomuser.me/api';

export type RandomUser = {
  results: any[];
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
};

export const getUsers = async (query: string = ''): Promise<RandomUser> => {
  const response = await fetch(`${baseUrl}/?results=12&${query}`);
  const data = await response.json();

  return data;
};
