import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class OrgsService {
  private baseUrl = "https://api.nyxk.com.br";
  constructor(private httpService: HttpClient) {}

  // TODO: add query string to the request
  getOrgs(_query?: string): Observable<any> {
    return this.httpService.get(`${this.baseUrl}/auth/orgs`);
  }

  /* getOrg(uid: string): Observable<Org> {
    return this.httpService.get<Org>(`${this.baseUrl} / auth / Orgs / ${uid}`);
  }

  updateOrg(OrgDTO: OrgDTO, uid: number): Observable<Org> {
    const user = _.omitBy(userDTO, _.isEmpty());
    return this.httpService.patch<Org>(
      `${this.baseUrl} / auth / Orgs / ${uid}`,
      user,
    );
  } */

}
