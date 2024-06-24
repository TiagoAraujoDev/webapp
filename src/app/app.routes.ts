import { Routes } from "@angular/router";
import { ListUsersComponent } from "./component/list-users/list-users.component";
import { UserDetailsComponent } from "./component/user-details/user-details.component";

export const routes: Routes = [
  { path: "", redirectTo: "users", pathMatch: "full" },
  { path: "users", component: ListUsersComponent },
  { path: "user/:user_id", component: UserDetailsComponent },
];
