import { LOCALE_SWITCH } from 'actions/actionTypes';

export default function localeSwitch(state='', action) {
	switch(action.type) {
		case LOCALE_SWITCH:
			let newState = action.locale;
			return newState;
		default:
			return state;
	}
}
