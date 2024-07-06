import { Component, ViewChild } from "@angular/core";
import { RouterLink } from "@angular/router";

import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { User } from "../../../@types/auth";
import { AuthService } from "../../auth.service";

@Component({
  selector: "naval-list-users",
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  templateUrl: "./list-users.component.html",
  styleUrl: "./list-users.component.css"
})
export class ListUsersComponent {
  protected users!: MatTableDataSource<User, MatPaginator>;
  protected displayedColumns: string[] = [
    "uid",
    "name",
    "username",
    "email",
    "edit_button"
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private authService: AuthService) {}

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
