import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../@types/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpService: HttpClient) { }

  // TODO: add query string to the request
  getUsers(_query?: string) {
    return this.httpService.get<User[]>("http://localhost:3000/api/models/users");
  }
}
