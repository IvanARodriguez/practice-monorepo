import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import routes from './controller/routes.js'
import ErrorHandler from './middlewares/errorHandler.js'
import ejsMate from 'ejs-mate'
import bodyParser from 'body-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT ?? 6000
const DB_URI = process.env.DB_URI ?? 'mongodb://127.0.0.1:27017/RentACar'

const app = express()

// Connect to database
await mongoose
	.connect(DB_URI)
	.then(() => {
		console.log('Database connected!')
	})
	.catch((e) => console.log(`Something bad happened!, ${e}`))

app.use(express.urlencoded({ extended: true }))
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

// Route to ensure server routes are working
app.get('/healthcheck', (_, res) => {
	const response = { status: 'Running!' }
	console.log(response)
	res.send(response)
})

app.use(routes)

app.use(ErrorHandler)

// Setup routes

app.listen(PORT, () => {
	console.log(`Application connected to port ${PORT}`)
})
