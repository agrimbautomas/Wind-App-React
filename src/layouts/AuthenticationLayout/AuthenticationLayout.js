import React from 'react';
import PropTypes from 'prop-types';

import logoImage from '../../assets/img/icons/logo.svg';

import './AuthenticationLayout.scss';

const AuthenticationLayout = props => (
	<div className="AuthenticationLayout">
		<div className="left-side">
			<img src={logoImage} alt="Very Busy" />
		</div>
		<div className="right-side">
			<div className="components-container">
				{props.children}
			</div>
		</div>
	</div>
);

AuthenticationLayout.propTypes = {
	children: PropTypes.node
};

AuthenticationLayout.defaultProps = {
	children: undefined
};

export default AuthenticationLayout;
