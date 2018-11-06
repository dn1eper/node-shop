module.exports = {
	allItems : 'SELECT item_id id, title, htmlText, likes, price FROM item',
	tagsOfItem : 'SELECT name FROM item_tag WHERE item_id = :item_id',
	imagesOfItem : 'SELECT url FROM item_image WHERE item_id = :item_id',
	getPassHash : 'SELECT pass_hash, admin_id FROM admin WHERE login = :login',
	addNewUser : 'INSERT INTO admin (login, pass_hash) VALUES (:login, :pass_hash)',
	addNewOrder : 'INSERT INTO booking (user_id) VALUES (:user_id)',
	addNewOrderItem : 'INSERT INTO booking_items (booking_id, item_id, count) VALUES (:booking_id, :item_id, :count)',
	removeOrder: 'DELETE FROM booking_items WHERE booking_id = :booking_id',
	removeOrderItems: 'DELETE FROM booking WHERE booking_id = :booking_id'
}
