import pino from 'pino'
import customLogger from 'pino-http'

export const logger = pino({
	timestamp: `,"time":"${new Date(Date.now())}"`,
	transport: {
		target: 'pino-pretty',
	},
})

export const httpLogger = customLogger({
	logger,
	customLogLevel: function (req, res, err) {
		if (res.statusCode >= 400 && res.statusCode < 500) {
			return 'warn'
		} else if (res.statusCode >= 500 || err) {
			return 'error'
		} else if (res.statusCode >= 300 && res.statusCode < 400) {
			return 'silent'
		}
		return 'info'
	},
	customSuccessMessage: function (req, res) {
		if (res.statusCode === 404) {
			return 'resource not found'
		}
		return `${req.method} completed`
	},

	customReceivedMessage: function (req, res) {
		return 'request received: ' + req.method
	},
})
