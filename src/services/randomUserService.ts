const baseUrl = 'https://randomuser.me/api';

export type RandomUser = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

export type RandomUserResults = {
  results: RandomUser[];
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
};

export const getUsers = async (query: string = ''): Promise<RandomUserResults> => {
  const response = await fetch(`${baseUrl}/?results=12&${query}`);
  const data = await response.json();

  return data;
};
