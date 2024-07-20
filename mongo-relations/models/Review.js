import { Schema } from 'mongoose'

const reviewSchema = Schema({
	date: { type: Date, required: true },
	text: { type: String, required: true },
})
