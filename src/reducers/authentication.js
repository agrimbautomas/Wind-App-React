import { makeAsyncActionReducer } from '../lib/reduxUtils';
import { LOGIN, SIGNUP, FORGOT_PASSWORD } from '../actions/types';

export const loginRequest = makeAsyncActionReducer( LOGIN );
export const signUpRequest = makeAsyncActionReducer( SIGNUP );
export const forgotPasswordRequest = makeAsyncActionReducer( FORGOT_PASSWORD );
