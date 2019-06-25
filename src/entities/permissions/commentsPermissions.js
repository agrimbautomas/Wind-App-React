export class CommentsPermissions {
	constructor(
		see,
		add,
		destroy
	) {
		this.see = see;
		this.add = add;
		this.destroy = destroy;
	}
}

export const adminCommentsPermissions = new CommentsPermissions( true, true, true );
export const contributorCommentsPermissions = new CommentsPermissions( true, true, false );
export const memberCommentsPermissions = new CommentsPermissions( true, true, false );
export const viewOnlyCommentsPermissions = new CommentsPermissions( false, false, false );
