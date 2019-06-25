import ApiHeaders from './ApiHeaders';
import ApiResponseError from './ApiResponseError';

export default class Api {
	constructor( fetchBackend = fetch.bind( window ) ) {
		this.fetch = fetchBackend;
		this.headers = new ApiHeaders();
	}

	_mergeHeaders( requestHeaders ) {
		const headersToRemove = Object
			.keys( requestHeaders )
			.filter( headerKey => requestHeaders[ headerKey ] === undefined );

		let headers = { ...this.headers.toDictionary(), ...requestHeaders };

		headersToRemove.forEach( ( headerKey ) => {
			delete headers[ headerKey ];
		} );

		return headers;
	}

	__options( method, body = undefined, requestHeaders = {} ) {
		const headers = this._mergeHeaders( requestHeaders );
		const options = { method, headers };

		if ( body !== undefined ) {
			if ( headers[ 'Content-Type' ] === 'application/json' ) {
				options.body = JSON.stringify( body );
			} else {
				options.body = body;
			}
		}

		return options;
	}

	__request( method, url, body = undefined, headers = {} ) {
		return this
			.fetch( url, this.__options( method, body, headers ) )
			.then( ( response ) => {
				if ( !response.ok ) {
					throw new ApiResponseError( response );
				}
				return response;
			} );
	}

	get( url, headers = {} ) {
		return this.__request( 'GET', url, undefined, headers ).then( data => data.json() );
	}
	post( url, body = undefined, headers = {} ) {
		return this.__request( 'POST', url, body, headers ).then( data => data.json() );
	}
	patch( url, body = undefined, headers = {} ) {
		return this.__request( 'PATCH', url, body, headers ).then( data => data.json() );
	}
	put( url, body = undefined, headers = {} ) {
		return this.__request( 'PUT', url, body, headers ).then( data => data.json() );
	}
	delete( url, body = undefined, headers = {} ) {
		return this.__request( 'DELETE', url, body, headers ).then( data => data.json() );
	}
}
