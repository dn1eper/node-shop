import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SUBMIT, CART_SUBMIT_SUCCESS, CART_SUBMIT_ERROR, CART_CLEAR } from 'actions/actionTypes';

export default function(state = {}, action) {    
    switch(action.type) {
        case CART_ADD_ITEM:
            if (state.items.some(({id}) => id === action.payload)) {
                return {...state, length: ++state.length, items: state.items.map(({id, count}) => 
                    (id === action.payload) ? {id: id, count: count+1} : {id: id, count: count}
                )};
            }
            else return {...state, length: ++state.length, items: [...state.items, {id: action.payload, count: 1}] };

        case CART_REMOVE_ITEM:
            let newItems = state.items.map(({id, count}) => 
                (id === action.payload) ? {id: id, count: count-1} : {id: id, count: count}    
            );
            return {...state, length: --state.length, items: newItems.filter(({count}) => count !== 0) };

        case CART_SUBMIT:
            return {...state, status: 'request' };
        
        case CART_SUBMIT_SUCCESS:
            return {...state, status: 'order', order_id: action.payload }

        case CART_SUBMIT_ERROR:
            return {...state, status: 'error', error: { message: action.payload } }

        case CART_CLEAR:
            return {...state, status: 'preorder', error: { message: '' }, items: [], order_id: false, length: 0 }

		default:
			return state;
	}
}

