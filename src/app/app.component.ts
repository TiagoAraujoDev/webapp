import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./component/header/header.component";
import { ListUsersComponent } from "./component/list-users/list-users.component";
import { CommonModule } from "@angular/common";
import { UserDetailsComponent } from "./component/user-details/user-details.component";
import { AuthService } from "./auth.service";

@Component({
  selector: "naval-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    ListUsersComponent,
    UserDetailsComponent,
  ],
  providers: [AuthService],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent { }
