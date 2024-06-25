type User = {
  created_at: string;
  email: string;
  fullname: string;
  password: string;
  phone: string;
  user_id: number;
  username: string;
};

interface UserDTO {
  username?: string | null;
  fullname?: string | null;
  phone?: string | null;
  email?: string | null;
}

export { User, UserDTO };
