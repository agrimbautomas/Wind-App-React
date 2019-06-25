import { Map } from 'immutable';
import { normalizeResponse } from '../lib/normalizeUtils';
// import {
// 	comment as commentScheme,
// 	task as taskScheme,
// 	projectMember as projectMemberScheme,
// 	activity as activityScheme
// } from './schemes';
import { handleSuccess, makeAsyncActionReducer } from '../lib/reduxUtils';
import {
	FETCH_ASSET_COMMENTS, CREATE_COMMENT_FOR_ASSET,
	FETCH_PROJECT_MEMBERS, FETCH_PROJECT_TASKS,
	CREATE_TASK, LOGIN, EDIT_USER, CHANGE_USER_PASSWORD, FETCH_PROJECT_ACTIVITIES
} from '../actions/types';
import User from '../entities/user';
//
// const normalizeUsersForComments = ( prevState, actionPayload ) => normalizeResponse(
// 	prevState, actionPayload, commentScheme, 'users', User
// );
//
// const normalizeUsersForTasks = ( prevState, actionPayload ) => normalizeResponse(
// 	prevState, actionPayload, taskScheme, 'users', User
// );
//
// const normalizeUsersForProjectMembers = ( prevState, actionPayload ) => normalizeResponse(
// 	prevState, actionPayload, projectMemberScheme, 'users', User
// );
//
// const normalizeUsersForActivities = ( prevState, actionPayload ) => normalizeResponse(
// 	prevState, actionPayload, activityScheme, 'users', User
// );

export const editUserRequest = makeAsyncActionReducer( EDIT_USER );
export const changeUserPasswordRequest = makeAsyncActionReducer( CHANGE_USER_PASSWORD );

export const users = ( state = new Map(), action ) => {
	switch ( action.type ) {
	// case FETCH_ASSET_COMMENTS:
	// case CREATE_COMMENT_FOR_ASSET:
	// 	return handleSuccess(
	// 		state,
	// 		action,
	// 		prevState => normalizeUsersForComments( prevState, action.payload )
	// 	);
	// case FETCH_PROJECT_TASKS:
	// case CREATE_TASK:
	// 	return handleSuccess(
	// 		state,
	// 		action,
	// 		prevState => normalizeUsersForTasks( prevState, action.payload )
	// 	);
	// case FETCH_PROJECT_MEMBERS:
	// 	return handleSuccess(
	// 		state,
	// 		action,
	// 		prevState => normalizeUsersForProjectMembers( prevState, action.payload.members )
	// 	);
	// case FETCH_PROJECT_ACTIVITIES:
	// 	return handleSuccess(
	// 		state,
	// 		action,
	// 		prevState => normalizeUsersForActivities( prevState, action.payload.activities )
	// 	);
	case LOGIN:
		return handleSuccess( state, action, ( prevState ) => {
			const user = User.fromJSON( action.payload.user );
			return prevState.set( user.id, user );
		} );
	case EDIT_USER:
		return handleSuccess( state, action, ( prevState ) => {
			const user = User.fromJSON( action.payload );
			return prevState.set( user.id, user );
		} );
	default:
		return state;
	}
};
