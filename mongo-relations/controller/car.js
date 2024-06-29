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

const carRoutes = Router()

carRoutes.get('/', catchAsyncError(getCars))
carRoutes.post('/', catchAsyncError(createCar))
carRoutes.get('/new', renderCreateCarPage)
carRoutes.get('/edit/:id', catchAsyncError(renderCarEditPage))
carRoutes.get('/:id', catchAsyncError(renderCarShowPage))

export default carRoutes
