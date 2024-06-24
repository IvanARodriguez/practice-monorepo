const ErrorHandler = (err, req, res, next) => {
	const status = err.statusCode || 500
	const message = err.message || 'Something went wrong'
	res.status(status).json({
		status,
		message,
		success: false,
		stack:
			process.env.NODE_ENV !== 'production' ? err.stack : res.render('error'),
	})
}

export default ErrorHandler
