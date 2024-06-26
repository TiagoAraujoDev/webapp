type User = {
  email: string;
  username: string;
  verified: boolean;
  uid: number;
  name: string;
  active: boolean;
  picture: string;
  created_at: string;
  updated_at: string;
};

type UserDTO = {
  username?: string | null;
  fullname?: string | null;
  phone?: string | null;
  email?: string | null;
}

export { User, UserDTO };
