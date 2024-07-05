import { CommonModule } from "@angular/common";
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import _ from "lodash";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { AuthService } from "../../auth.service";
import { Org, OrgId, Role, User } from "../../../@types/auth";
import { Router, RouterModule } from "@angular/router";
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@Component({
  selector: "naval-org-details",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: "./org-details.component.html",
  styleUrl: "./org-details.component.css",
})
export class OrgDetailsComponent {
  protected org!: Org;
  protected id!: string;
  protected roles!: Role[];
  protected users!: User[];
  protected filteredUsers!: User[];

  @ViewChild("userInput") userInput!: ElementRef<HTMLInputElement>;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.authService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  @Input()
  set org_id(org_id: string) {
    const o = { oid: _.parseInt(org_id) };
    this.authService.getOrg(o).subscribe((org) => {
      this.org = org;
      this.id = org_id;
    });
  }

  protected enrollForm = new FormGroup({
    uid: new FormControl(""),
    oid: new FormControl(""),
    role: new FormControl<Role>({ role: "" }),
  });

  protected orgUpdateForm = new FormGroup({
    name: new FormControl(""),
    cnpj: new FormControl(""),
  });

  filterUsers() {
    const filterValue = this.userInput.nativeElement.value.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(filterValue),
    );
  }

  handleDeleteOrg(): void {
    // BUG: Still not working - Error 500
    const oid: OrgId = {
      oid: _.parseInt(this.id),
    };
    this.authService.deleteOrg(oid).subscribe(() => {
      this.router.navigate(["/orgs"]);
    });
  }

  handleUpdateOrg(): void {
    const formValue = this.orgUpdateForm.value;
    const org = {
      ...this.org,
      ..._.omitBy(formValue, (v) => _.isEmpty(v)),
    };
    this.authService.updateOrg(org).subscribe((org) => {
      this.org = org;
    });

    this.orgUpdateForm.reset();
  }

  handleEnrollUser() {
    this.enrollForm.get("oid")?.setValue(this.id);
    const { oid, uid, role } = this.enrollForm.value;
    if (uid && role?.role && oid) {
      this.authService.enrollUser(oid, uid, role).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
