import { Map } from 'immutable';
import { handle } from 'redux-pack';
import { makeAsyncActionReducer, handleSuccess, entitiesMapForPayload, entitiyMapForPayload } from '../lib/reduxUtils';
import {
	CREATE_PROJECT, FETCH_PROJECT,
	FETCH_PROJECTS, CHANGE_PROJECT_NAME, LOGOUT,
	DELETE_PROJECTS,
	ARCHIVE_PROJECTS,
	UNARCHIVE_PROJECTS,
	SET_PROJECT_RUSH_PRIORITY,
	UNSET_PROJECT_RUSH_PRIORITY,
	MARK_PROJECT_ASSETS_AS_SEEN,
	UPDATE_PROJECT_SETTINGS,
	UNMARK_PROJECT_AS_NEW
} from '../actions/types';
import Project from '../entities/project';

export const createProjectRequest = makeAsyncActionReducer( CREATE_PROJECT );
export const fetchProjectRequest = makeAsyncActionReducer( FETCH_PROJECT );
export const deleteProjectsRequest = makeAsyncActionReducer( DELETE_PROJECTS );
export const archiveProjectsRequest = makeAsyncActionReducer( ARCHIVE_PROJECTS );
export const unarchiveProjectsRequest = makeAsyncActionReducer( UNARCHIVE_PROJECTS );
export const fetchProjectsRequest = makeAsyncActionReducer( FETCH_PROJECTS );

export const projects = ( state = new Map(), action ) => {
	switch ( action.type ) {
	case CREATE_PROJECT:
		return handleSuccess( state, action, ( prevState ) => {
			const project = Project.fromJSON( {
				...action.payload,
				is_new: true
			} );
			return prevState.set( project.id, project );
		} );
	case FETCH_PROJECT:
		return handleSuccess( state, action, ( prevState ) => {
			const project = Project.fromJSON( action.payload );
			return prevState.set( project.id, project );
		} );
	case ARCHIVE_PROJECTS:
		return handleSuccess(
			state,
			action,
			prevState => action.payload.reduce(
				( result, archivedProjectID ) =>
					result.update( archivedProjectID, project => project.markArchived() ),
				prevState
			),
		);
	case UNARCHIVE_PROJECTS:
		return handleSuccess(
			state,
			action,
			prevState => action.payload.reduce(
				( result, unarchivedProjectID ) =>
					result.update( unarchivedProjectID, project => project.markActive() ),
				prevState
			)
		);
	case DELETE_PROJECTS:
		return handleSuccess(
			state,
			action,
			prevState => action.payload.reduce(
				( result, deletedID ) => result.delete( deletedID ),
				prevState
			)
		);
	case FETCH_PROJECTS:
		return handleSuccess(
			state,
			action,
			() => entitiesMapForPayload( action.payload, Project )
		);
	case CHANGE_PROJECT_NAME:
		return handle( state, action, {
			start: ( prevState ) => {
				const { projectID, newName } = action.meta;
				const project = prevState.get( projectID );

				return project
					? prevState.set( projectID, project.withName( newName ) )
					: prevState;
			},
			failure: ( prevState ) => {
				const { projectID, originalName } = action.meta;
				if ( !originalName ) { return prevState; }

				const project = prevState.get( projectID );

				return project
					? prevState.set( projectID, project.withName( originalName ) )
					: prevState;
			},
			success: ( prevState ) => {
				const project = Project.fromJSON( action.payload );
				return prevState.set( project.id, project );
			}
		} );
	case UPDATE_PROJECT_SETTINGS:
		return handle( state, action, {
			start: prevState => prevState.set(
				action.meta.project.id,
				entitiyMapForPayload(
					action.meta.project,
					Project,
					prevState.get( action.meta.project.id ).toJSON()
				)
			),
			failure: () => state
		} );
	case SET_PROJECT_RUSH_PRIORITY:
		return handle( state, action, {
			start: prevState => prevState.update(
				action.meta.projectID, project => project.setRushPriority()
			),
			failure: prevState => prevState.update(
				action.meta.projectID, project => project.unsetRushPriority()
			)
		} );
	case UNSET_PROJECT_RUSH_PRIORITY:
		return handle( state, action, {
			start: prevState => prevState.update(
				action.meta.projectID, project => project.unsetRushPriority()
			),
			failure: prevState => prevState.update(
				action.meta.projectID, project => project.setRushPriority()
			)
		} );
	case MARK_PROJECT_ASSETS_AS_SEEN:
		return handleSuccess(
			state,
			action,
			prevState => (
				prevState.has( action.payload ) ? prevState.update(
					action.payload,
					project => project.set( 'hasNewAssets', false )
				) : prevState
			)
		);
	case UNMARK_PROJECT_AS_NEW:
		return (
			state.has( action.payload ) ? state.update(
				action.payload,
				project => project.unmarkAsNew()
			) : state
		);
	case LOGOUT:
		return new Map();
	default:
		return state;
	}
};
