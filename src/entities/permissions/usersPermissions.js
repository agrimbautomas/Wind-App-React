export class UsersPermissions {
	constructor(
		see,
		invite,
		editRole,
		destroy
	) {
		this.see = see;
		this.invite = invite;
		this.editRole = editRole;
		this.destroy = destroy;
	}
}

export const adminUsersPermissions = new UsersPermissions( true, true, true, true );
export const contributorUsersPermissions = new UsersPermissions( true, true, false, false );
export const memberUsersPermissions = new UsersPermissions( true, true, false, false );
export const viewOnlyUsersPermissions = new UsersPermissions( false, false, false, false );
