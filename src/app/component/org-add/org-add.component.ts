import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Org, OrgData } from '../../../@types/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'naval-org-add',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './org-add.component.html',
  styleUrl: './org-add.component.css'
})
export class OrgAddComponent {
 protected org: Org | null = null;

  constructor(private authService: AuthService) {}

  protected addOrgForm = new FormGroup({
    name: new FormControl(""),
    cnpj: new FormControl(""),
    picture: new FormControl(""),
  });

  handleAddOrg(event: Event) {
    event.preventDefault()
    // console.log(this.addUserForm.value)
    this.authService.createOrg(this.addOrgForm.value as OrgData).subscribe(org => {
      this.org = org;
    });
  }
}
