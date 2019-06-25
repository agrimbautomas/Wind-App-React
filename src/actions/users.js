import { EDIT_USER, CHANGE_USER_PASSWORD } from './types';
import { USERS_URL } from '../config/urls';
import { objectToFormData } from '../lib/requestUtils';

export const editUser = ( userID, data ) => ( dispatch, _, api ) => dispatch( {
	type: EDIT_USER,
	promise: api
		.patch(
			`${USERS_URL}/${userID}`,
			objectToFormData( data ),
			{ 'Accept': 'application/json, */*', 'Content-Type': undefined }
		).then( response => response.response )
} );

export const changeUserPassword = (
	userID, oldPassword, newPassword
) => ( dispatch, _, api ) => dispatch( {
	type: CHANGE_USER_PASSWORD,
	promise: api
		.post(
			`${USERS_URL}/${userID}/update_password`,
			{
				old_password: oldPassword,
				new_password: newPassword
			}
		)
		.then( () => userID )
} );
