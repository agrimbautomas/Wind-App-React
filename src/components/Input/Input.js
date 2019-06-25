import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.scss';


const Input = ( {
	value, label, onChange, onBlur,
	onFocus, type, placeholder, name,
	disabled, hasError
} ) => (
	<div className={classNames( 'input-container', { error: hasError } )}>
		{label && <label htmlFor={name}>{label}</label>}
		<input
			id={name}
			type={type}
			disabled={disabled}
			className={classNames( 'input', { error: hasError } )}
			value={value}
			onChange={event => onChange( event.target.value )}
			onBlur={onBlur}
			onFocus={onFocus}
			placeholder={placeholder}
		/>
	</div>
);

Input.propTypes = {
	value: PropTypes.any,
	label: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	hasError: PropTypes.bool,
	name: PropTypes.string
};

Input.defaultProps = {
	value: '',
	label: undefined,
	disabled: false,
	onChange: () => {},
	onBlur: () => {},
	onFocus: () => {},
	type: 'text',
	placeholder: '',
	hasError: false,
	name: undefined
};

export default Input;
