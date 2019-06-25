import { LOGIN_URL, CURRENT_USER_URL, USERS_URL } from '../config/urls';
import { LOGIN, SIGNUP, FORGOT_PASSWORD, LOGOUT } from './types';

import '../extensions/promise';

export const login = ( email, password ) => ( dispatch, _, api ) => dispatch( {
	type: LOGIN,
	promise: api
		.post( LOGIN_URL, { email, password, grant_type: 'password' } )
		.then( ( token ) => {
			api.headers.authorization = `Bearer ${token.access_token}`;

			return api
				.get( CURRENT_USER_URL )
				.then( userResponse => ( {
					user: userResponse.response,
					token
				} ) )
				.catch( ( error ) => {
					api.headers.authorization = undefined;
					throw error;
				} );
		} )
} );

export const signUp = ( name, email, password ) => ( dispatch, _, api ) => dispatch( {
	type: SIGNUP,
	promise: api
		.post( `${USERS_URL}/sign_up`, { user: { name, email, password } } )
		.then( signupResponse => (
			signupResponse.response
		) )
		.catch( error => (
			error.json().then( ( errorJSON ) => {
				throw errorJSON;
			} )
		) )
} );

export const forgotPassword = email => ( dispatch, _, api ) => dispatch( {
	type: FORGOT_PASSWORD,
	promise: api
		.post( `${USERS_URL}/forgot_password`, { email } )
		.then( forgotPasswordResponse => (
			forgotPasswordResponse
		) )
		.catch( error => (
			error.json().then( ( errorJSON ) => {
				throw errorJSON;
			} )
		) )
} );

export const logout = () => ( {
	type: LOGOUT
} );
