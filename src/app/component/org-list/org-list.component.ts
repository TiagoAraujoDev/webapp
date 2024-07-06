import { Component, ViewChild } from "@angular/core";
import { RouterLink } from "@angular/router";

import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { Org } from "../../../@types/auth";
import { AuthService } from "../../auth.service";

@Component({
  selector: "naval-org-list",
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
  templateUrl: "./org-list.component.html",
  styleUrl: "./org-list.component.css"
})
export class OrgListComponent {
  orgs!: MatTableDataSource<Org, MatPaginator>;
  displayedColumns: string[] = ["oid", "name", "active", "cnpj", "edit_button"];

  constructor(private authService: AuthService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.authService.getOrgs().subscribe((orgs) => {
      this.orgs = new MatTableDataSource(orgs);
      this.orgs.paginator = this.paginator;
    });
  }

  filterUsers({ target }: Event) {
    const inputElement = target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.orgs.filter = filterValue.trim().toLowerCase();
  }
}
