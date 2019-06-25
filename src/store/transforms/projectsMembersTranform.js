import { createTransform } from 'redux-persist';
import { Map, List } from 'immutable';
import ProjectMember from '../../entities/projectMember';

export default createTransform(
	inboundState => (
		inboundState
			? inboundState.entrySeq().reduce(
				( result, entry ) => result.concat( [ [
					entry[ 0 ],
					entry[ 1 ].toArray().map( member => member.toJSON() )
				] ] ),
				[]
			)
			: []
	),
	outboundState => new Map(
		outboundState.map( entry => [
			entry[ 0 ],
			new List( entry[ 1 ].map( properties => ProjectMember.fromJSON( properties ) ) )
		] )
	),
	{ whitelist: [ 'projectsMembers' ] }
);
