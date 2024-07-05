import { Component, ElementRef, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { User } from "../../../@types/auth";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../auth.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

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
    MatProgressSpinnerModule,
  ],
  templateUrl: "./list-users.component.html",
  styleUrl: "./list-users.component.css",
})
export class ListUsersComponent {
  users!: MatTableDataSource<User, MatPaginator>;
  displayedColumns: string[] = [
    "uid",
    "name",
    "username",
    "email",
    "edit_button",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // TODO: Use @ViewChild to filter
  // @ViewChild("input") filterInput!: ElementRef<HTMLInputElement>;
  // protected filteredUsers!: User[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers().subscribe((users) => {
      this.users = new MatTableDataSource(users);
      this.users.paginator = this.paginator;
    });
  }

  filterUsers({ target }: Event) {
    /* const filterValue = this.filterInput.nativeElement.value.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(filterValue),
    ); */
    const inputElement = target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.users.filter = filterValue.trim().toLowerCase();
  }
}
