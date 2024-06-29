import { Schema, model } from 'mongoose'

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
})

export default model('Product', carSchema)
