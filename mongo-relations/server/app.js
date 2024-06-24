import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import routes from './controller/routes.js'
import ErrorHandler from './middlewares/errorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { PORT = 8080 } = process.env

const app = express()

// Set view engine
app.set('view engine', 'ejs')

// Connect to database
const dbUri = 'mongodb://127.0.0.1:27017/RentACar'

await mongoose
	.connect(dbUri)
	.then(() => {
		console.log('Database connected!')
	})
	.catch((e) => console.log(`Something bad happened!, ${e}`))

app.use(express.static(path.join(__dirname, 'public')))
// Index page
app.get('/', (req, res) => {
	res.render('index')
})

app.use(routes)

app.use(ErrorHandler)

// Setup routes
app.get('/healthcheck', (_, res) => {
	const response = { status: 'Running!' }
	console.log(response)
	res.send(response)
})

app.listen(PORT, () => {
	console.log(`Application connected to port ${PORT}`)
})
