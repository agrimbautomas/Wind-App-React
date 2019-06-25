export class TasksPermissions {
	constructor(
		see,
		add
	) {
		this.see = see;
		this.add = add;
	}
}

export const adminTasksPermissions = new TasksPermissions( true, true );
export const contributorTasksPermissions = new TasksPermissions( true, true );
export const memberTasksPermissions = new TasksPermissions( true, true );
export const viewOnlyTasksPermissions = new TasksPermissions( false, false );

