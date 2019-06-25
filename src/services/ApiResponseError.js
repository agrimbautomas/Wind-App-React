export default class ApiResponseError {
	constructor( response ) {
		this.response = response;
	}
	get status() {
		return this.response.status;
	}
	get statusText() {
		return this.response.statusText;
	}
	json() {
		return this.response.json();
	}
}
