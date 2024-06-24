import { Router } from 'express'
import Car from '../models/Car.js'
import catchAsyncError from '../middlewares/catchAsyncError.js'

async function getCars(req, res) {
	const cars = await Car.find()
	res.render('car/main', { cars })
}

async function renderCreateCarPage(req, res) {
	res.render('car/new')
}

async function renderCarShowPage(req, res) {
	res.render('car/show')
}

async function createCar(req, res) {
	const car = await Car(req.body.car)
	const newCar = await car.save()
	res.redirect(`/cars/${newCar._id}`, newCar)
}

const carRoutes = Router()

carRoutes.get('/', catchAsyncError(getCars))
carRoutes.post('/', catchAsyncError(createCar))
carRoutes.get('/new', renderCreateCarPage)
carRoutes.get('/:id', renderCarShowPage)

export default carRoutes
