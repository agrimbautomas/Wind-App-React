import { combineReducers } from 'redux';
import * as projectsReducers from './projects';
import * as usersReducers from './users';
import * as authReducers from './authentication';
import * as currentUserReducers from './currentUser'

export default combineReducers( {
	...authReducers
} );
//
// export default combineReducers( {
// 	...projectsReducers,
// 	...usersReducers,
// 	...authReducers,
// 	...currentUserReducers,
// } );
