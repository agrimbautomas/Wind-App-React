import { Map } from 'immutable';
import ImmutableEntity from '../immutableEntity';
import PlatformNotificationPreference from './platformNotificationsPreference';

export const alarmsJSONToMap = ( alarms ) => {
	const alarmMapElements = alarms
		.map( ( alarm ) => {
			const { identifier } = alarm;
			const value = PlatformNotificationPreference.fromJSON( alarm );
			return [ identifier, value ];
		} );
	return new Map( alarmMapElements );
};

export default class NotificationsPreferences extends ImmutableEntity {
	/**
	 * @param {'once_per_day'|'once_per_hour'|'every_action'} emailEvery
	 * @param {Map<identifier, PlatformNotificationPreference>} notificationsAlarms
	 * @param {Map<identifier, PlatformNotificationPreference>} emailsAlarms
	 */
	constructor(
		emailEvery,
		notificationsAlarms = new Map( [] ),
		emailsAlarms = new Map( [] )
	) {
		super();

		this.emailEvery = emailEvery;
		this.notificationsAlarms = notificationsAlarms;
		this.emailsAlarms = emailsAlarms;
	}

	static fromJSON( properties ) {
		return new NotificationsPreferences(
			properties.email_every,
			alarmsJSONToMap( properties.notification_alarms ),
			alarmsJSONToMap( properties.email_alarms )
		);
	}

	togglePlatformNotificationPreference( platform, notificationIdentifier ) {
		const toggledPlatformSettings = this[ platform ].update(
			notificationIdentifier,
			platformNotificationPreference => platformNotificationPreference.toggleValue()
		);
		return this.set( platform, toggledPlatformSettings );
	}

	toJSON() {
		return {
			notification_alarms: this.notificationsAlarms.toArray(),
			email_alarms: this.emailsAlarms.toArray(),
			email_every: this.emailEvery
		};
	}

	clone() {
		return new NotificationsPreferences(
			this.emailEvery,
			this.notificationsAlarms,
			this.emailsAlarms
		);
	}
}
