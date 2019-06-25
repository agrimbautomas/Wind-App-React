import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

const types = [ 'primary', 'text', 'blue', 'round', 'round-green', 'bordered' ];
const sizes = [ 'normal', 'small', 'x-small' ];


const Button = ( {
	children, type, size, disabled, onClick, className, buttonType
} ) => {
	const buttonClassNames = classNames(
		'Button',
		type,
		size,
		{ disabled },
		className
	);

	return (
		<button
			className={buttonClassNames}
			disabled={disabled}
			onClick={onClick}
			type={buttonType}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	type: PropTypes.oneOf( types ),
	size: PropTypes.oneOf( sizes ),
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	className: PropTypes.string,
	buttonType: PropTypes.oneOf( [ 'button', 'submit' ] )
};

Button.defaultProps = {
	type: 'primary',
	size: 'normal',
	disabled: false,
	onClick: () => {},
	className: '',
	buttonType: 'button'
};

export default Button;
