import ImmutableEntity from './immutableEntity';

export default class Project extends ImmutableEntity {
	/**
	 * @param {number} id Project id
	 * @param {string} name display name
	 * @param {string} description
	 * @param {string} clientName
	 * @param {string} primaryContact
	 * @param {string} coverImageURL
	 * @param {number} coverAssetID asset that contains the cover image url of the project
	 * @param {'active'|'archived'} status
	 * @param {string} shareHash
	 * @param {boolean} hasNewComments
	 * @param {boolean} hasMarkups
	 * @param {boolean} hasRushPriority
	 * @param {boolean} hasNewAssets
	 * @param {boolean} isNew
	 * @param {Date} startDate
	 * @param {Date} dueDate
	 * @param {Date} createdAt
	 * @param {Date} updatedAt
	 */
	constructor(
		id,
		name,
		description,
		clientName,
		primaryContact,
		coverImageURL,
		coverAssetID,
		status,
		shareHash,
		currentUserRoleName,
		hasNewComments,
		hasMarkups,
		hasRushPriority,
		hasNewAssets,
		isNew,
		startDate,
		dueDate,
		createdAt,
		updatedAt
	) {
		super();

		this.id = id;
		this.name = name;
		this.description = description;
		this.clientName = clientName;
		this.primaryContact = primaryContact;
		this.coverImageURL = coverImageURL;
		this.coverAssetID = coverAssetID;
		this.status = status;
		this.shareHash = shareHash;
		this.currentUserRoleName = currentUserRoleName || 'view_only';
		this.hasNewComments = hasNewComments;
		this.hasMarkups = hasMarkups;
		this.hasRushPriority = hasRushPriority;
		this.hasNewAssets = hasNewAssets;
		this.isNew = isNew;
		this.startDate = startDate;
		this.dueDate = dueDate;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	get userPermissions() { return this.currentUserRole.permissions; }

	withName( name ) {
		return this.set( 'name', name );
	}

	markArchived() {
		return this.set( 'status', 'archived' );
	}

	markActive() {
		return this.set( 'status', 'active' );
	}

	setRushPriority() {
		return this.set( 'hasRushPriority', true );
	}

	unsetRushPriority() {
		return this.set( 'hasRushPriority', false );
	}

	unmarkAsNew() {
		return this.set( 'isNew', false );
	}

	clone() {
		return new Project(
			this.id,
			this.name,
			this.description,
			this.clientName,
			this.primaryContact,
			this.coverImageURL,
			this.coverAssetID,
			this.status,
			this.shareHash,
			this.hasNewComments,
			this.hasMarkups,
			this.hasRushPriority,
			this.hasNewAssets,
			this.isNew,
			this.startDate,
			this.dueDate,
			this.createdAt,
			this.updatedAt,
		);
	}

	// Serialization
	static fromJSON( properties ) {
		return new Project(
			properties.id,
			properties.name,
			properties.description,
			properties.client_name,
			properties.primary_contact,
			properties.cover_url,
			properties.cover_id,
			properties.status,
			properties.share_hash,
			properties.has_new_comments,
			properties.has_markups,
			properties.rush_priority,
			properties.has_new_assets,
			properties.is_new,
			properties.start_date ? new Date( properties.start_date ) : null,
			properties.due_date ? new Date( properties.due_date ) : null,
			new Date( properties.created_at ),
			new Date( properties.updated_at )
		);
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			client_name: this.clientName,
			primary_contact: this.primaryContact,
			cover_url: this.coverImageURL,
			cover_id: this.coverAssetID,
			status: this.status,
			share_hash: this.shareHash,
			has_new_comments: this.hasNewComments,
			has_markups: this.hasMarkups,
			rush_priority: this.hasRushPriority,
			has_new_assets: this.hasNewAssets,
			is_new: this.isNew,
			start_date: this.startDate ? this.startDate.toISOString() : null,
			due_date: this.dueDate ? this.dueDate.toISOString() : null,
			created_at: this.createdAt.toISOString(),
			updated_at: this.updatedAt.toISOString()
		};
	}
}
