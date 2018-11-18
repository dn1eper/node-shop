import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cartSubmit, cartSubmitError, cartClear, cartAddItem, cartRemoveItem } from 'actions/cartActions';
import LoadingImage from 'img/Loading.gif';
import 'styles/Cart.css';

class CartPage extends Component {
	handleSubmit() {
		const { items, token, onError, onSubmit } = this.props;
		if (items.length === 0) onError('Can not submit empty cart.');
		else if (token === false) onError('You should login, to submit order.');
		else onSubmit(items, token);
	}

	render() {
		const { items, isError, inProcess,
			errorMsg, isOrderCreated, order_id, 
			onRemoveItem, onAddItem, onCartClear } = this.props;

		return (
			<div className="cart_wrapper">
				<div className="cart_ordered" hidden={!isOrderCreated}>
					<h1>Your order is decorated!</h1>
					<p>Your order number: {order_id}</p>
					<input
						type="button"
						value="START A NEW ORDER"
						onClick={() => onCartClear()}
						className="btn"
						id="newOrderBtn"
					/>    
				</div>
					
				<div className="cart_preorder" hidden={isOrderCreated}>
					<div className="cart_list">
						{
							items.length ? items.map(({id, count, imageList, title}) => (
								<div key={id} className="cart_item">
									<img src={imageList[0].url} alt={title} />
									<h3 className="cart_item_title">{title}</h3>									
									<div className="cart_item_count" item_id={id}>
									<input
										type="button"
										className="btn cnt_btn"
										value="-"
										onClick={() => onRemoveItem(id)}
									/>
									{count}
									<input
										type="button"
										className="btn cnt_btn"
										value="+"
										onClick={() => onAddItem(id)}
									/>
									</div>
								</div>
							))
							: (<p>Cart is empty</p>)
						}
					</div>

					<div className="total" hidden={!items.length}>
						Total: {items.reduce((sum, cur) => sum + cur.price * cur.count, 0)} rub
					</div>
					<div className="error" hidden={!isError}>
						{errorMsg}
					</div>
					<input
						type="button"
						value="CONFIRM THE ORDER"
						onClick={this.handleSubmit.bind(this)}
						className="btn"
						id="submitBtn"
						hidden={inProcess}
					/>                    
					<button
						className="btn wait_btn"
						hidden={!inProcess}
						disabled
					><img src={LoadingImage} alt="sending..."/></button>
				</div>
			</div>
		);
	}
}

export default connect(
    state => ({
		items: state.cart.items.map((item) => {
			return {...item, ...state.posts.data.filter(({id}) => id === item.id)[0]}
		}),
		inProcess: state.cart.status === 'request',
		isOrderCreated: state.cart.status === 'order',
		isError: state.cart.status === 'error',
		errorMsg: state.cart.error.message,
		token: state.auth.token,
		order_id: state.cart.order_id
    }),
    dispatch => ({
		onSubmit: bindActionCreators(cartSubmit, dispatch),
		onError: (msg) => dispatch(cartSubmitError(msg)),
		onCartClear: () => dispatch(cartClear()),
		onAddItem: (id) => dispatch(cartAddItem(id)),
		onRemoveItem: (id) => dispatch(cartRemoveItem(id))
    })
)(CartPage);
