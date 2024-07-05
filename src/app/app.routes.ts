import {Routes} from "@angular/router";
import {ListUsersComponent} from "./component/list-users/list-users.component";
import {UserDetailsComponent} from "./component/user-details/user-details.component";
import {OrgListComponent} from "./component/org-list/org-list.component";
import {OrgDetailsComponent} from "./component/org-details/org-details.component";
import {UserAddComponent} from "./component/user-add/user-add.component";
import {OrgAddComponent} from "./component/org-add/org-add.component";
import {RolePermsComponent} from "./component/role-perms/role-perms.component";

export const routes: Routes = [
  {path: "", redirectTo: "users", pathMatch: "full"},
  {path: "orgs", component: OrgListComponent},
  {path: "users", component: ListUsersComponent},
  {path: "user/create", component: UserAddComponent},
  {path: "org/create", component: OrgAddComponent},
  {path: "user/:user_id", component: UserDetailsComponent},
  {path: "org/:org_id", component: OrgDetailsComponent},
  {path: "roles-perms", component: RolePermsComponent}
];
