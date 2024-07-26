import { Schema, model } from 'mongoose'
import Review from './Review.js'

const carSchema = Schema({
	price: { type: Number, required: [true, 'Precio es requerido'] },
	year: { type: Number, required: [true, 'Precio es requerido'], maxLength: 4 },
	make: { type: String, required: [true, 'Marca de vehículo es requerido'] },
	model: { type: String, required: [true, 'Modelo de vehículo es requerido'] },
	vim: {
		type: String,
		required: [true, 'Modelo de vehículo es requerido'],
		unique: [true, 'Numero de chasis debe ser único'],
	},
	photos: [{ type: String }],
	reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
})

carSchema.post('findOneAndDelete', async (car) => {
	// Find all reviews related to the Car and delete them
	if (car.reviews.length) {
		const res = await Review.deleteMany({ _id: { $in: car.reviews } })
		console.log(res)
	}
})

export default model('Car', carSchema)
