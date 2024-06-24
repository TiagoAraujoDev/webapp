import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User, UserDTO } from "../@types/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private httpService: HttpClient) {}

  // TODO: add query string to the request
  getUsers(_query?: string): Observable<User[]> {
    return this.httpService.get<User[]>(
      "http://localhost:3000/api/models/users",
    );
  }

  getUser(user_id: string): Observable<User> {
    return this.httpService.get<User>(
      `http://localhost:3000/api/models/users/${user_id}`,
    );
  }

  updateUser(userDTO: UserDTO): Observable<User> {
    return this.httpService.patch<User>(
      `http://localhost:3000/api/models/users/${userDTO.user_id}`,
      userDTO,
    );
  }
}
