import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Org } from '../../../@types/auth';

@Component({
  selector: 'naval-org-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    RouterLink,
  ],
  templateUrl: './org-list.component.html',
  styleUrl: './org-list.component.css'
})
export class OrgListComponent implements AfterViewInit {
  orgs!: MatTableDataSource<Org, MatPaginator>;
  displayedColumns: string[] = [
    "oid",
    "name",
    "active",
    "cnpj",
    "edit_button",
  ];

  constructor(private authService: AuthService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.orgs.paginator = this.paginator;
  }

  ngOnInit() {
    this.authService.getOrgs().subscribe((orgs) => {
      this.orgs = new MatTableDataSource(orgs);
    });
  }

  filterUsers({ target }: Event) {
    const inputElement = target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.orgs.filter = filterValue.trim().toLowerCase();
  }

}
