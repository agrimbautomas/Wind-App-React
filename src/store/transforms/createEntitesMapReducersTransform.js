import { createTransform } from 'redux-persist';
import { Map } from 'immutable';

const createEntitesMapReducersTransform = entitiesReducesMap => createTransform(
	inboundState => (
		inboundState
			? inboundState.map( entity => entity.toJSON() ).toJS()
			: {}
	),

	( outboundState, key ) => {
		const entityClass = entitiesReducesMap[ key ];

		return new Map(
			Object.keys( outboundState ).map( entityID => [
				parseInt( entityID, 10 ),
				entityClass.fromJSON( outboundState[ entityID ] )
			] )
		);
	},
	{ whitelist: Object.keys( entitiesReducesMap ) }
);

export default createEntitesMapReducersTransform;
