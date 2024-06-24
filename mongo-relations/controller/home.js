import { Router } from 'express'

const pagesRoutes = Router()

pagesRoutes.get('/', (req, res) => {
	res.render('index')
})

export default pagesRoutes
