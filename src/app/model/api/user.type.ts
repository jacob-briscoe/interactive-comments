export type UserApi = {
  username: string;
  image: {
    png: string;
    webp: string;
  };
};

export type UserApiRequest = {
  username: string;
};

export type UserApiResponse = {
  user: UserApi | null;
};
