/* eslint-disable func-names */
/* eslint-disable no-extend-native */

Array.prototype.maxValue = function ( paramSelector ) {
	return this.reduce(
		( max, currentElement ) => Math.max( max, paramSelector( currentElement ) ),
		0
	);
};

Array.prototype.accumulate = function ( paramSelector ) {
	return this.reduce(
		( accumulator, currentElement ) => accumulator + paramSelector( currentElement ),
		0
	);
};
