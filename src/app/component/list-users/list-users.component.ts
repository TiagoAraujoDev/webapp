import { Component } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { User } from "../../../@types/user";
import { UsersService } from "../../users.service";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "naval-list-users",
  standalone: true,
  imports: [MatTableModule, MatIconModule, HttpClientModule],
  templateUrl: "./list-users.component.html",
  styleUrl: "./list-users.component.css",
})
export class ListUsersComponent {
  users!: User[];
  displayedColumns: string[] = ["user_id", "fullname", "username", "email"];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
