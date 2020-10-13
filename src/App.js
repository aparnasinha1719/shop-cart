import React, { Component } from 'react';
import './App.css';
import 'h8k-components';
import ProductList from './components/product-list';
import Cart from './components/cart';

const title = 'HackerShop';

class App extends Component {
	constructor() {
		super();
		const products = [...PRODUCTS].map((product, index) => {
			product.id = index + 1;
			product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
			product.cartQuantity = 0;
			return product;
		});
		this.state = {
			cart: {
				items: [],
			},
			products,
		};
	}
	addToCart = (product) => {
		let updatedCart = { ...this.state.cart };
		for (let key in updatedCart.items) {
			if (updatedCart.items[key].item === product.item) {
				updatedCart.items[key] = product;
				this.setState({ cart: updatedCart });
				return;
			}
		}
		updatedCart.items.push(product);
		this.setState({ cart: updatedCart });
	};

	removeFromCart = (product) => {
		let updtatedCart = { ...this.state.cart };
		for (let key in updtatedCart.items) {
			if (updtatedCart.items[key].item === product.item) {
				if (product.quantity !== 0) {
					updtatedCart.items[key] = product;
					this.setState({ cart: updtatedCart });
					return;
				}
				updtatedCart.items.splice(key, 1);
				this.setState({ cart: updtatedCart });
			}
		}
	};

	render() {
		return (
			<div>
				<h8k-navbar header={title}></h8k-navbar>
				<div className="layout-row shop-component">
					<ProductList
						products={this.state.products}
						addToCart={this.addToCart}
						removeFromCart={this.removeFromCart}
					/>
					<Cart cart={this.state.cart} />
				</div>
			</div>
		);
	}
}

export const PRODUCTS = [
	{
		name: 'Cap',
		price: 5,
	},
	{
		name: 'HandBag',
		price: 30,
	},
	{
		name: 'Shirt',
		price: 35,
	},
	{
		name: 'Shoe',
		price: 50,
	},
	{
		name: 'Pant',
		price: 35,
	},
	{
		name: 'Slipper',
		price: 25,
	},
];
export default App;
