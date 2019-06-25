import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HistoryPropType from '../../types/history';
import AsyncApiActionPropType, { defaultProp as defaultAsyncApiRequest } from '../../types/asyncApiAction';
import { connectComponent } from '../../lib/connectComponent';

import AuthenticationLayout from '../../layouts/AuthenticationLayout/AuthenticationLayout';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import './Login.scss';

export class Login extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			email: '',
			password: ''
		};

		this._onFormSubmitted = this._onFormSubmitted.bind( this );
		this._onEmailChanged = this._onFieldChange.bind( this, 'email' );
		this._onPasswordChanged = this._onFieldChange.bind( this, 'password' );
	}

	get isLoggingIn() { return this.props.loginRequest.sending; }
	get isValid() {
		return this.state.email && this.state.password;
	}
	get hasError() { return !!this.props.loginRequest.error; }

	_onFieldChange( field, value ) {
		this.setState( { [ field ]: value } );
	}

	_onFormSubmitted( event ) {
		event.preventDefault();
		const { email, password } = this.state;
		this.props
			.login( email, password )
			.then( ( result ) => {
				if ( result.error ) { return; }
				this.props.history.push( 'projects' );
			} );
	}

	render() {
		const { email, password } = this.state;
		const { isValid, hasError, isLoggingIn } = this;

		return (
			<AuthenticationLayout>
				<div className="Login">
					<h2>Welcome to Very Busy</h2>
					<form onSubmit={this._onFormSubmitted}>
						<Input
							name="email"
							label="E-mail"
							value={email}
							hasError={hasError}
							onChange={this._onEmailChanged}
						/>
						<Input
							name="password"
							label="Password"
							type="password"
							value={password}
							hasError={hasError}
							onChange={this._onPasswordChanged}
						/>
						{hasError && <p className="error">That email / password combination is not valid</p>}

						<Button
							type="blue"
							buttonType="submit"
							disabled={!isValid || isLoggingIn}
						>
							Next
						</Button>
					</form>

					<a className="forgot" href="/forgot">Forgot password?</a>
					<p>Don&apos;t have an account? <a href="signup">Get started</a></p>
				</div>
			</AuthenticationLayout>
		);
	}
}

Login.propTypes = {
	login: PropTypes.func,
	loginRequest: AsyncApiActionPropType,
	history: HistoryPropType.isRequired
};

Login.defaultProps = {
	login: () => {},
	loginRequest: defaultAsyncApiRequest
};

export default connectComponent(
	( { loginRequest } ) => ( { loginRequest } )
)( Login );
