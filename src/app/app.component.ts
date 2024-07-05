import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { UserDetailsComponent } from "./component/user-details/user-details.component";
import { HeaderComponent } from "./component/header/header.component";
import { ListUsersComponent } from "./component/list-users/list-users.component";

import { AuthService } from "./auth.service";

@Component({
  selector: "naval-root",
  standalone: true,
  imports: [
    // Angular modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet,
    // Components
    HeaderComponent,
    ListUsersComponent,
    UserDetailsComponent,
  ],
  providers: [AuthService],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent { }
