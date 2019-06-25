import { Map } from 'immutable';
import { handle } from 'redux-pack';

export const initialAsyncRequestState = { sending: false, error: null, success: false };

export const reduceAsyncAction = ( state, action ) => handle( state, action, {
	start: prevState => ( {
		...prevState, sending: true, error: null, success: false
	} ),
	failure: prevState => ( {
		...prevState, sending: false, error: action.payload, success: false
	} ),
	success: prevState => ( {
		...prevState, sending: false, error: null, success: true
	} )
} );

export const makeAsyncActionReducer = ( actionType, resetActionType = undefined ) =>
	( state = initialAsyncRequestState, action ) => {
		if ( !resetActionType ) {
			resetActionType = `RESET_${actionType}`;
		}

		const { type } = action;
		switch ( type ) {
		case actionType:
			return reduceAsyncAction( state, action );
		case resetActionType:
			return initialAsyncRequestState;
		default:
			return state;
		}
	};

export const handleSuccess = ( state, action, handler ) =>
	handle( state, action, { success: handler } );

export const entitiesMapForPayload = ( payload, entityClass ) => new Map(
	payload.map(
		( properties ) => {
			const entity = entityClass.fromJSON( properties );
			return [ entity.id, entity ];
		}
	)
);

export const entitiyMapForPayload = ( payload, entityClass, previousValues = {} ) =>
	entityClass.fromJSON( { ...previousValues, ...payload } );

export const mapEntityToCustomSort = ( entityMap, storedSortedIDs = [] ) => {
	const entityArray = entityMap.toArray();
	const orderedEntitiesIDs = entityArray.reduce( ( prev, _, index ) => {
		if ( entityMap.has( storedSortedIDs[ index ] ) ) {
			prev.push( storedSortedIDs[ index ] );
		}
		return prev;
	}, [] );

	const unorderedEntitiesIDs = entityArray
		.map( entity => entity.id )
		.filter( entity => !orderedEntitiesIDs.includes( entity ) );

	return [ ...orderedEntitiesIDs, ...unorderedEntitiesIDs ]
		.map( entityID => entityMap.get( entityID ) );
};

export const actionResultIsError = result => result && result.error;

export const handleAsyncActionResult = (
	asyncActionResult,
	successMessage,
	errorMessage,
	resetAction,
	showSuccessMessageAction,
	showErrorMessageAction,
	onSuccess,
	onError
) => asyncActionResult.then( ( result ) => {
	if ( !actionResultIsError( result ) ) {
		if ( successMessage ) showSuccessMessageAction( successMessage );
		if ( resetAction ) resetAction();
		if ( onSuccess ) onSuccess( result.payload );
	} else {
		if ( errorMessage ) showErrorMessageAction( errorMessage );
		if ( onError ) onError( result.payload );
	}

	return result;
} );
