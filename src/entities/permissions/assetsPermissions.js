export class AssetsPermissions {
	constructor(
		see,
		upload,
		destroy,
		approve,
		seeVersions,
		filter
	) {
		this.see = see;
		this.upload = upload;
		this.destroy = destroy;
		this.approve = approve;
		this.seeVersions = seeVersions;
		this.filter = filter;
	}
}

export const adminAssetsPermissions = new AssetsPermissions(
	true, true, true, true, true, true
);
export const contributorAssetsPermissions = new AssetsPermissions(
	true, true, true, true, true, true
);
export const memberAssetsPermissions = new AssetsPermissions(
	true, false, false, false, true, true
);
export const viewOnlyAssetsPermissions = new AssetsPermissions(
	true, false, false, false, false, false
);
