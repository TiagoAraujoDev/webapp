import { Routes } from "@angular/router";
import { ListUsersComponent } from "./component/list-users/list-users.component";
import { UserDetailsComponent } from "./component/user-details/user-details.component";
import { OrgListComponent } from "./component/org-list/org-list.component";
import { OrgDetailsComponent } from "./component/org-details/org-details.component";

export const routes: Routes = [
  { path: "", redirectTo: "users", pathMatch: "full" },
  { path: "orgs", component: OrgListComponent },
  { path: "users", component: ListUsersComponent },
  { path: "user/:user_id", component: UserDetailsComponent },
  { path: "org/:org_id", component: OrgDetailsComponent },
];
