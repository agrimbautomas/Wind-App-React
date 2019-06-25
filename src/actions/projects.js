import { PROJECTS_URL } from '../config/urls';
import {
	CREATE_PROJECT, FETCH_PROJECT, FETCH_PROJECTS,
	RESET_CREATE_PROJECT, CHANGE_PROJECT_NAME, DELETE_PROJECTS,
	RESET_DELETE_PROJECTS,
	ARCHIVE_PROJECTS,
	RESET_ARCHIVE_PROJECTS,
	UNARCHIVE_PROJECTS,
	RESET_UNARCHIVE_PROJECTS,
	MARK_PROJECT_ASSETS_AS_SEEN,
	UPDATE_PROJECT_SETTINGS,
	UNMARK_PROJECT_AS_NEW
} from './types';

export const createProject = () => ( dispatch, _, api ) => dispatch( {
	type: CREATE_PROJECT,
	promise: api
		.post( PROJECTS_URL )
		.then( response => ( {
			...response.response,
			has_new_comments: false,
			has_markups: false,
			has_new_assets: false
		} ) )
} );

export const fetchProject = projectID => ( dispatch, _, api ) => dispatch( {
	type: FETCH_PROJECT,
	promise: api
		.get( `${PROJECTS_URL}/${projectID}` )
		.then( response => response.response )
} );

export const fetchProjects = () => ( dispatch, _, api ) => dispatch( {
	type: FETCH_PROJECTS,
	promise: api
		.get( PROJECTS_URL )
		.then( response => response.response )
} );

export const changeProjectName = ( projectID, newName ) => ( dispatch, getState, api ) => {
	const originalProject = getState().projects.get( projectID );
	const originalName = originalProject ? originalProject.name : undefined;
	if ( originalName === newName ) { return Promise.resolve( undefined ); }

	return dispatch( {
		type: CHANGE_PROJECT_NAME,
		promise: api
			.put( `${PROJECTS_URL}/${projectID}`, { name: newName } )
			.then( response => response.response ),
		meta: { projectID, originalName, newName }
	} );
};

export const updateProject = ( projectID, settings ) => ( dispatch, _, api ) => dispatch( {
	type: UPDATE_PROJECT_SETTINGS,
	meta: {
		project: {
			id: projectID,
			...settings,
			cover_id: settings.cover_asset_id
		}
	},
	promise: api
		.patch( `${PROJECTS_URL}/${projectID}`, settings )
		.then( response => response.response )
} );

export const deleteProjects = projectsIDs => ( dispatch, _, api ) => dispatch( {
	type: DELETE_PROJECTS,
	promise: api
		.delete( `${PROJECTS_URL}`, { ids: projectsIDs } )
		.then( () => projectsIDs )
} );

export const resetCreateProjectRequest = () => ( {
	type: RESET_CREATE_PROJECT
} );

export const resetDeleteProjectsRequest = () => ( {
	type: RESET_DELETE_PROJECTS
} );

export const archiveProjects = projectsIDs => ( dispatch, _, api ) => dispatch( {
	type: ARCHIVE_PROJECTS,
	promise: api
		.patch( `${PROJECTS_URL}/mark_as_archived`, { ids: projectsIDs } )
		.then( () => projectsIDs )
} );

export const resetArchiveProjectsRequest = () => ( {
	type: RESET_ARCHIVE_PROJECTS
} );

export const unarchiveProjects = projectsIDs => ( dispatch, _, api ) => dispatch( {
	type: UNARCHIVE_PROJECTS,
	promise: api
		.patch( `${PROJECTS_URL}/mark_as_active`, { ids: projectsIDs } )
		.then( () => projectsIDs )
} );

export const resetUnarchiveProjectsRequest = () => ( {
	type: RESET_UNARCHIVE_PROJECTS
} );

export const markProjectAssetsAsSeen = projectID => ( dispatch, _, api ) => dispatch( {
	type: MARK_PROJECT_ASSETS_AS_SEEN,
	promise: api
		.post( `${PROJECTS_URL}/${projectID}/update_assets_last_seen` )
		.then( () => projectID )
} );

export const unmarkProjectAsNew = projectID => ( {
	type: UNMARK_PROJECT_AS_NEW,
	payload: projectID
} );
