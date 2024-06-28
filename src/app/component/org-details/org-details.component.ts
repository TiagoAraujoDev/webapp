import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import _ from "lodash";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { AuthService } from "../../auth.service";
import { Org } from "../../../@types/auth";

@Component({
  selector: 'naval-org-details',
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
  ],
  templateUrl: './org-details.component.html',
  styleUrl: './org-details.component.css'
})
export class OrgDetailsComponent {
  protected org!: Org;
  protected id!: string;

  constructor(private authService: AuthService) {}

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
    // TODO: Add call to DELETE /auth/orgs/:oid
    console.log(this.id);
  }

  handleUpdateOrg(event: Event): void {
    event.preventDefault();
    const formValue = this.orgUpdateForm.value;
    const org = {
      ..._.omitBy(_.omitBy(formValue, (v) => _.isNull(v)), (v) => _.isEmpty(v)),
      ...this.org
    };
    this.authService
      .updateOrg(org)
      .subscribe((org) => {
        this.org = org;
      });
  }
}
