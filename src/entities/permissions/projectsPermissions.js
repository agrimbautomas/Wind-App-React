export class ProjectsPermissions {
	constructor(
		add,
		edit,
		destroy,
		archive,
		see,
		share
	) {
		this.add = add;
		this.edit = edit;
		this.destroy = destroy;
		this.archive = archive;
		this.see = see;
		this.share = share;
	}
}

export const adminProjectsPermissions = new ProjectsPermissions(
	true,
	true,
	true,
	true,
	true,
	true
);

export const contributorProjectsPermissions = new ProjectsPermissions(
	false,
	true,
	false,
	false,
	true,
	true
);

export const memberProjectsPermissions = new ProjectsPermissions(
	false,
	false,
	false,
	false,
	true,
	true
);

export const viewOnlyProjectsPermissions = new ProjectsPermissions(
	false,
	false,
	false,
	false,
	true,
	false
);

