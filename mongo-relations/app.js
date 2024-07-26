import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import routes from './controller/routes.js'
import ErrorHandler from './middlewares/errorHandler.js'
import ejsMate from 'ejs-mate'
import bodyParser from 'body-parser'
import { logger, httpLogger } from './helpers/logger.js'
import helmet from 'helmet'
import methodOverride from 'method-override'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT ?? 6000
const DB_URI = process.env.DB_URI ?? 'mongodb://127.0.0.1:27017/RentACar'

const app = express()
app.use(methodOverride('_method'))
app.use(flash())

// Configure Custom HTTP Logger
app.use(httpLogger)

// Security Configurations
const expiryDate = new Date(Date.now() + 60 * 60 * 6000) // 6 hour
app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		originAgentCluster: true,
	})
)
app.use(
	helmet.contentSecurityPolicy({
		useDefaults: true,
		directives: {
			'img-src': ["'self'", 'https: data: blob:'],
		},
	})
)
app.disable('x-powered-by')
app.use(
	cookieSession({
		name: 'session',
		keys: ['key1', 'key2'],
		cookie: {
			secure: true,
			expires: expiryDate,
			httpOnly: process.env.NODE_ENV === 'production',
		},
	})
)

// Connect to database
await mongoose
	.connect(DB_URI)
	.then(() => {
		logger.info('🗄️  Database connected!')
	})
	.catch((e) => logger.error(`Something bad happened!, ${e}`))

app.use(express.urlencoded({ extended: true }))
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

// Route to ensure server routes are working
app.get('/healthcheck', (_, res) => {
	const response = { status: 'Running!' }
	logger.info(response)
	res.send(response)
})

app.use(routes)

app.use(ErrorHandler)

// Setup routes

app.listen(PORT, () => {
	logger.info(`🚀 Server started on http://localhost:${PORT}`)
})
