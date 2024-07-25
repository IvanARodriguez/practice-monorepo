document.addEventListener('DOMContentLoaded', function () {
	const notification = document.querySelector('.notification')
	if (notification) {
		console.log('Notification found:', notification)
		setTimeout(() => {
			console.log('Starting to fade out notification')
			notification.style.transition = 'opacity 1s'
			notification.style.opacity = '0'
			setTimeout(() => {
				console.log('Removing notification')
				notification.remove()
			}, 1000) // Match the transition duration
		}, 3000) // 3 seconds delay
	} else {
		console.log('No notification found')
	}
})
