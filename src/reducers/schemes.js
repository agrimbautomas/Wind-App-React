import { schema } from 'normalizr';

export const user = new schema.Entity( 'users' );
//
// export const comment = new schema.Entity( 'comments', {
// 	user,
// 	seen_by: [ user ]
// }, {
// 	idAttribute: c => c.id
// } );
//
// export const projectMember = new schema.Entity( 'projectMembers', {
// 	user
// }, {
// 	idAttribute: c => c.id
// } );
//
// export const task = new schema.Entity( 'tasks', {
// 	author: user,
// 	responsibles: [ user ]
// }, {
// 	idAttribute: t => t.id
// } );
//
// export const activity = new schema.Entity( 'activities', {
// 	user
// }, {
// 	idAttribute: t => t.id
// } );
