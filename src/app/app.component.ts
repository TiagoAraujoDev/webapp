import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./component/header/header.component";
import { ListUsersComponent } from "./component/list-users/list-users.component";
import { UsersService } from "./users.service";

@Component({
  selector: "naval-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ListUsersComponent],
  providers: [UsersService],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
