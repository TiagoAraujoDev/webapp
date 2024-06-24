type User = {
  created_at: string;
  email: string;
  fullname: string;
  password: string;
  phone: string;
  user_id: number;
  username: string;
};

type UserDTO = Partial<
  Pick<User, "user_id" | "fullname" | "email" | "phone" | "username">
>;

export { User, UserDTO };
