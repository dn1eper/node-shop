export default {
	postFilter: '',			// equivalent of ALL
	posts: {
		isFetching: false,      // while asynchronous requrest
		data: []
    },
    auth: {
        status: 'unsigned',
        token: false,
        error: {
            message: ''
        }
    },
    register: {
        status: 'unsigned',
        error: {
            message: ''
        }
    },
    cart: {
        status: 'preorder',
        items: [],
        error: {
            message: ''
        },
        length: 0,
        order_id: false
    },
};

/*
post: {
   id,
   title,
   htmlText,
   imageList,
   likes,
   tags
}
imageList: [ image ]
image: { url }
tags: [ tagName ]

auth: {
    status: 'unsigned' | 'request' | 'signed' | 'error'
}
register: {
    status: 'usigned' | 'request' | 'seccess' | 'error'
}
cart: {
    status: 'preorder' | 'request' | 'order' | 'error'
    items: [ {id, count}, ...],
    order_id: //if status == order
}
*/