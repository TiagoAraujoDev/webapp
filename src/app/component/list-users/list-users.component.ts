import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { User } from "../../../@types/auth";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../auth.service";

@Component({
  selector: "naval-list-users",
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    RouterLink,
  ],
  templateUrl: "./list-users.component.html",
  styleUrl: "./list-users.component.css",
})
export class ListUsersComponent {
  title = "Tiago";
  info = {
    name: "tam",
    email: "tma@gmail.com"
  }
  users!: MatTableDataSource<User, MatPaginator>;
  displayedColumns: string[] = [
    "uid",
    "name",
    "username",
    "email",
    "edit_button",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers().subscribe((users) => {
      this.users = new MatTableDataSource(users);
      this.users.paginator = this.paginator;
    });
  }

  filterUsers({ target }: Event) {
    const inputElement = target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.users.filter = filterValue.trim().toLowerCase();
  }
}
