import { Router } from 'express'
import Car from '../models/Car.js'
import Review from '../models/Review.js'
import catchAsyncError from '../middlewares/catchAsyncError.js'
import { convertCurrency } from '../helpers/currency.js'
import moment from 'moment'

function getAvgRating(numbers) {
	if (numbers.length < 1) {
		return 0
	}
	return numbers.reduce((num1, num2) => num1 + num2) / numbers.length
}

async function getCars(req, res) {
	const cars = await Car.find()
	res.render('car/main', { cars })
}

async function renderCreateCarPage(req, res) {
	res.render('car/new')
}

async function renderCarShowPage(req, res) {
	const { id } = req.params
	const car = await Car.findById(id).populate({
		path: 'reviews',
		options: { sort: { date: -1 } },
	})
	moment.locale('Es')
	const reviews = car.reviews.map((review) => {
		return {
			...review.toObject(),
			date: moment(review.date).fromNow(),
		}
	})
	console.log(reviews)
	const averageRating = getAvgRating(reviews.map((review) => review.rating))
	res.render('car/show', {
		car: { ...car.toObject(), price: convertCurrency(car.price) },
		reviews,
		averageRating,
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
	const { id } = req.params
	const car = await Car.findByIdAndUpdate(id, {
		...req.body.car,
	})

	res.redirect(`/cars/${car._id}`)
}

async function addReviewToCar(req, res) {
	const { car_id } = req.params
	const { review } = req.body
	const car = await Car.findById(car_id)
	if (!car) {
		return res.status(404).send('Car not found')
	}
	const fullReview = {
		...review,
		date: new Date(),
		car: car._id,
	}

	const newReview = new Review(fullReview)
	const savedReview = await newReview.save()
	car.reviews.push(savedReview._id)
	await car.save()

	res.redirect(`/cars/${car._id}`)
}

async function deleteReview(req, res) {
	const { car_id, review_id } = req.params
	const car = await Car.findById(car_id).populate('reviews')
	console.log(car.reviews)
	const filteredCarReviews = car.reviews.filter(
		(review) => review._id !== review_id
	)
	car.reviews = filteredCarReviews
	await car.save()
	await Review.findByIdAndDelete(review_id)
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
carRoutes.post('/:car_id/reviews/add', catchAsyncError(addReviewToCar))
carRoutes.delete('/:car_id/reviews/:review_id', catchAsyncError(deleteReview))

export default carRoutes
