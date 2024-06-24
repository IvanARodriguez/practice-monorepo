import { Router } from 'express'
import Car from '../models/Car.js'
import catchAsyncError from '../middlewares/catchAsyncError.js'

async function getCars(req, res) {
	const cars = await Car.find()
	res.render('car/main', { cars })
}

const carRoutes = Router()

carRoutes.get('/', catchAsyncError(getCars))

export default carRoutes
