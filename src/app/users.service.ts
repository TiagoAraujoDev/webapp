import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import _ from "lodash";

import { User, UserDTO } from "../@types/user";
import { Role } from "../@types/role";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private baseUrl = "https://api.nyxk.com.br";
  constructor(private httpService: HttpClient) {}

  // TODO: add query string to the request
  getUsers(_query?: string): Observable<User[]> {
    return this.httpService.get<User[]>(`${this.baseUrl}/auth/users`);
  }

  getUser(uid: string): Observable<User> {
    return this.httpService.get<User>(`${this.baseUrl}/auth/users/${uid}`);
  }

  updateUser(userDTO: UserDTO, uid: number): Observable<User> {
    const user = _.omitBy(userDTO, _.isEmpty());
    return this.httpService.patch<User>(
      `${this.baseUrl}/auth/users/${uid}`,
      user,
    );
  }

  // WARN: Move this method to role service
  getRoles(): Observable<Role[]> {
    return this.httpService.get<Role[]>(`${this.baseUrl}/auth/roles`);
  }
}
