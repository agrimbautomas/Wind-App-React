import PropTypes from 'prop-types';

export const defaultProp = { sending: false, error: undefined, success: false };

export default PropTypes.shape( {
	sending: PropTypes.bool,
	error: PropTypes.any,
	success: PropTypes.bool
} );
