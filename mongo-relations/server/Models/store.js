// Practice how a one to many relationship works in NoSQL

import mongoose, { Schema } from 'mongoose';

const dbUri = 'mongodb://127.0.0.1:27017/Practice';

await mongoose
	.connect(dbUri)
	.then(() => {
		console.log('Database connected!');
	})
	.catch((e) => console.log(`Something bad happened!, ${e}`));

const productSchema = mongoose.Schema({
	price: { type: Number, required: true },
	name: { type: String, required: true },
	season: {
		type: String,
		enum: ['Spring', 'Summer', 'Fall', 'Winter'],
	},
});

const Product = mongoose.model('Product', productSchema);

async function createProducts() {
	await Product.deleteMany({})
		.then((res) => console.log(`Delete products: ${res.deletedCount}`))
		.catch((e) => console.log('Delete product error ', e));

	await Product.insertMany([
		{ name: 'Golden Melon', price: 9.33, season: 'Spring' },
		{ name: 'Hass Avocado', price: 1.99, season: 'Summer' },
		{ name: 'Blueberry', price: 3.49, season: 'Winter' },
		{ name: 'Banana', price: 0.99, season: 'Fall' },
	]);
}

const storeSchema = mongoose.Schema({
	name: { type: String, required: true, unique: true },
	location: { type: String, required: true },
	products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const Store = mongoose.model('Store', storeSchema);

await Store.deleteMany({});
async function createStore() {
	const newStore = new Store({
		name: 'Bravo Supermarket',
		location: 'Wesley Chapel, TX',
	});
	const hassAvocado = await Product.findOne({ name: 'Hass Avocado' });

	newStore.products.push(hassAvocado);

	await newStore.save();
}

async function addProduct() {
	const store = await Store.findOne({ name: 'Bravo Supermarket' });
	const banana = await Product.findOne({ name: 'Banana' });
	if (store && banana) {
		store.products.push(banana);
		await store.save();
	}
}

await createProducts();
await createStore();
await addProduct();
await Store.findOne({ name: 'Bravo Supermarket' })
	.populate('products')
	.then((store) => console.log(store));

await mongoose.disconnect();
