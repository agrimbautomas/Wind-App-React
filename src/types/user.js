import PropTypes from 'prop-types';

const UserPropType = PropTypes.shape( {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	avatar: PropTypes.string
} );

export default UserPropType;
