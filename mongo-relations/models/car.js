import { Schema, model } from 'mongoose'

const carSchema = Schema({
	price: { type: Number, required: [true, 'Precio es requerido'] },
	make: { type: String, required: [true, 'Marca de vehículo es requerido'] },
	model: { type: String, required: [true, 'Modelo de vehículo es requerido'] },
	photos: [{ type: String }],
})

export default model('Product', carSchema)
