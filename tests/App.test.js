import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import { defaultMockedStore, mockStore, mockedStoreWithUser } from './mocks/store';
import { createAsset } from './factories/assets';
import App from '../src/App';
import Nav from '../src/components/Nav/Nav';

import ProjectDetails from '../src/screens/ProjectDetails/ProjectDetails';
import AssetDetails from '../src/screens/AssetDetails/AssetDetails';
import Projects from '../src/screens/Projects/Projects';
import Login from '../src/screens/Login/Login';
import FullScreenAssetImage from '../src/screens/FullScreenAssetImage/FullScreenAssetImage';
import ActivityStatusRefresher from '../src/containers/ActivityStatusRefresher/ActivityStatusRefresher';
import { createAssetVersion } from './factories/assetVersions';
import { createUser } from './factories/users';

const wrapWithProviderAndRouter = ( component, defaultRoute = '/', store = defaultMockedStore ) => (
	<Provider store={store}>
		<MemoryRouter initialEntries={[ defaultRoute ]}>
			{component}
		</MemoryRouter>
	</Provider>
);

describe( '<App />', () => {
	// describe( 'with currentUser', () => {
	// 	describe( 'root path', () => {
	// 		const wrapper = mount( wrapWithProviderAndRouter( <App />, '/', mockedStoreWithUser ) );
	// 		it( 'redirects to Projects page when the route points to /', () => {
	// 			expect( wrapper.find( Projects ).length ).toEqual( 1 );
	// 		} );
	//
	// 		it( 'renders the ActivityStatusRefresher', () => {
	// 			expect( wrapper.find( ActivityStatusRefresher ) ).toExist();
	// 		} );
	// 	} );
	//
	// 	describe( 'route projects/:id', () => {
	// 		const wrapper = mount( wrapWithProviderAndRouter( <App />, '/projects/1', mockedStoreWithUser ) );
	//
	// 		it( 'renders the Nav component', () => {
	// 			expect( wrapper.find( Nav ).length ).toEqual( 1 );
	// 		} );
	//
	// 		it( 'renders the ProjectDetails page when the route matchs projects/:projectID', () => {
	// 			expect( wrapper.find( ProjectDetails ).length ).toEqual( 1 );
	// 		} );
	// 	} );
	//
	// 	describe( 'route login', () => {
	// 		const wrapper = mount( wrapWithProviderAndRouter( <App />, '/login', mockedStoreWithUser ) );
	//
	// 		it( 'renders the Projects page when the route matchs login', () => {
	// 			expect( wrapper.find( Projects ).length ).toEqual( 1 );
	// 		} );
	// 	} );
	//
	// 	describe( 'route projects/:id/assets/:id', () => {
	// 		const asset = createAsset( 1 );
	// 		const storeWithUserAndAsset = mockStore( {
	// 			userActivity: new Map( [ [ 'lastUpdated', new Date() ] ] ),
	// 			projects: new Map(),
	// 			assets: new Map( [ [ 1, asset ] ] ),
	// 			assetVersions: new Map( [ [ 1, createAssetVersion( 1, 1, 1 ) ] ] ),
	// 			selectedAssetVersionID: 1,
	// 			comments: new Map(),
	// 			users: new Map( [ [ 1, createUser( 1 ) ] ] ),
	// 			projectsMembers: new Map(),
	// 			currentUser: { userID: 1 },
	// 			assetUploads: new Map(),
	// 			notifications: new Map()
	// 		} );
	//
	// 		const wrapper = mount( wrapWithProviderAndRouter( <App />, '/projects/1/assets/1', storeWithUserAndAsset ) );
	//
	// 		it( 'renders the navigation bar', () => {
	// 			expect( wrapper.find( Nav ).length ).toEqual( 1 );
	// 			expect( wrapper.find( Nav ) ).toHaveProp( 'assetID', 1 );
	// 		} );
	//
	// 		it( 'renders the asset details page', () => {
	// 			expect( wrapper.find( AssetDetails ).length ).toEqual( 1 );
	// 		} );
	// 	} );
	//
	// 	describe( 'route projects/:id/assets/:id/fullscreen', () => {
	// 		const asset = createAsset( 1 );
	// 		const storeWithUserAndAsset = mockStore( {
	// 			userActivity: new Map( [ [ 'lastUpdated', new Date() ] ] ),
	// 			projects: new Map(),
	// 			assets: new Map( [ [ 1, asset ] ] ),
	// 			assetVersions: new Map( [ [ 1, createAssetVersion( 1, 1, 1 ) ] ] ),
	// 			selectedAssetVersionID: 1,
	// 			comments: new Map(),
	// 			users: new Map( [ [ 1, createUser( 1 ) ] ] ),
	// 			projectsMembers: new Map(),
	// 			currentUser: { userID: 1 },
	// 			assetUploads: new Map(),
	// 			notifications: new Map()
	// 		} );
	//
	// 		const wrapper = mount( wrapWithProviderAndRouter(
	// 			<App />,
	// 			'/projects/1/assets/1/fullscreen',
	// 			storeWithUserAndAsset
	// 		) );
	//
	// 		it( 'renders the navigation bar', () => {
	// 			expect( wrapper.find( Nav ).length ).toEqual( 1 );
	// 			expect( wrapper.find( Nav ) ).toHaveProp( 'assetID', 1 );
	// 		} );
	//
	// 		it( 'renders the asset fullscreen page', () => {
	// 			expect( wrapper.find( FullScreenAssetImage ).length ).toEqual( 1 );
	// 		} );
	// 	} );
	// } );

	describe( 'without currentUser', () => {
		const testForRouteWithoutUser = ( route ) => {
			const wrapper = mount( wrapWithProviderAndRouter( <App />, route ) );
			it( 'renders the Login component', () => {
				expect( wrapper.find( Login ).length ).toEqual( 1 );
			} );
		};

		describe( 'root path', () => testForRouteWithoutUser( '/' ) );
		// describe( 'route login', () => testForRouteWithoutUser( '/login' ) );
		// describe( 'route projects', () => testForRouteWithoutUser( '/projects' ) );
		// describe( 'route projects/:id', () => testForRouteWithoutUser( '/projects/1' ) );
		// describe( 'route projects/:id/assets/:id', () => testForRouteWithoutUser( '/projects/1/assets/1' ) );
	} );
} );
