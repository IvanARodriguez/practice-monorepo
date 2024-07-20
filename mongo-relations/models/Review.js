import { model, Schema } from 'mongoose'

const reviewSchema = Schema({
	date: { type: Date, required: true },
	text: { type: String, required: true },
	car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
	rating: {
		type: Number,
		required: true,
		max: [5, 'Rating must be 5 or less'],
		min: [1, 'Rating must be at least 1'],
	},
})

export default model('Review', reviewSchema)
