import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import _ from "lodash";

import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatDividerModule } from "@angular/material/divider";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";

import { User, UserId } from "../../../@types/auth";
import { AuthService } from "../../auth.service";

@Component({
	selector: "naval-user-details",
	standalone: true,
	imports: [
		ReactiveFormsModule,
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
		MatAutocompleteModule
	],
	templateUrl: "./user-details.component.html",
	styleUrl: "./user-details.component.css"
})
export class UserDetailsComponent {
	protected user!: User;
	protected users!: User[];
	protected groups!: User[];
	protected userGroups!: User[];
	protected usersToUngroup!: User[];
	protected filteredUsersToGroup!: User[];
	protected filteredUsersToUngroup!: User[];
	protected noGroups = true;
	protected isLoading = false;
	protected selectedTab = 0;

	@ViewChild("userInput") userInput!: ElementRef<HTMLInputElement>;
	@ViewChild("groupInput") groupInput!: ElementRef<HTMLInputElement>;

	protected groupUserForm = new FormGroup({
		gid: new FormControl(""),
		uid: new FormControl("")
	});

	protected ungroupUserForm = new FormGroup({
		gid: new FormControl(""),
		uid: new FormControl("")
	});

	protected userUpdateForm = new FormGroup({
		name: new FormControl(""),
		username: new FormControl(""),
		email: new FormControl(""),
		active: new FormControl(),
		verified: new FormControl()
	});

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	@Input()
	set user_id(user_id: string) {
		this.isLoading = true;
		this.authService.getUsers().subscribe((users) => {
			const user = users.find((user) => user.uid === _.parseInt(user_id));
			this.users = users.filter((user) => user.uid !== _.parseInt(user_id));
			if (!user) {
				this.isLoading = false;
				return;
			} else {
				this.user = user;
				if (_.isArray(this.user.groups)) {
					this.noGroups = false;
					this.groups = this.users.filter((user) =>
						this.user.groups.includes(user.uid)
					);
					this.userGroups = this.users.filter(
						(user) => !this.user.groups.includes(user.uid)
					);
					this.usersToUngroup = this.users.filter((user) =>
						this.user.groups.includes(user.uid)
					);
					console.log("user: ", this.user);
					console.log("users to group: ", this.userGroups);
					console.log("users to ungroup :", this.usersToUngroup);
				}
			}
			this.isLoading = false;
		});
	}

	filterUsersToGroup() {
		const filterValue = this.userInput.nativeElement.value.toLowerCase();
		this.filteredUsersToGroup = this.userGroups.filter((user) =>
			user.name.toLowerCase().includes(filterValue)
		);
	}

	filterUsersToUngroup() {
		const filterValue = this.groupInput.nativeElement.value.toLowerCase();
		this.filteredUsersToUngroup = this.usersToUngroup.filter((user) =>
			user.name.toLowerCase().includes(filterValue)
		);
	}

	handleDeleteUser(): void {
		const uid: UserId = {
			uid: this.user.uid
		};
		this.authService.deleteUser(uid).subscribe(() => {
			this.router.navigate(["/users"]);
		});
	}

	handleUpdateUser(): void {
		const formValue = this.userUpdateForm.value;
		const user = {
			...this.user,
			..._.omitBy(
				_.omitBy(formValue, (v) => _.isNull(v)),
				(v) => _.isEmpty(v)
			)
		};
		this.authService.updateUser(user).subscribe((user) => {
			this.user = user;
		});
		this.userUpdateForm.reset();
		this.selectedTab = 0;
	}

	handleGroupUser() {
		this.groupUserForm.get("uid")?.setValue(_.toString(this.user.uid));
		const { uid, gid } = this.groupUserForm.value;
		if (uid && gid) {
			this.authService.groupUser(uid, gid).subscribe((res) => {
				const [responseObject] = res;
				// FIX: fix this
				// Add the user to the group. Add group(gid) to the userGroups
				const newGroup = this.users.find((user) => user.uid === responseObject.gid);
				this.usersToUngroup = [...this.usersToUngroup, newGroup!];
				// FIX: fix this
				this.userGroups = this.users.filter((user) => user.uid !== responseObject.gid);
				this.groupUserForm.get("gid")?.reset();
				this.selectedTab = 0;
				console.log("ok: ", res);
			});
		}
	}

	handleUngroupUser() {
		this.ungroupUserForm.get("uid")?.setValue(_.toString(this.user.uid));
		const { uid, gid } = this.ungroupUserForm.value;
		if (uid && gid) {
			this.authService.ungroupUser(uid, gid).subscribe((res) => {
				const [responseObject] = res;
				// FIX: fix this
				this.userGroups = this.users.filter((user) => user.uid !== responseObject.gid);
				const newGroup = this.users.find((user) => user.uid === responseObject.gid);
				this.usersToUngroup = [...this.userGroups, newGroup!];
				this.groupUserForm.get("gid")?.reset();
				this.selectedTab = 0;
				console.log("ok: ", res);
			});
		}
	}
}
