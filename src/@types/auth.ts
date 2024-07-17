export interface Role {
  role: string;
}

export interface Perm {
  perm: string;
}

/// User types
export interface User {
  uid: number;
  username: string;
  email: string;
  name: string;
  groups: number[];
  roles: { org: number; role: string }[];
  picture: string;
  verified: boolean;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type UserId = Pick<User, "uid">;

export type UserData = Omit<User, "uid" | "created_at" | "updated_at">;

/// Organization types
export interface Org {
  oid: number;
  cnpj: string;
  id_type: string;
  name: string;
  roles: { role: string; user: number }[];
  picture?: string | null;
}

export type OrgId = Pick<Org, "oid">;

export type OrgData = Omit<Org, "oid">;

export type GroupUserResponse = {
  uid: number;
  gid: number;
  created_at: Date;
};

export type EnrollToOrgResponse = {
  uid: number;
  oid: number;
  role: string;
  eid: number;
  active: boolean;
  created_at: Date;
  valid_since: Date;
  valid_until: Date | null;
};
