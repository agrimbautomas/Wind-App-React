import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

export const authenticatedRouteWrapper = connectedRouterRedirect( {
	redirectPath: '/login',
	allowRedirectBack: false,
	authenticatedSelector: state => state.currentUser !== null
} );

export const notAuthenticatedRouteWrapper = connectedRouterRedirect( {
	redirectPath: '/projects',
	allowRedirectBack: false,
	authenticatedSelector: state => state.currentUser === null
} );

