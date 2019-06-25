export default class ImmutableEntity {
	/* eslint-disable class-methods-use-this */
	clone() {
		throw new Error( 'Must be implemented in subclass' );
	}
	/* eslint-enable class-methods-use-this */

	set( property, value ) {
		const updateEntity = this.clone();
		updateEntity[ property ] = value;
		return updateEntity;
	}
}
