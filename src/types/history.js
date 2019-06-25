import PropTypes from 'prop-types';

export default PropTypes
	.shape( {
		push: PropTypes.func,
		replace: PropTypes.func,
		goBack: PropTypes.func,
		length: PropTypes.number
	} );
