import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import _ from "lodash";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { AuthService } from "../../auth.service";
import { Org, OrgId } from "../../../@types/auth";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "naval-org-details",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    RouterModule,
  ],
  templateUrl: "./org-details.component.html",
  styleUrl: "./org-details.component.css",
})
export class OrgDetailsComponent {
  protected org!: Org;
  protected id!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  @Input()
  set org_id(org_id: string) {
    const o = { oid: _.parseInt(org_id) };
    this.authService.getOrg(o).subscribe((org) => {
      this.org = org;
      this.id = org_id;
    });
  }

  protected orgUpdateForm = new FormGroup({
    name: new FormControl(""),
    cnpj: new FormControl(""),
  });

  handleDeleteOrg(): void {
    // BUG: Still not working - Error 500
    const oid: OrgId = {
      oid: _.parseInt(this.id),
    };
    this.authService.deleteOrg(oid).subscribe(() => {
      this.router.navigate(["/orgs"]);
    });
  }

  handleUpdateOrg(event: Event): void {
    event.preventDefault();
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
}
