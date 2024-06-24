import { Component } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { User } from "../../../@types/user";
import { UsersService } from "../../users.service";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { RouterLink } from "@angular/router";

@Component({
  selector: "naval-list-users",
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: "./list-users.component.html",
  styleUrl: "./list-users.component.css",
})
export class ListUsersComponent {
  users!: MatTableDataSource<User, MatPaginator>;
  displayedColumns: string[] = [
    "user_id",
    "fullname",
    "username",
    "email",
    "edit_button",
  ];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = new MatTableDataSource(users);
    });
  }

  filterUsers({ target }: Event) {
    const inputElement = target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.users.filter = filterValue.trim().toLowerCase();
  }
}
