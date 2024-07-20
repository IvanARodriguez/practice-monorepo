import { Router } from 'express'
import Car from '../models/Car.js'
import catchAsyncError from '../middlewares/catchAsyncError.js'
import { convertCurrency } from '../helpers/currency.js'

async function getCars(req, res) {
	const cars = await Car.find()
	res.render('car/main', { cars })
}

async function renderCreateCarPage(req, res) {
	res.render('car/new')
}

async function renderCarShowPage(req, res) {
	const { id } = req.params
	const car = await Car.findById(id)
	res.render('car/show', {
		car: { ...car.toObject(), price: convertCurrency(car.price) },
	})
}
async function deleteCar(req, res) {
	const { id } = req.params
	await Car.findByIdAndDelete(id)
	res.redirect('/cars')
}
async function renderCarEditPage(req, res) {
	const { id } = req.params
	const car = await Car.findById(id)
	res.render('car/edit', { car })
}

async function createCar(req, res) {
	const car = await Car(req.body.car)
	const newCar = await car.save()
	res.redirect(`/cars/${newCar._id}`)
}

async function updateCar(req, res) {
	const car = await Car.findByIdAndUpdate(id, {
		...req.body.car,
	})

	res.redirect(`/cars/${car._id}`)
}

const carRoutes = Router()

carRoutes.get('/new', renderCreateCarPage)
carRoutes.get('/', catchAsyncError(getCars))
carRoutes.post('/', catchAsyncError(createCar))
carRoutes.put('/:id', catchAsyncError(updateCar))
carRoutes.delete('/:id', catchAsyncError(deleteCar))
carRoutes.get('/:id', catchAsyncError(renderCarShowPage))
carRoutes.get('/:id/edit', catchAsyncError(renderCarEditPage))

export default carRoutes
