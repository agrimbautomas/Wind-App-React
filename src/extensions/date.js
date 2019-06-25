/* eslint-disable no-extend-native, func-names */
import moment from 'moment';

Date.prototype.getDateString = function () {
	return `${this.getDate()}/${this.getMonth() + 1}/${this.getFullYear()}`;
};

Date.prototype.getDateTimeString = function () {
	return moment( this ).format( 'D/M/YYYY HH:mm' );
};
