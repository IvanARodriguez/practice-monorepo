import { Router } from 'express'
import carRoutes from './car.js'
import pagesRoutes from './home.js'

const routes = Router()
routes.use('/', pagesRoutes)
routes.use('/cars', carRoutes)

export default routes
