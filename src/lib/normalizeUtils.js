import { normalize } from 'normalizr';

export const normalizeResponse = (
	prevState, response, scheme, collectionName, entityClass = undefined
) => {
	const entities = normalize(
		response,
		Array.isArray( response ) ? [ scheme ] : scheme
	).entities[ collectionName ] || [];

	return Object
		.values( entities )
		.reduce(
			( resultState, entityProperties ) => {
				const entity = entityClass
					? entityClass.fromJSON( entityProperties )
					: entityProperties;

				return resultState.set( entity.id, entity );
			},
			prevState
		);
};
