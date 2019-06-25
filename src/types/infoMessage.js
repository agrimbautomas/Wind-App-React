import PropTypes from 'prop-types';

const InfoMessagePropType = PropTypes.shape( {
	message: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
} );

export default InfoMessagePropType;
