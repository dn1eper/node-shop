import { LOCALE_SWITCH } from './actionTypes';

export function localeSwitch(locale) {
	return {type: LOCALE_SWITCH, locale};
}
