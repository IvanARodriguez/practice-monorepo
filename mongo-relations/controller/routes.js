import { Router } from 'express'
import carRoutes from './car.js'

const routes = Router()

routes.use('/cars', carRoutes)

export default routes
