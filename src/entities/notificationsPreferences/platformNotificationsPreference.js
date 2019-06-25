import ImmutableEntity from '../immutableEntity';

export default class PlatformNotificationPreference extends ImmutableEntity {
	/**
	 * @param {string} identifier
	 * @param {string} text
	 * @param {boolean} value
	 */
	constructor(
		identifier,
		text,
		value
	) {
		super();

		this.identifier = identifier;
		this.text = text;
		this.value = value;
	}

	static fromJSON( properties ) {
		return new PlatformNotificationPreference(
			properties.identifier,
			properties.text,
			properties.value
		);
	}

	toJSON() {
		return {
			identifier: this.identifier,
			text: this.text,
			value: this.value
		};
	}

	toggleValue() {
		return this.set( 'value', !this.value );
	}

	clone() {
		return new PlatformNotificationPreference(
			this.identifier,
			this.text,
			this.value
		);
	}
}
