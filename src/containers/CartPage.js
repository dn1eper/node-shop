import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cartSubmit, cartSubmitError, cartClear, cartAddItem, cartRemoveItem } from 'actions/cartActions';
import LoadingImage from 'img/Loading.gif';
import I18n from 'i18n';
import 'styles/Cart.css';

class CartPage extends Component {
	handleSubmit() {
		const { items, token, onError, onSubmit, locale } = this.props;
		if (items.length === 0) onError(I18n[locale].cart.empty);
		else if (token === false) onError(I18n[locale].cart.should_login);
		else onSubmit(items, token);
	}

	render() {
		const { items, isError, inProcess,
			errorMsg, isOrderCreated, order_id,
			onRemoveItem, onAddItem, onCartClear, locale } = this.props;

		return (
			<div className="cart_wrapper">
				<div className="cart_ordered" hidden={!isOrderCreated}>
					<h1>{I18n[locale].cart.order_is_decorated}</h1>
					<p>{I18n[locale].cart.order_number} {order_id}</p>
					<input
						type="button"
						value={I18n[locale].cart.start_order}
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
							: (<p>{I18n[locale].cart.cart_is_empty}</p>)
						}
					</div>

					<div className="total" hidden={!items.length}>
			{I18n[locale].cart.total} {items.reduce((sum, cur) => sum + cur.price * cur.count, 0)} {I18n[locale].cart.rub}
					</div>
					<div className="error" hidden={!isError}>
						{errorMsg}
					</div>
					<input
						type="button"
						value={I18n[locale].cart.confirm_order}
						onClick={this.handleSubmit.bind(this)}
						className="btn"
						id="submitBtn"
						hidden={inProcess}
					/>
					<button
						className="btn wait_btn"
						hidden={!inProcess}
						disabled
					><img src={LoadingImage} alt={I18n[locale].cart.sending}/></button>
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
		order_id: state.cart.order_id,
		locale: state.locale,
    }),
    dispatch => ({
		onSubmit: bindActionCreators(cartSubmit, dispatch),
		onError: (msg) => dispatch(cartSubmitError(msg)),
		onCartClear: () => dispatch(cartClear()),
		onAddItem: (id) => dispatch(cartAddItem(id)),
		onRemoveItem: (id) => dispatch(cartRemoveItem(id))
    })
)(CartPage);
