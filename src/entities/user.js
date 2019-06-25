export default class User {
	constructor( id, name, email, avatar ) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.avatar = avatar;
	}

	static fromJSON( properties ) {
		return new User(
			properties.id,
			properties.name,
			properties.email,
			properties.avatar
		);
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			avatar: this.avatar
		};
	}
}
