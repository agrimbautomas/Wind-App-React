import {
	SHOW_CONFIRMATION_DIALOG,
	HIDE_CONFIRMATION_DIALOG
} from './types';

export const showConfirmationDialog = (
	text, acceptText = 'Ok', cancelText = 'Cancel'
) => dispatch => new Promise(
	resolve => dispatch( {
		type: SHOW_CONFIRMATION_DIALOG,
		payload: {
			text,
			acceptText,
			cancelText,
			onAccept: () => resolve( true ),
			onCancel: () => resolve( false )
		}
	} )
);

export const hideConfirmationDialog = () => ( {
	type: HIDE_CONFIRMATION_DIALOG
} );
