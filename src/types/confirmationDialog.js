import PropTypes from 'prop-types';

const ConfirmationDialogPropType = PropTypes.shape( {
	text: PropTypes.string.isRequired,
	acceptText: PropTypes.string.isRequired,
	cancelText: PropTypes.string.isRequired,
	onAccept: PropTypes.func,
	onCancel: PropTypes.func
} );

export default ConfirmationDialogPropType;
