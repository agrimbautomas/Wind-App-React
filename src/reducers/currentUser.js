import { handleSuccess } from '../lib/reduxUtils';
import { LOGIN, LOGOUT } from '../actions/types';

const getIDIfDefined = properties => (
	properties ? properties.id : undefined
);

const parseCurrentUser = properties => ( {
	userID: properties.user.id,
	userPreferencesID: getIDIfDefined( properties.user.user_preference ),
	notificationsPreferencesID: getIDIfDefined( properties.user.notifications_preferences ),
	token: properties.token
} );

export const currentUser = ( state = null, action ) => {
	switch ( action.type ) {
	case LOGIN:
		return handleSuccess(
			state,
			action,
			() => parseCurrentUser( action.payload )
		);
	case LOGOUT:
		return null;
	default:
		return state;
	}
};
