Promise.serial = funcs => funcs.reduce(
	( all, func ) => all
		.then( allResults => func()
			.then( result => allResults.concat( result ) ) ),
	Promise.resolve( [] )
);
