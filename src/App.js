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
		for (let key in this.state.cart.items) {
			if (this.state.cart.items[key].item === product.item) {
				this.setState((this.state.cart.items[key] = product));
				return;
			}
		}
		let updtatedCartItems = [...this.state.cart.items];
		updtatedCartItems.push(product);
		this.setState((this.state.cart.items = updtatedCartItems));
	};

	removeFromCart = (product) => {
		for (let key in this.state.cart.items) {
			if (this.state.cart.items[key].item === product.item) {
				if (product.quantity !== 0) {
					this.setState((this.state.cart.items[key] = product));
					return;
				}

				let updtatedCartItems = [...this.state.cart.items];
				updtatedCartItems.splice(key, 1);
				this.setState((this.state.cart.items = updtatedCartItems));
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
