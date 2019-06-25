class ApiAuthTokenUpdater {
	constructor( store, api ) {
		this.store = store;
		this.api = api;

		this._unsubscribeFromStore = null;
		this._onStoreUpdated = this._onStoreUpdated.bind( this );
	}

	start() {
		this._unsubscribeFromStore = this.store.subscribe( this._onStoreUpdated );
		return this;
	}

	stop() {
		if ( this._unsubscribeFromStore ) { this._unsubscribeFromStore(); }
		return this;
	}

	_onStoreUpdated() {
		const { currentUser } = this.store.getState();
		if ( !currentUser ) {
			this.api.headers.authorization = null;
		} else {
			const token = currentUser.token.access_token;
			this.api.headers.authorization = `Bearer ${token}`;
		}
	}
}

export default ApiAuthTokenUpdater;
