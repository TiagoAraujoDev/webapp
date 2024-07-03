import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import _ from "lodash";

import {
  Perm,
  Org,
  User,
  OrgId,
  UserId,
  OrgData,
  UserData,
  Role,
} from "../@types/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "https://api.nyxk.com.br";
  constructor(private httpService: HttpClient) {}

  /////////////////////////////////////////////////////////////////////////////
  // USERS ////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  getUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(`${this.baseUrl}/auth/users`);
  }

  getUser(user: UserId): Observable<User> {
    return this.httpService.get<User>(`${this.baseUrl}/auth/users/${user.uid}`);
  }

  createUser(user: UserData): Observable<User> {
    return this.httpService.post<User>(`${this.baseUrl}/auth/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpService.patch<User>(
      `${this.baseUrl}/auth/users/${user.uid}`,
      user,
    );
  }

  deleteUser(user: UserId): Observable<User> {
    return this.httpService.delete<User>(
      `${this.baseUrl}/auth/users/${user.uid}`,
    );
  }

  enrollUser(uid: string, oid: string, role: Role): Observable<any> {
    const _uid = _.parseInt(uid);
    const body = {
      oid: _.parseInt(oid),
      role: role.role,
    };
    return this.httpService.put<any>(
      `${this.baseUrl}/auth/users/${_uid}/enroll`,
      {
        body,
      },
    );
  }

  detachUser(uid: string, oid: string, role: Role): Observable<any> {
    const _uid = _.parseInt(uid);
    const _oid = _.parseInt(oid);
    return this.httpService.delete<any>(
      `${this.baseUrl}/auth/users/${_uid}/enroll/${_oid}/${role.role}`,
    );
  }

  /////////////////////////////////////////////////////////////////////////////
  // ORGS /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  getOrgs(): Observable<Org[]> {
    return this.httpService.get<Org[]>(`${this.baseUrl}/auth/orgs`);
  }

  getOrg(org: OrgId): Observable<Org> {
    return this.httpService.get<Org>(`${this.baseUrl}/auth/orgs/${org.oid}`);
  }

  createOrg(org: OrgData): Observable<Org> {
    return this.httpService.post<Org>(`${this.baseUrl}/auth/orgs`, org);
  }

  updateOrg(org: Org): Observable<Org> {
    return this.httpService.patch<Org>(
      `${this.baseUrl}/auth/orgs/${org.oid}`,
      org,
    );
  }

  deleteOrg(org: OrgId): Observable<Org> {
    return this.httpService.delete<Org>(`${this.baseUrl}/auth/orgs/${org.oid}`);
  }

  /////////////////////////////////////////////////////////////////////////////
  // ROLES ////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  getRoles(): Observable<Role[]> {
    return this.httpService.get<Role[]>(`${this.baseUrl}/auth/roles`);
  }

  createRole(role: Role): Observable<Role> {
    return this.httpService.post<Role>(`${this.baseUrl}/auth/roles`, role);
  }

  deleteRole(role: Role): Observable<Role> {
    return this.httpService.delete<Role>(
      `${this.baseUrl}/auth/roles/${role.role}`,
    );
  }

  /////////////////////////////////////////////////////////////////////////////
  // PERMS ////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  getPerms(): Observable<Perm[]> {
    return this.httpService.get<Perm[]>(`${this.baseUrl}/auth/perms`);
  }

  createPerm(perm: Perm): Observable<Perm> {
    return this.httpService.post<Perm>(`${this.baseUrl}/auth/perms`, perm);
  }

  deletePerm(perm: Perm): Observable<Perm> {
    console.log(perm.perm);
    return this.httpService.delete<Perm>(
      `${this.baseUrl}/auth/perms/${perm.perm}`,
    );
  }
}
